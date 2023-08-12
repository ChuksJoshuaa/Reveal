/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary", "graphql-request"],
  },
};

module.exports = nextConfig;
