import { visit } from 'unist-util-visit'
import { Node, Parent } from 'unist'
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

const admonitionRegex = /^(?:!{3}|\?{3})\s*(\w+)(?:\s+"([^"]*)")?\s*$/

export const remarkAdmonition: Plugin = function() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
      if (!node.children?.[0]?.value) return

      const match = node.children[0].value.match(admonitionRegex)
      if (!match) return

      console.log(match);

      // Get the content nodes
      const contentNodes: Parent[] = []
      
      // First check if there are remaining children in the current paragraph node
      // This handles the case without newline
      if (node.children.length > 1) {
        contentNodes.push({
          type: 'paragraph',
          children: node.children.slice(1)
        })
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
      parent.children.splice(index, contentNodes.length + 1, admonitionNode)

      return index // Stay at the same index for next iteration
    })
  }
}
