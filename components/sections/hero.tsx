import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ambient } from "@/components/client/ambient";
import { AccentPeriod } from "@/components/site/accent-period";
import { homePage } from "@/content/pages";
import { site } from "@/content/site";
import { withoutFinalPeriod } from "@/lib/utils";

export function Hero() {
  const { hero } = homePage;
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-square" />
          {hero.eyebrow}
        </p>
        <h1>
          {hero.title}
          <br />
          <AccentPeriod text={hero.titleLine} />
        </h1>
        <p className="hero-intro">{withoutFinalPeriod(hero.intro)}</p>
        <div className="hero-actions">
          <Button asChild className="action primary">
            <a href={hero.workLink}>{hero.workLabel}</a>
          </Button>
          <Button asChild variant="outline" className="action secondary">
            <a href={site.profile.resumeHref} download>
              <Download />
              Резюме
            </a>
          </Button>
        </div>
        <p className="hero-status">
          <span aria-hidden="true" />
          {hero.status}
        </p>
      </div>
      <Ambient />
    </section>
  );
}
