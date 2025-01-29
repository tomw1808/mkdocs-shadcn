import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Plugin } from 'unified'

interface TabNode extends Node {
  type: 'tab'
  label: string
  children: Node[],
  data: {
    hName: 'tab',
    hProperties: {
      label: string
    }
  }
}

interface TabsNode extends Node {
  type: 'tabs'
  children: TabNode[]
  data: {
    hName: 'tabs'
  }
}

const tabRegex = /^===\s+"([^"]+)"\s*$/

export const remarkTabs: Plugin = function() {
  return function transformer(tree) {
    let currentGroup: TabNode[] = []
    let lastTabIndex: number | null = null
    
    visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
      if (!node.children?.[0]?.value) return
      
      const match = node.children[0].value.match(tabRegex)
      if (!match) return

      // Get the next node which should be our content
      const contentNode = parent.children[index + 1]
      if (!contentNode) return

      // Create tab node
      const tabNode: TabNode = {
        type: 'tab',
        label: match[1],
        children: [contentNode],
        data: {
          hName: 'tab',
          hProperties: {
            label: match[1]
          }
        }
      }

      // If this is the first tab in a potential group
      if (currentGroup.length === 0) {
        lastTabIndex = index
      }

      // Add to current group
      currentGroup.push(tabNode)

      // Remove both the marker node and content node
      parent.children.splice(index, 2)
      index -= 2 // Adjust index after removal

      console.log('Processing node at index:', index)
      console.log('Current group size:', currentGroup.length)
      console.log('Last tab index:', lastTabIndex)
      
      // Check if next node would be a new tab
      const nextNode = parent.children[index + 1]
      console.log('Next node:', {
        type: nextNode?.type,
        value: nextNode?.children?.[0]?.value,
        index: index + 1
      })
      
      const nextMatch = nextNode?.type === 'paragraph' && 
                       nextNode.children?.[0]?.value?.match(tabRegex)
      
      console.log('Next match:', nextMatch)
      
      // If no next tab, close the group
      if (!nextMatch && currentGroup.length > 0) {
        const tabsNode: TabsNode = {
          type: 'tabs',
          children: currentGroup,
          data: {
            hName: 'tabs'
          }
        }
        
        // Insert the tabs node where we removed the first tab
        if (lastTabIndex !== null) {
          parent.children.splice(lastTabIndex, 0, tabsNode)
        }
        
        // Reset for next group
        currentGroup = []
        lastTabIndex = null
      }

      return index // Return adjusted index
    })
  }
}
