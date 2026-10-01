import type { Metadata } from "next";
import { SiteFooter } from "@/widgets/site-footer/ui/site-footer";
import { SiteHeader } from "@/widgets/site-header/ui/site-header";
import { ParticleField } from "@/components/particle-field";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Денис Баркалов — frontend-разработчик", template: "%s — Денис Баркалов" }, description: "Портфолио frontend-разработчика Дениса Баркалова: Vue, Nuxt, TypeScript, адаптивные интерфейсы и backend-интеграции." };

export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="ru"><body><ParticleField /><div className="site-chrome"><SiteHeader />{children}<SiteFooter /></div></body></html>; }
