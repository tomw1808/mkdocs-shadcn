import { visit } from 'unist-util-visit'
import { Node, Parent } from 'unist'
import { Plugin } from 'unified'

interface TableCell extends Node {
  type: 'tableCell'
  align?: 'left' | 'center' | 'right'
  children: Node[]
}

interface TableRow extends Node {
  type: 'tableRow'
  children: TableCell[]
}

interface TableNode extends Node {
  type: 'table'
  children: TableRow[]
  data: {
    hName: 'Table'
    hProperties: {
      rows: {
        cells: {
          content: string
          align?: 'left' | 'center' | 'right'
        }[]
      }[]
    }
  }
}

function parseTableRow(row: string): { content: string; align?: 'left' | 'center' | 'right' }[] {
  return row
    .split('|')
    .slice(1, -1) // Remove empty cells from start/end
    .map(cell => ({
      content: cell.trim(),
      align: undefined
    }))
}

function parseAlignmentRow(row: string): ('left' | 'center' | 'right' | undefined)[] {
  return row
    .split('|')
    .slice(1, -1) // Remove empty cells from start/end
    .map(cell => {
      cell = cell.trim()
      if (cell.startsWith(':') && cell.endsWith(':')) return 'center'
      if (cell.endsWith(':')) return 'right'
      if (cell.startsWith(':')) return 'left'
      return undefined
    })
}

export const remarkTables: Plugin = function() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (node: any, index: number, parent: Parent) => {
      // Check if this paragraph contains a table
      const children = node.children || []
      
      // Get all text content
      let textContent = ''
      children.forEach((child: any) => {
        if (child.type === 'text') {
          textContent += child.value
        }
      })

      // Split into lines and filter empty ones
      const lines = textContent.split('\n').filter(line => line.trim())

      // Check if we have a valid table structure
      if (lines.length < 3) return // Need at least header, separator, and one data row
      if (!lines[0].includes('|') || !lines[1].includes('|')) return // First two lines must be table format
      if (!lines[1].match(/^\s*\|[-:\s|]*\|\s*$/)) return // Second line must be separator


      // Parse header row
      const headerCells = parseTableRow(lines[0])
      
      // Parse alignment row
      const alignments = parseAlignmentRow(lines[1])
      
      // Apply alignments to header cells
      headerCells.forEach((cell, i) => {
        cell.align = alignments[i]
      })

      // Parse data rows
      const rows = lines.slice(2).map((line: string) => {
        const cells = parseTableRow(line)
        cells.forEach((cell, i) => {
          cell.align = alignments[i]
        })

        return { cells }
      })

      // Create table node
      const tableNode: TableNode = {
        type: 'table',
        children: [], // We'll use hProperties for the data
        data: {
          hName: 'Table',
          hProperties: {
            rows: [
              { cells: headerCells },
              ...rows
            ]
          }
        }
      }


      // Replace the paragraph node with our table node
      parent.children.splice(index, 1, tableNode)
    })
  }
}
