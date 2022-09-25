const runtimeCaching = require('next-pwa/cache')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['t2.gstatic.com', 'www.google.com', 'google.com']
  }
}

module.exports = nextConfig
