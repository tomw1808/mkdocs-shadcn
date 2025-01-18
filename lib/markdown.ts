import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function preprocessHtmlInMarkdown(content: string): string {
  // First handle tabs
  let processedContent = content.replace(
    /^===\s+"([^"]+)"\r?\n((?:(?:    .*|[ \t]*)\r?\n)*(?:    .*))/gm,
    (match, label, content) => {
      // Remove the 4-space indent from content and handle empty lines
      console.log({label, content})
      const processedContent = content.split('\n')
        .map((line: string) => {
          // Handle completely empty lines or lines with only whitespace
          if (!line.trim()) return ''
          // Handle indented empty lines
          if (line.match(/^    $/)) return ''
          // Handle regular indented content
          return line.replace(/^    /, '')
        })
        .join('\n')
        .trim()
      
      return `<Tab label="${label}">\n\n${processedContent}\n\n</Tab>`
    }
  )

  // Then handle admonitions
  processedContent = processedContent.replace(
    /!!!\s*(\w+)(?:\s+"([^"]*)")?\r?\n((?:(?:    .*|[ \t]*)\r?\n)*(?:    .*))/gm,
    (match, type, title, content) => {
      // Remove the 4-space indent from content and handle empty lines
      const processedContent = content.split('\n')
        .map((line: string) => {
          // Handle completely empty lines or lines with only whitespace
          if (!line.trim()) return ''
          // Handle indented empty lines
          if (line.match(/^    $/)) return ''
          // Handle regular indented content
          return line.replace(/^    /, '')
        })
        .join('\n')
        .trim()
      
      return `<Admonition type="${type}" title="${title || ''}">\n\n${processedContent}\n\n</Admonition>`
    }
  )

  // Wrap adjacent tabs in a Tabs component
  processedContent = processedContent.replace(
    /(?:<Tab[^>]*>[\s\S]*?<\/Tab>\s*)+/g,
    match => `<Tabs>\n${match}</Tabs>`
  )

  // Then handle gallery images (!![]())
  processedContent = processedContent.replace(
    /!!\[(.*?)\]\((.*?)\)/g,
    (match, alt, src) => `<LightboxImage alt="${alt}" src="${src}" />`
  );

   // Then convert MkDocs-style links to markdown links
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
  return processedContent
    .replace(/frameborder=/g, "frameBorder=")
    .replace(/allowfullscreen/g, "allowFullScreen");
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
