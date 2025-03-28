import React from "react";
import {
  getFooterSections,
  getFamilySites,
  getCopyright,
} from "@/lib/api/footer";
import { FooterSection, FamilySite, Copyright } from "@/lib/api/_types/footer";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";

export interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const footerSections: FooterSection[] = await getFooterSections(locale);
  const familySites: FamilySite[] = await getFamilySites(locale);
  const copyrightData: Copyright = await getCopyright(locale);

  return (
    <footer className="bg-background backdrop-blur-md border-t">
      <Container className="border-b">
        <Grid className="text-sm">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h2 className="font-semibold text-lg mb-2">{section.label}</h2>
              {section.sub_menus && (
                <ul className="space-y-1">
                  {section.sub_menus.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.href}
                        className="text-base hover:text-accent"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Grid>
      </Container>
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-lg mb-2">Family Sites</h3>
            <ul className="flex gap-4">
              {familySites.map((site) => (
                <li key={site.id}>
                  <a href={site.href} className="text-base hover:text-accent">
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            © {new Date().getFullYear()} {copyrightData.text}
          </div>
        </div>
      </Container>
    </footer>
  );
}
