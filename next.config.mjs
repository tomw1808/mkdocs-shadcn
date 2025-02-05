// @ts-check
import withPlaiceholder from "@plaiceholder/next";
import { processAllImages } from './scripts/process-images.mjs';



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
      poll: 1000, // Check for changes every second
    }
    // // Add additional files to watch
    // if (!Array.isArray(config.watchOptions.paths)) {
    //   config.watchOptions.paths = []
    // }
    // config.watchOptions.paths.push(
    //   'mkdocs/**/*.md',
    //   'mkdocs/mkdocs.yml'
    // )
    return config
  }
}

// Add build script execution
const originalBuild = nextConfig.webpack || ((config) => config)
nextConfig.webpack = (config, options) => {
  if (options.isServer && !options.dev) {
    // Run image processing script during production build
     processAllImages();
  }
  if (!options.isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    };
  }
  return originalBuild(config, options)
}

export default withPlaiceholder(nextConfig);
