/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add mkdocs directory to webpack watch list
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['node_modules/**', '.next/**'],
    }
    return config
  }
}

// Add build script execution
const originalBuild = nextConfig.webpack || ((config) => config)
nextConfig.webpack = (config, options) => {
  if (options.isServer && !options.dev) {
    // Run image processing script during production build
    require('./scripts/process-images.js')
  }
  return originalBuild(config, options)
}

module.exports = nextConfig
