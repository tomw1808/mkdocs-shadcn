#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import {createIndex} from "pagefind";

async function buildSearchIndex() {
  console.log('Building search index...')
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const config = yaml.load(fs.readFileSync(mkdocsPath, 'utf8')) as any
  
  // Create a Pagefind index
  const { index } = await createIndex({
    forceLanguage: "en",
    verbose: true
  })

  async function processNavItem(item: any) {
    if (typeof item === 'string') return
    
    const [title, value] = Object.entries(item)[0]
    
    if (typeof value === 'string') {
      // This is a page
      const mdPath = path.join(process.cwd(), 'mkdocs', value)
      try {
        const content = fs.readFileSync(mdPath, 'utf8')
        const { content: mdContent } = matter(content)
        
        await index?.addCustomRecord({
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
  await index?.writeFiles({
    outputPath: "./public/pagefind"
  })

  

  console.log('Search index built successfully')
}

// Execute the build
buildSearchIndex().catch(err => {
  console.error('Failed to build search index:', err)
  process.exit(1)
})
