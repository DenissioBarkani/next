import Link from "next/link";
import { ArrowRight, GitFork, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "@/components/client/code-viewer";
import { MediaGallery } from "@/components/client/media-gallery";
import { ProjectToc, type ProjectTocItem } from "@/components/client/project-toc";
import { ProjectCaseStudy } from "@/components/project/project-case-study";
import { ProjectCover } from "@/components/project/project-cover";
import type { Project, ProjectTask } from "@/content/projects";
import { projectKindLabel } from "@/lib/projects";
import { withoutFinalPeriod } from "@/lib/utils";

type ProjectDetailsProps = { readonly project: Project; readonly nextProject: Project };

function ProjectTaskItem({ index, task }: { readonly index: number; readonly task: ProjectTask }) {
  return (
    <li>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div>
        {typeof task === "string" ? (
          withoutFinalPeriod(task)
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{withoutFinalPeriod(task.text)}</p>
          </>
        )}
      </div>
    </li>
  );
}

export function ProjectDetails({ project, nextProject }: ProjectDetailsProps) {
  const codeSection = project.codeSection;
  const caseStudy = project.caseStudy;
  const unavailableNotes = [
    !project.demo ? project.unavailable?.demo : undefined,
    !project.repo ? project.unavailable?.repo : undefined,
  ].filter((note): note is string => Boolean(note));
  const tocItems: readonly ProjectTocItem[] = caseStudy
    ? [
        { id: "task", label: "Задача и роль" },
        { id: "contribution", label: "Мой вклад" },
        { id: "frontend", label: "Ключевые моменты" },
        { id: "result", label: "Результат" },
      ]
    : [
        ...(project.context ? [{ id: "about", label: "О проекте" }] : []),
        { id: "contribution", label: "Мой вклад" },
        ...(project.decisions.length > 0 ? [{ id: "decisions", label: "Ключевые моменты" }] : []),
        ...(project.demoNote ? [{ id: "demo", label: "Демонстрация" }] : []),
        ...(project.media.length > 0 ? [{ id: "media", label: "Интерфейсы" }] : []),
        { id: "result", label: "Результат" },
        ...(project.examples.length > 0 ? [{ id: "code", label: "Исходный код" }] : []),
      ];

  return (
    <main id="main" className="shell case-main">
      <div className="breadcrumb">
        <Link href="/">Главная</Link>
        <span>/</span>
        <Link href="/#projects">Работы</Link>
        <span>/</span>
        <span>{project.shortTitle}</span>
      </div>
      <section className="case-intro">
        <div>
          <p className="eyebrow">{projectKindLabel(project)}</p>
          <h1>{project.title}</h1>
          <p className="case-description">{withoutFinalPeriod(project.description)}</p>
          {project.heroNote && (
            <p className="case-highlight">{withoutFinalPeriod(project.heroNote)}</p>
          )}
          <div className="case-actions">
            {project.demo ? (
              <Button asChild className="action primary">
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <Globe size={17} />
                  Открыть сайт
                </a>
              </Button>
            ) : (
              <Button disabled className="action primary" title="Сайт не опубликован">
                <Globe size={17} />
                Сайт не опубликован
              </Button>
            )}
            {project.repo ? (
              <Button asChild variant="outline" className="action secondary">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GitFork size={17} />
                  Репозиторий
                </a>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="action secondary"
                title="Репозиторий недоступен"
              >
                <GitFork size={17} />
                Репозиторий недоступен
              </Button>
            )}
          </div>
          {unavailableNotes.map((note) => (
            <p className="case-action-note" key={note}>
              {withoutFinalPeriod(note)}
            </p>
          ))}
        </div>
        <aside className="case-summary">
          <ProjectCover project={project} detail />
          <dl className="case-meta">
            <div>
              <dt>Период</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Моя роль</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Стек</dt>
              <dd>
                <div className="tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </aside>
      </section>
      <div className="case-body">
        <ProjectToc items={tocItems} />
        <div className="case-content">
          {caseStudy ? (
            <ProjectCaseStudy study={caseStudy} />
          ) : (
            <>
              {project.context && (
                <section id="about" className="case-section case-context">
                  <h2>О проекте</h2>
                  {project.context.map((paragraph) => (
                    <p key={paragraph}>
                      {project.context!.length === 1 ? withoutFinalPeriod(paragraph) : paragraph}
                    </p>
                  ))}
                </section>
              )}
              <section id="contribution" className="case-section">
                <h2>Что я сделал</h2>
                <ol className="task-list">
                  {project.tasks.map((task, index) => (
                    <ProjectTaskItem
                      key={typeof task === "string" ? task : task.title}
                      index={index}
                      task={task}
                    />
                  ))}
                </ol>
              </section>
              {project.decisions.length > 0 && (
                <section id="decisions" className="case-section">
                  <h2>Ключевые моменты</h2>
                  <div className="decision-grid">
                    {project.decisions.map((decision) => (
                      <div className="decision" key={decision.title}>
                        <h3>{decision.title}</h3>
                        <p>{withoutFinalPeriod(decision.text)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {project.demoNote && (
                <section id="demo" className="case-section">
                  <h2>Демонстрационная версия</h2>
                  <div className="demo-note">
                    <p>{withoutFinalPeriod(project.demoNote)}</p>
                    {project.demo && (
                      <Button asChild variant="outline" className="action secondary">
                        <a href={project.demo} target="_blank" rel="noreferrer">
                          <Globe size={17} />
                          Открыть демо
                        </a>
                      </Button>
                    )}
                  </div>
                </section>
              )}
              {project.media.length > 0 && (
                <section id="media" className="case-section">
                  <h2>Интерфейсы</h2>
                  {project.mediaIntro && (
                    <p className="media-intro">{withoutFinalPeriod(project.mediaIntro)}</p>
                  )}
                  <MediaGallery items={project.media} />
                </section>
              )}
              <section id="result" className="case-section">
                <h2>Результат</h2>
                <div className="result-box">
                  <p>{withoutFinalPeriod(project.result)}</p>
                </div>
                {project.repoNote && (
                  <p className="repo-note">{withoutFinalPeriod(project.repoNote)}</p>
                )}
                {!project.repo && project.examples.length === 0 && !project.unavailable?.repo && (
                  <p className="repo-note">
                    Исходники проекта закрыты. На странице описан мой вклад в разработку
                  </p>
                )}
              </section>
              {codeSection && (
                <section id="code" className="case-section">
                  <p className="eyebrow">{codeSection.eyebrow}</p>
                  <h2>{codeSection.title}</h2>
                  <p className="code-intro">{withoutFinalPeriod(codeSection.intro)}</p>
                  <CodeViewer files={project.examples} />
                </section>
              )}
            </>
          )}
        </div>
      </div>
      <div className="related-projects">
        <Link href="/#projects">Все работы</Link>
        <Link href={`/projects/${nextProject.slug}`} className="next-project-link">
          Следующий проект: {nextProject.shortTitle}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
