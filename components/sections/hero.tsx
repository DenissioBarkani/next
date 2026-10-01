import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ambient } from "@/components/client/ambient";
import { AccentPeriod } from "@/components/site/accent-period";
import type { homePage } from "@/content/pages";
import type { SiteProfile } from "@/content/site";

type HeroProps = { readonly data: typeof homePage.hero; readonly profile: SiteProfile };

export function Hero({ data, profile }: HeroProps) {
  return <section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span className="small-square" />{data.eyebrow}</p><h1><AccentPeriod text={data.title}/><br />{data.titleLines[0]}<br /><AccentPeriod text={data.titleLines[1]}/></h1><p className="hero-intro">{data.intro}</p><div className="hero-actions"><Button asChild className="action primary"><a href={data.workLink}>{data.workLabel}</a></Button><Button asChild variant="outline" className="action secondary"><a href={profile.resumeHref} download><Download />Резюме</a></Button></div><div className="hero-footnote"><span>{data.footnote[0]}</span><span>/</span><span>{data.footnote[1]}</span></div></div><Ambient /></section>;
}
