// src/components/layout/Footer/Footer.tsx
import React from "react";
import { getFooterSections, getFamilySites, getCopyright } from "@/lib/api/footer";

export interface FooterProps {
  locale: string;
}

interface FooterSubMenuData {
  id: number;
  href: string;
  label: string;
}

interface FooterSectionData {
  id: number;
  label: string;
  sub_menus?: FooterSubMenuData[];
}

interface FamilySiteData {
  id: number;
  label: string;
  href: string;
}

interface CopyrightData {
  id: number;
  text: string;
}

export default async function Footer({ locale }: FooterProps) {
  const footerSections = (await getFooterSections(locale)) as FooterSectionData[];
  const familySites = (await getFamilySites(locale)) as FamilySiteData[];
  const copyrightData = (await getCopyright(locale)) as CopyrightData | null;

  return (
    <footer className="mt-10 bg-background/95 backdrop-blur-md border-t">
      <div className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
            {footerSections?.map((section) => (
              <div key={section.id}>
                <h2 className="font-semibold text-lg mb-2">{section.label}</h2>
                {section.sub_menus && (
                  <ul className="space-y-1">
                    {section.sub_menus.map((sub) => (
                      <li key={sub.id}>
                        <a href={sub.href} className="hover:text-accent">
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 text-sm text-muted-foreground">
          <div>
            <h3 className="font-semibold mb-2">Family Sites</h3>
            <ul className="flex gap-4">
              {familySites?.map((site) => (
                <li key={site.id}>
                  <a href={site.href} className="hover:text-accent">
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            © {new Date().getFullYear()} {copyrightData?.text ?? "All rights reserved"}
          </div>
        </div>
      </div>
    </footer>
  );
}