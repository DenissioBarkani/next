import type { Metadata } from "next";
import { SiteFooter } from "@/widgets/site-footer/ui/site-footer";
import { SiteHeader } from "@/widgets/site-header/ui/site-header";
import { ContactBar } from "@/widgets/contact-bar/ui/contact-bar";
import { ParticleField } from "@/features/global-particles/ui/particle-field";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Денис Баркалов · Frontend-разработчик", template: "%s · Денис Баркалов" }, description: "Портфолио Дениса Баркалова: Vue, React, TypeScript, интерфейсы, проекты и исходный код.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };

export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="ru"><body><ParticleField /><div className="site-chrome"><a className="skip-link" href="#main">К содержимому</a><ContactBar/><SiteHeader />{children}<SiteFooter /></div></body></html>; }
