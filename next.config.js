/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
}

// Add build script execution
const originalBuild = nextConfig.webpack || ((config) => config)
nextConfig.webpack = (config, options) => {
  if (options.isServer && !options.dev) {
    // Run image processing script during production build
    require('./scripts/process-images')
  }
  return originalBuild(config, options)
}

module.exports = nextConfig
