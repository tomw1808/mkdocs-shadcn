import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Plugin } from 'unified'

interface ImageNode extends Node {
  type: 'mdxJsxFlowElement'
  name: string
  attributes: Array<{
    type: 'mdxJsxAttribute'
    name: string
    value: string
  }>
  children: []
  data?: {
    _mdxExplicitJsx?: boolean
  }
}

export const remarkImages: Plugin = function() {
  return function transformer(tree) {
    visit(tree, 'image', (node: any, index: number, parent: any) => {
      if (!node.url) return

      // Determine if this is a lightbox image (starts with !!)
      const isLightbox = node.type === 'image' && parent.type === 'paragraph' && 
                        parent.children.length === 2 && 
                        parent.children[1] === node &&
                        parent.children[0].value === "!" // Matches !![ pattern

      // Create MDX component node
      const imageNode: ImageNode = {
        type: 'mdxJsxFlowElement',
        name: isLightbox ? 'LightboxImage' : 'img',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: isLightbox ? 'src' : 'src',
            value: node.url
          }
        ],
        children: [],
        data: {
          _mdxExplicitJsx: true
        }
      }

      // Add alt text if present
      if (node.alt) {
        imageNode.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'alt',
          value: node.alt
        })
      }

      // Replace the original node
      if (isLightbox) {
        parent.type = 'mdxJsxFlowElement'
        parent.name = 'LightboxImage'
        parent.attributes = imageNode.attributes
        parent.children = []
      } else {
        parent.children[parent.children.indexOf(node)] = imageNode
      }
    })
  }
}
