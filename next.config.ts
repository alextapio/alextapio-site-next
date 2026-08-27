import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; form-action 'self' https://6db3ffe5.sibforms.com; script-src 'self' 'unsafe-inline' https://sibforms.com; style-src 'self' 'unsafe-inline' https://sibforms.com; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://6db3ffe5.sibforms.com https://sibforms.com; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
