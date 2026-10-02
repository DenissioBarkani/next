import { Code2 } from "lucide-react";
import Link from "next/link";
import { EarlyProjects } from "@/components/client/early-projects";
import { homePage } from "@/content/pages";
import { projects } from "@/content/projects";
import { projectTimelineLabel } from "@/lib/projects";
import { withoutFinalPeriod } from "@/lib/utils";

export function ExperienceOverview() {
  const { experience } = homePage;
  const timeline = projects.filter((project) => project.timeline);
  return (
    <section id="experience" className="section experience-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{experience.eyebrow}</p>
            <h2>{experience.title}</h2>
          </div>
          <p className="heading-note">
            {withoutFinalPeriod(experience.note)
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
          <div className="timeline">
            {timeline.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}?from=home`}
                className="timeline-row"
              >
                <span className="timeline-date">{project.year}</span>
                <div>
                  <span className="timeline-label">{projectTimelineLabel(project)}</span>
                  <h3>{project.title}</h3>
                  <p>{withoutFinalPeriod(project.timeline!.text)}</p>
                </div>
                <Code2 className="timeline-icon" size={23} />
              </Link>
            ))}
            <EarlyProjects />
          </div>
        </div>
      </div>
    </section>
  );
}
