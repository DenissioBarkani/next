import { ArrowRight, AudioLines, Braces, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { homePage } from "@/content/pages";

const icons = { audio: AudioLines, braces: Braces } satisfies Record<string, LucideIcon>;

export function AdditionalDirections() {
  const { directions } = homePage;
  return (
    <section className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{directions.eyebrow}</p>
          <h2>{directions.title}</h2>
        </div>
      </div>
      <div className="more-grid">
        {directions.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link href={item.href} className="more-card" key={item.href}>
              <Icon size={27} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="arrow-link">
                Посмотреть подробнее <ArrowRight aria-hidden="true" size={17} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
