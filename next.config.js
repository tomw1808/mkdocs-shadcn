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
  // Enable serving static files from the mkdocs directory
  experimental: {
    outputFileTracingIncludes: {
      '/mkdocs/**/*': true,
    },
  },
}

module.exports = nextConfig
