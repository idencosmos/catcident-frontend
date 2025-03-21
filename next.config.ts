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
      // 전역 보안 헤더 설정
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "production"
                ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.catcident.com data:; font-src 'self' data:; connect-src 'self' https://*.catcident.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; upgrade-insecure-requests;"
                : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.catcident.com https://cdn-test.catcident.com data:; font-src 'self' data:; connect-src 'self' https://*.catcident.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self';",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "CF-Cache-Status",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "https://catcident.com"
                : "https://catcident.local",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "https://catcident.com"
                : "https://catcident.local",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000",
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
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/((?!_next|api|fonts|images|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  output: "standalone",
  serverExternalPackages: ["sharp"],

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-*"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
    serverMinification: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
