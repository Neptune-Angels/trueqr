import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/generator', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
