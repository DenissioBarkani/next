import Link from "next/link";
import type { MorePageData } from "@/content/pages";
import { AccentPeriod } from "@/components/site/accent-period";
import { ArrowLink } from "@/components/site/arrow-link";
import { withoutFinalPeriod } from "@/lib/utils";

export function MorePageContent({ data }: { readonly data: MorePageData }) {
  const [firstTitleLine, secondTitleLine] = data.title.split("\n");
  return (
    <main id="main" className="shell case-main more-page">
      <div className="breadcrumb">
        <Link href="/">Главная</Link>
        <span>/</span>
        <span>{data.metadata.title}</span>
      </div>
      <p className="eyebrow">{data.eyebrow}</p>
      <h1>
        {firstTitleLine}
        <br />
        <AccentPeriod text={secondTitleLine} />
      </h1>
      <p className="intro">{withoutFinalPeriod(data.intro)}</p>
      {data.sections.map((section) => (
        <section id={section.id} className="case-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {section.paragraphs.length === 1 ? withoutFinalPeriod(paragraph) : paragraph}
            </p>
          ))}
          {section.cases?.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{withoutFinalPeriod(item.text)}</p>
              {item.href && (
                <ArrowLink href={item.href} className="text-link">
                  {item.linkLabel}
                </ArrowLink>
              )}
            </div>
          ))}
          {section.tags && (
            <div className="tags">
              {section.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </section>
      ))}
      <ArrowLink href={data.backLink.href} className="text-link">
        {data.backLink.label}
      </ArrowLink>
    </main>
  );
}
