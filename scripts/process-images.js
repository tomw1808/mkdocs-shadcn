const fs = require('fs');
const path = require('path');
const { ensurePublicImageExists } = require('../lib/images-cjs');

function walkDir(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.isFile() && /\.(png|jpg|jpeg|gif|svg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function processAllImages() {
  console.log('Processing all images...');
  const mkdocsDir = path.join(process.cwd(), 'mkdocs');
  const imageFiles = walkDir(mkdocsDir);
  
  for (const file of imageFiles) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`Processing: ${relativePath}`);
    ensurePublicImageExists(relativePath);
  }
  
  console.log('Finished processing images');
}

processAllImages();
