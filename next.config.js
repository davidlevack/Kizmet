/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com'
        }
      ]
    },
    experimental: {
      // Remove serverActions if not needed
      // serverActions: {
      //   allowedOrigins: ['kizmet.vercel.app']
      // }
    }
  }
  
  module.exports = nextConfig