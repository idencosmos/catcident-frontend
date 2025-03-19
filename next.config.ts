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
  },

  output:
    process.env.NEXT_OUTPUT_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-*"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
