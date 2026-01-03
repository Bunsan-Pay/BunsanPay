import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'porto')
    return config
  }
};

export default nextConfig;
