import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.catcident.com",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "catcident-backend-api-1",
        pathname: "/media/**",
      },
    ],
  },

};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
