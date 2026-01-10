import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: (process.env.NODE_ENV === 'production' ? 'export' : undefined),
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'porto')
    return config
  },
  allowedDevOrigins: ['192.168.1.200'],
  ...(process.env.NODE_ENV !== 'production' ? {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8787/api/:path*'
        }
      ]
    }
  } : {})
};

export default nextConfig;
