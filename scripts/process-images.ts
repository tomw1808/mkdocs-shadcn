import fs from 'fs'
import path from 'path'
import { ensurePublicImageExists } from '../lib/images'

function walkDir(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath))
    } else if (entry.isFile() && /\.(png|jpg|jpeg|gif|svg)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  
  return files
}

async function processAllImages() {
  console.log('Processing all images...')
  const mkdocsDir = path.join(process.cwd(), 'mkdocs')
  const imageFiles = walkDir(mkdocsDir)
  
  for (const file of imageFiles) {
    const relativePath = path.relative(process.cwd(), file)
    console.log(`Processing: ${relativePath}`)
    ensurePublicImageExists(relativePath)
  }
  
  console.log('Finished processing images')
}

processAllImages().catch(console.error)
