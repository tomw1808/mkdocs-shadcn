const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

async function fetchSearchData() {
  // Start the development server if not already running
  const devServer = exec('npm run dev')

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000))

  try {
    // Fetch the search data
    const response = await fetch('http://localhost:3000/api/search')
    const searchData = await response.json()

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public', 'search')
    fs.mkdirSync(publicDir, { recursive: true })

    // Write the search index
    fs.writeFileSync(
      path.join(publicDir, 'search-index.json'),
      JSON.stringify(searchData, null, 2)
    )
  } finally {
    // Kill the development server
    devServer.kill()
  }
}

fetchSearchData().catch(console.error)
