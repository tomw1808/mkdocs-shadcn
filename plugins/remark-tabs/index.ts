import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Plugin } from 'unified'

interface TabNode extends Node {
  type: 'tab'
  label: string
  children: Node[]
}

interface TabsNode extends Node {
  type: 'tabs'
  children: TabNode[]
}

const tabRegex = /^===\s+"([^"]+)"\s*$/

export const remarkTabs: Plugin = function() {
  return function transformer(tree) {
    const tabGroups: TabNode[][] = []
    let currentGroup: TabNode[] = []
    
    console.log('Initial tree:', JSON.stringify(tree, null, 2))
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
      }

      // Remove both the marker node and content node
      parent.children.splice(index, 2)

      // Add to current group
      currentGroup.push(tabNode)

      // If next remaining node isn't a tab marker, close the group
      const nextNode = parent.children[index]
      const nextMatch = nextNode?.type === 'paragraph' && 
                       nextNode.children?.[0]?.value?.match(tabRegex)
      
      if (!nextMatch) {
        if (currentGroup.length > 0) {
          const tabsNode: TabsNode = {
            type: 'tabs',
            children: currentGroup,
          }
          // Insert the tabs node where we removed the first tab
          parent.children.splice(index, 0, tabsNode)
          currentGroup = []
        }
      }
    })

    // Convert tab groups to tabs nodes
    tabGroups.forEach(group => {
      const tabsNode: TabsNode = {
        type: 'tabs',
        children: group,
      }

      // Replace first tab's position with tabs node
      const firstTab = group[0]
      const firstIndex = tree.children.indexOf(firstTab)
      if (firstIndex !== -1) {
        tree.children.splice(firstIndex, group.length, tabsNode)
      }
    })
  }
}
