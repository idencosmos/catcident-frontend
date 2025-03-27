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
    qualities: [80],
  },

  compress: true,

  async headers() {
    // 환경에 따른 도메인 설정
    const domain = process.env.NODE_ENV === "production"
      ? "https://catcident.com"
      : "https://catcident.local";
    
    // 정적 리소스에 대한 공통 캐싱 헤더
    const staticCacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
      {
        key: "CDN-Cache-Control",
        value: "public, max-age=31536000",
      },
    ];

    // 정적 리소스에 대한 CORS 헤더
    const corsHeader = {
      key: "Access-Control-Allow-Origin",
      value: domain,
    };

    // CSP 설정 - 환경별로 다르게 적용
    const cspValue = process.env.NODE_ENV === "production"
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.catcident.com data:; font-src 'self' data:; connect-src 'self' https://*.catcident.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; upgrade-insecure-requests;"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.catcident.com https://cdn-test.catcident.com data:; font-src 'self' data:; connect-src 'self' https://*.catcident.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self';";

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
            value: cspValue,
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "CF-Cache-Status",
          },
          // 추가된 Cross-Origin 정책 헤더들
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
      // 폰트 파일
      {
        source: "/fonts/:path*",
        headers: [corsHeader, ...staticCacheHeaders],
      },
      // Next.js 정적 파일
      {
        source: "/_next/static/:path*",
        headers: [corsHeader, ...staticCacheHeaders],
      },
      // Next.js 이미지 최적화 엔드포인트
      {
        source: "/_next/image/:path*",
        headers: [
          corsHeader,
          ...staticCacheHeaders,
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      // 정적 이미지 경로 - CORS 헤더 추가됨
      {
        source: "/images/:path*",
        headers: [corsHeader, ...staticCacheHeaders],
      },
      // API 엔드포인트
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      // HTML 페이지 - 더 세분화된 캐싱 전략
      {
        source: "/((?!_next|api|fonts|images|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400",
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
