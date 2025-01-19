import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface MkDocsConfig {
  site_name: string
  site_description?: string
}

interface NavItem {
  title: string
  path: string
}

export function getMkDocsConfig(): MkDocsConfig {
  try {
    const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
    const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
    const config = yaml.load(fileContents) as MkDocsConfig

    if (!config.site_name) {
      throw new Error('Missing required field: site_name in mkdocs.yml')
    }

    return {
      site_name: config.site_name,
      site_description: config.site_description
    }
  } catch (error: any) {
    throw new Error(`Failed to parse mkdocs.yml: ${error.message}`)
  }
}

function flattenNav(nav: any[], parentTitle = ''): NavItem[] {
  const items: NavItem[] = []
  
  nav.forEach(item => {
    if (typeof item === 'string') {
      return // Skip string items
    }
    
    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // This is a section with children
        items.push(...flattenNav(value, key))
      } else if (typeof value === 'string') {
        // This is a page
        items.push({
          title: key,
          path: value
        })
      }
    })
  })
  
  return items
}

export function getNavigation(currentPath: string) {
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
  const config = yaml.load(fileContents) as any
  
  if (!config.nav) return { prev: null, next: null }
  
  const flatNav = flattenNav(config.nav)
  const currentIndex = flatNav.findIndex(item => item.path === currentPath + '.md')
  
  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null
  }
}
