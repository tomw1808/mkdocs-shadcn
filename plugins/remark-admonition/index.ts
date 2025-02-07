import { visit } from 'unist-util-visit'
import { Literal, Node, Parent } from 'unist'
import { Plugin } from 'unified'

interface AdmonitionNode extends Node {
  type: 'admonition'
  admonitionType: string
  title?: string
  isCollapsible: boolean
  children: Node[]
  data: {
    hName: 'Admonition'
    hProperties: {
      type: string
      title?: string
      isCollapsible: boolean
    }
  }
}

const admonitionRegex = /^(?:!{3}|\?{3})\s*(\w+)(?:\s+"([^"]*)")?\s*(?:\n|$)(.*)?/s

export const remarkAdmonition: Plugin = function() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
      if (!node.children?.[0]?.value) return

      const match = node.children[0].value.match(admonitionRegex)
      if (!match) return

      // Get the content nodes
      const contentNodes: Parent[] = []
      
      // Handle inline content if present in the match
      let additionalIndex = 0;
      if (match[3]) {
        additionalIndex = 1;
        contentNodes.push({
          type: 'paragraph',
          children: [{
            type: 'text',
            value: match[3].trim()
          } as Literal]
        })
        // Update the original node to only contain the admonition marker
        node.children[0].value = node.children[0].value.replace(match[3], '').trim()
      }
      
      // Then look for subsequent indented nodes
      let nextIndex = index + 1
      const baseIndent = node.position?.start?.column || 0

      while (nextIndex < parent.children.length) {
        const nextNode = parent.children[nextIndex]
        const nextIndent = nextNode.position?.start?.column || 0
        
        // Break if we hit a node with same or less indentation
        if (nextIndent <= baseIndent) {
          break
        }
        
        contentNodes.push(nextNode)
        nextIndex++
      }

      if (contentNodes.length === 0) return

      // Create admonition node
      const admonitionNode: AdmonitionNode = {
        type: 'admonition',
        admonitionType: match[1],
        title: match[2],
        isCollapsible: node.children[0].value.startsWith('???'),
        children: contentNodes,
        data: {
          hName: 'Admonition',
          hProperties: {
            type: match[1],
            title: match[2] || '',
            isCollapsible: node.children[0].value.startsWith('???')
          }
        }
      }

      // Remove the original nodes
      parent.children.splice(index, contentNodes.length + 1 - additionalIndex, admonitionNode)

      return index // Stay at the same index for next iteration
    })
  }
}
