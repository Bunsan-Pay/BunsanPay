import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'porto')
    return config
  },
  allowedDevOrigins: ['192.168.1.200']
};

export default nextConfig;
