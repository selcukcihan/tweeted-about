/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'pbs.twimg.com',
  //       pathname: '/*',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
