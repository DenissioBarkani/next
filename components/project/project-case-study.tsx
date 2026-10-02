import { MediaGallery } from "@/components/client/media-gallery";
import type { ProjectCaseStudy } from "@/content/projects";
import { withoutFinalPeriod } from "@/lib/utils";

export function ProjectCaseStudy({ study }: { readonly study: ProjectCaseStudy }) {
  return (
    <>
      <section id="task" className="case-section case-context">
        <h2>Задача и моя роль</h2>
        {study.task.map((paragraph, index) => (
          <p className={index === 1 ? "case-role-highlight" : undefined} key={paragraph}>
            {study.task.length === 1 ? withoutFinalPeriod(paragraph) : paragraph}
          </p>
        ))}
      </section>
      <section id="contribution" className="case-section">
        <h2>Мой вклад</h2>
        <div className="contribution-list">
          {study.contributions.map((contribution) => (
            <article className="contribution-item" key={contribution.title}>
              <div>
                <h3>{contribution.title}</h3>
                <p>{withoutFinalPeriod(contribution.text)}</p>
              </div>
              {contribution.media && (
                <MediaGallery
                  items={contribution.media}
                  className={contribution.media.length === 1 ? "media-grid--single" : undefined}
                />
              )}
            </article>
          ))}
        </div>
      </section>
      <section id="frontend" className="case-section">
        <h2>
          Ключевые моменты{" "}
          <span className="section-stars" aria-hidden="true">
            ✦ ✦ ✦
          </span>
        </h2>
        <div className="decision-grid">
          {study.frontend.map((item) => (
            <div className="decision" key={item.title}>
              <h3>{item.title}</h3>
              <p>{withoutFinalPeriod(item.text)}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="result" className="case-section">
        <h2>Результат</h2>
        <div className="case-results">
          {study.results.map((result) => (
            <div className="result-box" key={result.title}>
              <h3>{result.title}</h3>
              <p>{withoutFinalPeriod(result.text)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
