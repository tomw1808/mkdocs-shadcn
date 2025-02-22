import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface MkDocsConfig {
  site_name: string
  site_description?: string
}

export interface NavItem {
  title: string
  path: string
}


export interface VersionInfo {
  version: string
  path: string
  config: MkDocsConfig
}

export function getVersions(): VersionInfo[] {
  const versions: VersionInfo[] = []
  const mkdocsDir = path.join(process.cwd(), 'mkdocs')
  
  // Check if unversioned variant exists
  const unversionedPath = path.join(mkdocsDir, 'mkdocs.yml')
  if (fs.existsSync(unversionedPath)) {
    const config = yaml.load(fs.readFileSync(unversionedPath, 'utf8')) as MkDocsConfig
    versions.push({
      version: 'current',
      path: '',
      config
    })
    return versions
  }

  // Look for versioned directories
  const entries = fs.readdirSync(mkdocsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const versionPath = path.join(mkdocsDir, entry.name, 'mkdocs.yml')
      if (fs.existsSync(versionPath)) {
        const config = yaml.load(fs.readFileSync(versionPath, 'utf8')) as MkDocsConfig
        versions.push({
          version: entry.name,
          path: entry.name,
          config
        })
      }
    }
  }

  return versions.sort((a, b) => b.version.localeCompare(a.version))
}

export function getMkDocsConfig(version?: string): MkDocsConfig {
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

export interface NavTreeItem {
  title: string
  path?: string
  children?: NavTreeItem[]
  isSection?: boolean
}

export function buildNavTree(nav: any[]): NavTreeItem[] {
  const items: NavTreeItem[] = []
  
  nav.forEach(item => {
    if (typeof item === 'string') {
      return // Skip string items
    }
    
    Object.entries(item).forEach(([key, value]) => {
      if (key === 'Home') {
        return // Skip the home entry
      }
      
      if (Array.isArray(value)) {
        // This is a section with children
        const children = buildNavTree(value)
        if (children.length > 0) {
          items.push({
            title: key,
            isSection: true, // Mark as section header
            children: children
          })
        }
      } else if (typeof value === 'string') {
        // This is a page
        items.push({
          title: key,
          path: value.replace('.md', '')
        })
      }
    })
  })
  
  return items
}

export function getFullNavigation(version?: string) {
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
  const config = yaml.load(fileContents) as any
  
  if (!config.nav) return []
  
  return buildNavTree(config.nav)
}

function findFirstPath(value: any): string | undefined {
  if (typeof value === 'string') {
    return value.replace('.md', '')
  }
  
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === 'string') {
        return item.replace('.md', '')
      }
      const [_, childValue] = Object.entries(item)[0]
      const path = findFirstPath(childValue)
      if (path) {
        return path
      }
    }
  }
  
  return undefined
}

export function getRootNavigation(version?: string) {
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
  const config = yaml.load(fileContents) as any
  
  if (!config.nav) return []

  return config.nav.map((item: any) => {
    if (typeof item === 'string') return null
    const [title, value] = Object.entries(item)[0]
    
    return {
      title,
      path: findFirstPath(value)
    }
  }).filter(Boolean)
}

function flattenNav(nav: any[]): { title: string; path: string }[] {
  const items: { title: string; path: string }[] = []
  
  nav.forEach(item => {
    if (typeof item === 'string') {
      return // Skip string items
    }
    
    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // This is a section with children
        items.push(...flattenNav(value))
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

export function getAllPaths() {
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
  const config = yaml.load(fileContents) as any
  
  if (!config.nav) return []

  const paths: string[] = []
  
  function processNavItem(item: any) {
    if (typeof item === 'string') return
    
    Object.entries(item).forEach(([_, value]) => {
      if (typeof value === 'string' && value.endsWith('.md')) {
        const mdPath = path.join(process.cwd(), 'mkdocs', 'docs', value)
        paths.push(value.replace('.md', ''))
      } else if (Array.isArray(value)) {
        value.forEach(processNavItem)
      }
    })
  }

  config.nav.forEach(processNavItem)
  return paths
}

export function findNavTitle(items: any[], currentPath: string): string | undefined {
  for (const item of items) {
    if (item.path === `${currentPath}.md`) {
      return item.title
    }
    if (item.children) {
      const found = findNavTitle(item.children, currentPath)
      if (found) return found
    }
  }
  return undefined
}

export function getNavigation(currentPath: string) {
  const mkdocsPath = path.join(process.cwd(), 'mkdocs', 'mkdocs.yml')
  const fileContents = fs.readFileSync(mkdocsPath, 'utf8')
  const config = yaml.load(fileContents) as any
  
  if (!config.nav) return { prev: null, next: null }
  
  const flatNav = flattenNav(config.nav)
  const currentIndex = flatNav.findIndex(item => item.path.replace('.md', '') === currentPath)
  
  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null
  }
}
