import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/post",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/post",
      },
      {
        source: "/images/:path*",
        destination: "/api/images/:path*",
      },
    ];
  },
};

export default nextConfig;
