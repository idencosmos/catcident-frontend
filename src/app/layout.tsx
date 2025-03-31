import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { combinedFonts } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Catcident",
    default: "Catcident",
  },
  description: "Welcome to Catcident.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = "catcident-theme";
                  const theme = localStorage.getItem(storageKey) || "system";
                  
                  // system 테마 처리
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
