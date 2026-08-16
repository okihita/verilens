/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@verilens/shared'],
  devIndicators: false
};

module.exports = nextConfig;
