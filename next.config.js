/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true,
      domains: ['via.placeholder.com'],
    },
    experimental: {
      serverActions: false,
    },
    output: 'export',
  }
  
  module.exports = nextConfig