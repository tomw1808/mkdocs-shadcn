import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getMarkdownContent(slug: string[]) {
  try {
    // Construct the file path from the slug
    const filePath = path.join(process.cwd(), 'mkdocs', ...slug) + '.md'
    
    // Read the markdown file
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Use gray-matter to parse the markdown frontmatter
    const { content, data } = matter(fileContents)
    
    return {
      content,
      frontmatter: data,
      // Calculate the images base path for this markdown file
      imagesPath: path.join('/mkdocs', ...slug.slice(0, -1), 'images')
    }
  } catch (error: any) {
    throw new Error(`Failed to read markdown file: ${error.message}`)
  }
}
