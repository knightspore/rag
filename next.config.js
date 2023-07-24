/** @format */

const withPWA = require('next-pwa')({
    dest: 'public',
});
const runetimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['t2.gstatic.com', 'www.google.com', 'google.com'],
    },
    experimental: {
        appDir: true,
    },
};

module.exports = withPWA(nextConfig);
