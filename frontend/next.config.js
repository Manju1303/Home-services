/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains: ['localhost'],
    },
}

module.exports = nextConfig
