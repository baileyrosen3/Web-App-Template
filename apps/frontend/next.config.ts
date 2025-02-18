import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_URL || 'https://web-app-template-production.up.railway.app'
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  },
  async rewrites() {
    // Default to production URL if not set, this ensures Vercel build succeeds
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL || 'https://web-app-template-production.up.railway.app'
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
