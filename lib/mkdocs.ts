import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface MkDocsConfig {
  site_name: string
  site_description?: string
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
  } catch (error) {
    throw new Error(`Failed to parse mkdocs.yml: ${error.message}`)
  }
}
