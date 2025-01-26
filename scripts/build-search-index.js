const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const matter = require('gray-matter')

function buildSearchIndex() {
  console.log('Building search index...')
  const searchIndex = []
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  
  // Read and parse mkdocs.yml
  const config = yaml.load(fs.readFileSync(mkdocsPath, 'utf8'))
  
  function processNavItem(item) {
    if (typeof item === 'string') return
    
    const [title, value] = Object.entries(item)[0]
    
    if (typeof value === 'string') {
      // This is a page
      const mdPath = path.join(process.cwd(), 'mkdocs', value)
      try {
        const content = fs.readFileSync(mdPath, 'utf8')
        const { content: mdContent } = matter(content)
        
        searchIndex.push({
          url: `/${value.replace('.md', '')}`,
          title: title,
          content: mdContent
        })
      } catch (error) {
        console.error(`Error processing ${value}:`, error)
      }
    } else if (Array.isArray(value)) {
      // This is a section with children
      value.forEach(child => processNavItem(child))
    }
  }

  // Process all navigation items
  if (config.nav) {
    config.nav.forEach(processNavItem)
  }

  // Ensure the public/search directory exists
  const searchDir = path.join(process.cwd(), 'public', 'search')
  fs.mkdirSync(searchDir, { recursive: true })

  // Write the search index
  fs.writeFileSync(
    path.join(searchDir, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
  )

  console.log('Search index built successfully')
}

// Execute the build
buildSearchIndex()
