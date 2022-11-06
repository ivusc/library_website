/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['covers.openlibrary.org', 'books.google.com', 'cdn-icons-png.flaticon.com' ],
  }
}

module.exports = nextConfig
