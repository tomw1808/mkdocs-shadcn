const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const matter = require('gray-matter')
const pagefind = require("pagefind")

async function buildSearchIndex() {
  console.log('Building search index...')
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const config = yaml.load(fs.readFileSync(mkdocsPath, 'utf8'))
  
  // Create a Pagefind index
  const { index } = await pagefind.createIndex({
    forceLanguage: "en",
    verbose: true
  })

  async function processNavItem(item) {
    if (typeof item === 'string') return
    
    const [title, value] = Object.entries(item)[0]
    
    if (typeof value === 'string') {
      // This is a page
      const mdPath = path.join(process.cwd(), 'mkdocs', value)
      try {
        const content = fs.readFileSync(mdPath, 'utf8')
        const { content: mdContent } = matter(content)
        
        await index.addCustomRecord({
          url: `/${value.replace('.md', '')}`,
          content: mdContent,
          language: "en",
          meta: {
            title: title
          }
        })
      } catch (error) {
        console.error(`Error processing ${value}:`, error)
      }
    } else if (Array.isArray(value)) {
      // This is a section with children
      for (const child of value) {
        await processNavItem(child)
      }
    }
  }

  // Process all navigation items
  if (config.nav) {
    for (const item of config.nav) {
      await processNavItem(item)
    }
  }

  // Write the index files
  const { errors } = await index.writeFiles({
    outputPath: "./public/pagefind"
  })

  if (errors?.length > 0) {
    console.error('Errors building search index:', errors)
    process.exit(1)
  }

  // Clean up
  await index.deleteIndex()
  await pagefind.close()

  console.log('Search index built successfully')
}

console.log("test")
// Execute the build
buildSearchIndex().catch(err => {
  console.error('Failed to build search index:', err)
  process.exit(1)
})
