/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
    ],
  },
  env: {
    GRAPHQL_URL:
      'https://api-sa-east-1.hygraph.com/v2/clrad90h4138601wa2w9ischq/master',
  },
}

module.exports = nextConfig
