import { visit } from 'unist-util-visit'
import { Node } from 'unist'
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

const admonitionRegex = /^(?:!!!|\?{3})\s*(\w+)(?:\s+"([^"]*)")?\s*$/

export const remarkAdmonition: Plugin = function() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
      if (!node.children?.[0]?.value) return

      const match = node.children[0].value.match(admonitionRegex)
      if (!match) return

      // Get the content nodes (everything until indentation level changes)
      const contentNodes: Node[] = []
      let nextIndex = index + 1
      
      // Get the indentation level of the admonition marker
      const baseIndent = node.position?.indent?.[0] || 0
      
      while (nextIndex < parent.children.length) {
        const nextNode = parent.children[nextIndex]
        const nextIndent = nextNode.position?.indent?.[0] || 0
        
        // Break if we hit a node with same or less indentation
        if (nextIndent <= baseIndent && nextNode.type === 'paragraph') {
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
