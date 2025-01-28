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

    visit(tree, 'code', (node: any, index: number, parent: any) => {
      // Check if previous node is our tab marker
      const prevNode = index > 0 ? parent.children[index - 1] : null
      if (prevNode?.type !== 'paragraph') return
      
      const match = prevNode.children[0].value.match(tabRegex)
      if (!match) return

      // Create tab node
      const tabNode: TabNode = {
        type: 'tab',
        label: match[1],
        children: [node],
      }

      // Remove the marker node
      parent.children.splice(index - 1, 1)

      // Add to current group
      currentGroup.push(tabNode)

      // If next node isn't a tab, close the group
      const nextNode = parent.children[index]
      const nextMatch = nextNode?.type === 'paragraph' && 
                       nextNode.children[0].value.match(tabRegex)
      
      if (!nextMatch) {
        if (currentGroup.length > 0) {
          tabGroups.push([...currentGroup])
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
