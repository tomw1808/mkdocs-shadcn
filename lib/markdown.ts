import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function preprocessHtmlInMarkdown(content: string): string {
  // First convert MkDocs-style links to markdown links
  let processedContent = content.replace(
    /<(https?:\/\/[^>]+)>/g,
    (match, url) => `[${url}](${url})`
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
      imagesPath: path.join('/mkdocs', ...slug.slice(0, -1), 'images')
    }
  } catch (error: any) {
    throw new Error(`Failed to read markdown file: ${error.message}`)
  }
}
