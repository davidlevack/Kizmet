/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['via.placeholder.com'],
    },
    experimental: {
      serverActions: true,
    },
    output: 'standalone',
  }
  
  module.exports = nextConfig