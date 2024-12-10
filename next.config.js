/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true,
      domains: ['via.placeholder.com'],
    },
    experimental: {
      serverActions: true,
    },
    output: 'export',
    distDir: 'dist',
  }
  
  module.exports = nextConfig