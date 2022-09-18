/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['t2.gstatic.com', 'www.google.com']
  }
}

module.exports = nextConfig
