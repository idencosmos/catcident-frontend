/**
 * src/app/layout.tsx
 * 애플리케이션의 루트 레이아웃 컴포넌트
 * 전역 스타일, 메타데이터, 테마 설정 및 분석 도구를 관리합니다.
 */
import "@/styles/globals.css";
import "@/styles/ckeditor.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { combinedFonts } from "@/lib/fonts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Catcident";
const siteSlogan = "조선문화를 탐낸 고양이들";
const siteConcept =
  "고양이의 만행 공식 홈페이지. 야옹이왕을 찾아라 도서, 그림책, 캐릭터 상품, 갤러리, 자료실 등 다양한 콘텐츠를 만나보세요.";
const defaultDescription = `${siteName}: ${siteSlogan}. ${siteConcept}`;
const defaultOgImage = `${siteUrl}/og-default.png`; // public/og-default.png 필요

// 애플리케이션 메타데이터 설정
export const metadata: Metadata = {
  // 페이지 제목 설정 - 템플릿과 기본값 구성
  title: {
    template: `%s | ${siteName}`,
    default: `${siteName} - ${siteSlogan}`,
  },
  // 웹사이트 설명
  description: defaultDescription,
  // 파비콘 및 아이콘 설정
  icons: {
    icon: "/favicon.ico",
    // apple: '/apple-icon.png', // 필요시 추가
  },
  // Open Graph 메타데이터 - 소셜 미디어 공유 시 표시되는 정보
  openGraph: {
    title: {
      template: `%s | ${siteName}`,
      default: `${siteName} - ${siteSlogan}`,
    },
    description: defaultDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName} Default OG Image`,
      },
    ],
    type: "website",
  },
  // 웹 애플리케이션 이름 (PWA 매니페스트 등에서 사용)
  applicationName: siteName,
};

// 뷰포트 설정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // 라이트/다크 모드에 따른 테마 색상 설정
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  return (
    <html suppressHydrationWarning className={`${combinedFonts}`}>
      {/* Google Tag Manager 스크립트 */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <body className="bg-background text-foreground antialiased">
        {/* Google Tag Manager (noscript) - 자바스크립트가 비활성화된 환경을 위한 폴백 */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* 테마 제공자 - 시스템/라이트/다크 모드 지원 */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>

        {/* 테마 하이드레이션 이슈 방지를 위한 인라인 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = "catcident-theme";
                  const theme = localStorage.getItem(storageKey) || "system";
                  
                  // 시스템 테마 감지 및 적용
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  const resolvedTheme = theme === "system" ? systemTheme : theme;
                  
                  if (resolvedTheme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
