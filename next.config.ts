import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "acm-srm-website-2026.vercel.app",
          },
        ],
        destination: "https://www.acmsrm.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
