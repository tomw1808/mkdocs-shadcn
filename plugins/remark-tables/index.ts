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
      if (children.length < 3) return // Need at least header, alignment, and one data row

      // Check if the content matches table format
      const lines = children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('')
        .split('\n')
        .filter((line: string) => line.trim())

      if (lines.length < 3) return // Need at least 3 lines for a table
      if (!lines.every((line: string | string[]) => line.includes('|'))) return // Every line must contain |

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
