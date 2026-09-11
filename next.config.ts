import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/severance-pay",
        destination: "/severance-irp",
        permanent: true,
      },
      {
        source: "/tax-return",
        destination: "/year-end-tax",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
