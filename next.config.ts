import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
      process.env.NODE_ENV === "production"
        ? [
            {
              protocol: "https",
              hostname: "cdn.catcident.com",
              pathname: "/media/**",
            },
          ]
        : [
            {
              protocol: "https",
              hostname: "cdn.catcident.com",
              pathname: "/media/**",
            },
            {
              protocol: "https",
              hostname: "cdn-test.catcident.com",
              pathname: "/media/**",
            },
          ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  compress: true,

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  output:
    process.env.NEXT_OUTPUT_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,

  serverExternalPackages: ["sharp"],

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-*"],
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
