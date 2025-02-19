// app/[locale]/layout.tsx
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="container mx-auto p-4">{children}</main>
      <Footer locale={locale} />
    </>
  );
}