// purpose: Next.js 애플리케이션의 설정을 구성합니다. 이미지 최적화, 압축, 헤더, 국제화 등을 설정합니다.

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 호스트를 환경별로 설정합니다.
    remotePatterns:
      process.env.NODE_ENV === "production"
        ? [
            {
              protocol: "https",
              hostname: "cdn.catcident.com",
              pathname: "/media/**",
            },
            {
              protocol: "https",
              hostname: "cdn-test.catcident.com", // 테스트 환경 CDN
              pathname: "/media/**",
            },
          ]
        : [
            // 개발 환경에서는 프로덕션 및 테스트 CDN 모두 허용
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
    formats: ["image/avif", "image/webp"], // 지원할 이미지 포맷
    minimumCacheTTL: 31536000, // 1년 (초 단위)
  },

  compress: true, // Gzip 압축 활성화

  async headers() {
    // 환경에 따른 애플리케이션 도메인 설정
    const domain =
      process.env.NODE_ENV === "production"
        ? "https://catcident.com"
        : "https://catcident.local";

    // 정적 리소스(폰트, JS, CSS, 이미지 등)에 적용될 공통 캐싱 헤더
    const staticCacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable", // 브라우저 캐시: 1년, 변경 불가
      },
      {
        key: "CDN-Cache-Control",
        value: "public, max-age=31536000", // CDN 캐시: 1년
      },
    ];

    // 정적 리소스에 대한 CORS(Cross-Origin Resource Sharing) 헤더
    const corsHeader = {
      key: "Access-Control-Allow-Origin",
      value: domain, // 허용할 출처 지정
    };

    // Content Security Policy (CSP) 설정: XSS 공격 등을 방지하기 위해 리소스 로드 정책 정의
    const cspValue =
      process.env.NODE_ENV === "production"
        ? `default-src 'self';
       script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://www.googletagmanager.com https://tagmanager.google.com;
       style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com;
       img-src 'self' https://cdn.catcident.com https://*.google-analytics.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com https://www.google.com https://www.google.co.kr data:;
       font-src 'self' https://fonts.gstatic.com data:;
       connect-src 'self' https://*.catcident.com https://*.google-analytics.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net;
       frame-src 'self' https://*.googletagmanager.com https://www.googletagmanager.com https://www.google.com;
       worker-src 'self' blob:;
       media-src 'self';
       frame-ancestors 'none';
       form-action 'self';
       base-uri 'self';
       upgrade-insecure-requests;` // 프로덕션 CSP: 더 엄격한 정책 적용
            .replace(/\s{2,}/g, " ")
            .trim()
        : `default-src 'self';
       script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://www.googletagmanager.com https://tagmanager.google.com;
       style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com;
       img-src 'self' https://cdn.catcident.com https://cdn-test.catcident.com https://*.google-analytics.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com https://www.google.com https://www.google.co.kr data:;
       font-src 'self' https://fonts.gstatic.com data:;
       connect-src 'self' https://*.catcident.com https://*.google-analytics.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net;
       frame-src 'self' https://*.googletagmanager.com https://www.googletagmanager.com https://www.google.com;
       worker-src 'self' blob:;
       media-src 'self';
       frame-ancestors 'none';
       form-action 'self';
       base-uri 'self';` // 개발 CSP: 테스트 CDN 등 추가 허용
            .replace(/\s{2,}/g, " ")
            .trim();

    return [
      // 모든 경로에 적용될 기본 보안 헤더
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" }, // MIME 타입 스니핑 방지
          { key: "X-Frame-Options", value: "DENY" }, // Clickjacking 방지
          { key: "X-XSS-Protection", value: "1; mode=block" }, // XSS 필터 활성화
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Referer 정보 전송 정책
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          }, // HSTS 활성화 (2년)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          }, // 기능 사용 권한 제어
          { key: "Content-Security-Policy", value: cspValue }, // CSP 적용
          { key: "Access-Control-Expose-Headers", value: "CF-Cache-Status" }, // Cloudflare 캐시 상태 노출
          // Cross-Origin 정책 헤더 (Spectre 등 사이드 채널 공격 방어 강화)
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" }, // COEP: require-corp 대신 credentialless 사용 (더 유연함)
        ],
      },
      // 폰트 파일 경로 (/public/fonts/*)
      {
        source: "/fonts/:path*",
        headers: [corsHeader, ...staticCacheHeaders], // CORS 및 정적 캐싱 헤더 적용
      },
      // Next.js 빌드 결과 정적 파일 경로 (JS, CSS 등)
      {
        source: "/_next/static/:path*",
        headers: [corsHeader, ...staticCacheHeaders], // CORS 및 정적 캐싱 헤더 적용
      },
      // Next.js 이미지 최적화 API 엔드포인트
      {
        source: "/_next/image/:path*",
        headers: [
          corsHeader,
          ...staticCacheHeaders,
          { key: "Vary", value: "Accept" }, // Accept 헤더 값에 따라 캐시 구분
        ],
      },
      // 정적 이미지 경로 (/public/images/* 등)
      {
        source: "/images/:path*",
        headers: [corsHeader, ...staticCacheHeaders], // CORS 및 정적 캐싱 헤더 적용
      },
      // API 라우트 경로
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" }, // API 응답은 캐시하지 않음
        ],
      },
      // HTML 페이지 경로 (정적 파일, API 제외 모든 경로)
      {
        source: "/((?!_next|api|fonts|images|.*\\..*).*)", // 정규식: 특정 경로 제외
        headers: [
          // 페이지 캐싱 전략: 브라우저 1시간, CDN 2시간, stale-while-revalidate 1일
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

  poweredByHeader: false, // 'X-Powered-By: Next.js' 헤더 비활성화
  output: "standalone", // 독립 실행형 빌드 출력
  serverExternalPackages: ["sharp"], // 'sharp' 패키지를 번들링에서 제외 (standalone 빌드 시 필요)

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-*"], // 지정된 패키지 가져오기 최적화
    serverActions: {
      bodySizeLimit: "2mb", // 서버 액션 요청 본문 크기 제한
    },
    serverMinification: true, // 서버 측 코드 최소화 활성화
  },
};

// next-intl 플러그인 적용
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
