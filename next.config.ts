import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // 이미지 최적화를 위한 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.catcident.com",
        pathname: "/public-catcident/**",
      },
      {
        protocol: "http",
        hostname: "catcident-backend-api-1",
        pathname: "/media/**",
      },

    ],
  },
  
  // CDN 연동을 위한 assetPrefix 설정
  assetPrefix: process.env.NODE_ENV === "production" 
    ? "https://cdn.mydomain.com" 
    : undefined,
};

export default withNextIntl(nextConfig);
