import { Braces, Code2, Globe, Layers, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import type { homePage } from "@/content/pages";
import { projectTimelineLabel } from "@/lib/projects";
import { withoutFinalPeriod } from "@/lib/utils";

const icons = { layers: Layers, braces: Braces, globe: Globe } satisfies Record<string, LucideIcon>;

type ExperienceOverviewProps = {
  readonly data: typeof homePage.experience;
  readonly projects: readonly Project[];
};

export function ExperienceOverview({ data, projects }: ExperienceOverviewProps) {
  const timeline = projects.filter((project) => project.timeline);
  return (
    <section id="experience" className="section experience-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{data.eyebrow}</p>
            <h2>{data.title}</h2>
          </div>
          <p className="heading-note">
            {withoutFinalPeriod(data.note)
              .split("\n")
              .map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>
        <div className="experience-grid">
          <aside className="experience-aside">
            <span className="large-number">
              {data.componentCount.slice(0, -1)}
              <span className="blue">+</span>
            </span>
            <p>
              {data.componentCountDescription.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            {data.capabilities.map((capability) => {
              const Icon = icons[capability.icon];
              return (
                <div className="capability" key={capability.label}>
                  <Icon size={20} />
                  <span>{capability.label}</span>
                </div>
              );
            })}
          </aside>
          <div className="timeline">
            {timeline.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="timeline-row">
                <span className="timeline-date">{project.year}</span>
                <div>
                  <span className="timeline-label">{projectTimelineLabel(project)}</span>
                  <h3>{project.title}</h3>
                  <p>{withoutFinalPeriod(project.timeline!.text)}</p>
                </div>
                <Code2 className="timeline-icon" size={23} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
