import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ParticleField } from "@/components/client/particle-field";
import { ContactBar } from "@/components/site/contact-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.metadata.defaultTitle, template: site.metadata.titleTemplate },
  description: site.metadata.description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <ParticleField />
        <div className="site-chrome">
          <a className="skip-link" href="#main">
            К содержимому
          </a>
          <ContactBar profile={site.profile} />
          <SiteHeader profile={site.profile} navigation={site.navigation} />
          {children}
          <SiteFooter profile={site.profile} year={site.footerYear} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
