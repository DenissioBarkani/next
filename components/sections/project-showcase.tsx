import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/project/project-card";
import { ArrowLink } from "@/components/site/arrow-link";
import type { ProjectNavigationContext } from "@/lib/projects-navigation";

type ProjectShowcaseProps = {
  readonly projects: readonly Project[];
  readonly heading?: string;
  readonly eyebrow?: string;
  readonly note?: readonly string[];
  readonly allProjectsHref?: string;
  readonly context?: ProjectNavigationContext;
};

export function ProjectShowcase({
  projects,
  eyebrow = "01 / Работы",
  heading = "Проекты в деталях",
  note = ["Продуктовая разработка,", "практика и учебные проекты"],
  allProjectsHref,
  context = "catalog",
}: ProjectShowcaseProps) {
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
          </div>
          <p className="heading-note">
            {note.map((line, index) => (
              <span key={line}>
                {line}
                {index < note.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} context={context} />
          ))}
        </div>
        {allProjectsHref && (
          <ArrowLink href={allProjectsHref} className="projects-all-link">
            Все проекты
          </ArrowLink>
        )}
      </div>
    </section>
  );
}
