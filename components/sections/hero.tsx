import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ambient } from "@/components/client/ambient";
import { AccentPeriod } from "@/components/site/accent-period";
import { withoutFinalPeriod } from "@/lib/utils";
import type { homePage } from "@/content/pages";
import type { SiteProfile } from "@/content/site";

type HeroProps = { readonly data: typeof homePage.hero; readonly profile: SiteProfile };

export function Hero({ data, profile }: HeroProps) {
  return <section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span className="small-square" />{data.eyebrow}</p><h1>{data.title}<br/><AccentPeriod text={data.titleLine}/></h1><p className="hero-intro">{withoutFinalPeriod(data.intro)}</p><div className="hero-actions"><Button asChild className="action primary"><a href={data.workLink}>{data.workLabel}</a></Button><Button asChild variant="outline" className="action secondary"><a href={profile.resumeHref} download><Download />Резюме</a></Button></div><p className="hero-status"><span aria-hidden="true"/>{data.status}</p></div><Ambient /></section>;
}
