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
    <footer className="bg-muted/50 text-muted-foreground border-t">
      <Container className="border-b">
        <Grid variant="footer">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-semibold text-sm mb-1">{section.label}</h3>
              {section.sub_menus && (
                <ul>
                  {section.sub_menus.map((sub) => (
                    <li key={sub.id}>
                      <a href={sub.href} className="text-xs hover:text-accent">
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
            <h3 className="font-semibold text-sm mb-1">Family Sites</h3>
            <ul className="flex flex-wrap gap-4 gap-y-0">
              {familySites.map((site) => (
                <li key={site.id}>
                  <a href={site.href} className="text-xs hover:text-accent">
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} {copyrightData.text}
          </div>
        </div>
      </Container>
    </footer>
  );
}
