import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@verilens/shared'],
  devIndicators: false
};

export default nextConfig;
