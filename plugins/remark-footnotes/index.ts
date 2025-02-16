import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Plugin } from 'unified'

interface FootnoteDefinition extends Node {
    type: 'footnoteDefinition'
    identifier: string
    children: Node[]
}

interface FootnoteReference extends Node {
    type: 'footnoteReference'
    identifier: string
    data?: {
        hProperties?: {
            footnoteContent?: string
        }
    }
}

export const remarkFootnotes: Plugin = function () {
    return function transformer(tree) {
        // First pass: collect all footnote definitions
        const definitions: Record<string, string> = {}

        visit(tree, 'footnoteDefinition', (node: FootnoteDefinition) => {
            // Extract text content from definition
            let content = ''
            visit(node, 'text', (textNode: any) => {
                content += textNode.value
            })
            definitions[node.identifier] = content.trim()
        })

        // Second pass: attach content to references
        visit(tree, 'footnoteReference', (node: FootnoteReference) => {
            if (definitions[node.identifier]) {
                node.data = node.data || { hProperties: {} }
                node.data.hProperties = node.data.hProperties || {};
                node.data.hProperties.footnoteContent = definitions[node.identifier]
            }

        })
    }
}
