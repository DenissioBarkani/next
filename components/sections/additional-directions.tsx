import { ArrowRight, AudioLines, Braces, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { homePage } from "@/content/pages";

const icons = { audio: AudioLines, braces: Braces } satisfies Record<string, LucideIcon>;

export function AdditionalDirections({ data }: { readonly data: typeof homePage.directions }) {
  return <section className="section shell"><div className="section-heading"><div><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2></div></div><div className="more-grid">{data.items.map((item) => { const Icon = icons[item.icon]; return <Link href={item.href} className="more-card" key={item.href}><Icon size={27}/><h3>{item.title}</h3><p>{item.text}</p><span className="text-link">Посмотреть подробнее <ArrowRight aria-hidden="true" size={18}/></span></Link>; })}</div></section>;
}
