import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remarkTabs } from '../plugins/remark-tabs'
function preprocessHtmlInMarkdown(content: string): string {
  // Store code blocks with unique identifiers
  const codeBlocks: Map<string, { lang: string, lines?: string, title?: string, code: string }> = new Map()

  let processedContent = content;








  // Then handle gallery images (!![]())
  processedContent = processedContent.replace(
    /!!\[(.*?)\]\((.*?)\)/g,
    (match, alt, src) => `<LightboxImage alt="${alt}" src="${src}" />`
  );

  // Convert MkDocs-style links to markdown links
  processedContent = processedContent.replace(
    /<(https?:\/\/[^>]+)>/g,
    (match, url) => `[${url}](${url})`
  );

  // Handle markdown links with attributes
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\){([^}]+)}/g,
    (match, text, url, attrs) => {
      const attributes = attrs.split(/\s+/).reduce((acc: Record<string, string>, attr: string) => {
        const [key, value] = attr.split('=');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Convert target="_blank" to proper HTML attributes
      if (attributes.target === '_blank') {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }

      return `[${text}](${url})`;
    }
  );



  // Then convert style attributes to valid JSX
  processedContent = processedContent.replace(
    /style="([^"]*?)"/g,
    (match, styleString) => {
      const styleObject = styleString
        .split(';')
        .filter(Boolean)
        .reduce((acc: Record<string, string>, style: string) => {
          const [key, value] = style.split(':').map(s => s.trim());
          if (key && value) {
            // Convert kebab-case to camelCase
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            acc[camelKey] = value;
          }
          return acc;
        }, {});

      return `style={${JSON.stringify(styleObject)}}`;
    }
  );

  // Handle other HTML attribute conversions
  processedContent = processedContent
    .replace(/frameborder=/g, "frameBorder=")
    .replace(/allowfullscreen/g, "allowFullScreen");

 

  return processedContent;
}

export async function getMarkdownContent(slug: string[]) {
  try {
    // Construct the file path from the slug
    const filePath = path.join(process.cwd(), 'mkdocs', ...slug) + '.md'

    // Read the markdown file
    const fileContents = fs.readFileSync(filePath, 'utf8')

    // Use gray-matter to parse the markdown frontmatter
    const { content, data } = matter(fileContents)

    // Preprocess HTML in markdown content
    const processedContent = preprocessHtmlInMarkdown(content)

    return {
      content: processedContent,
      frontmatter: data,
      // Calculate the images base path for this markdown file
      imagesPath: path.join('/mkdocs', ...slug.slice(0, -1))
    }
  } catch (error: any) {
    throw new Error(`Failed to read markdown file: ${error.message}`)
  }
}
