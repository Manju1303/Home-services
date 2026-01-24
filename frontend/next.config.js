/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    basePath: '/Home-services',
    assetPrefix: '/Home-services/',
    images: {
        unoptimized: true,
        domains: ['localhost'],
    },
}

module.exports = nextConfig
