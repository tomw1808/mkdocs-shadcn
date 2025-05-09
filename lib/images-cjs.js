const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = 'content-images';

function ensurePublicImageExists(originalPath) {
  // Get the full path of the original image
  const fullOriginalPath = path.join(process.cwd(), originalPath);
  
  // Create a hash of the path to use as the filename
  const filename = Buffer.from(originalPath).toString('base64url');
  const ext = path.extname(originalPath);
  const publicFilename = `${filename}${ext}`;
  
  // Ensure the public images directory exists
  const publicDir = path.join(process.cwd(), "public", PUBLIC_IMAGES_DIR);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const publicPath = path.join(publicDir, publicFilename);
  
  try {
    // Copy the file if it doesn't exist in the public directory
    if (!fs.existsSync(publicPath)) {
      fs.copyFileSync(fullOriginalPath, publicPath);
    }
    
    // Return the public URL path
    return `/${PUBLIC_IMAGES_DIR}/${publicFilename}`;
  } catch (error) {
    console.error(`Failed to process image: ${originalPath}`, error);
    throw error;
  }
}

module.exports = { ensurePublicImageExists };
