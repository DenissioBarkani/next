import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectCover } from "@/components/project/project-cover";
import { withoutFinalPeriod } from "@/lib/utils";

export function ProjectCard({ project }: { readonly project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="project-card"><ProjectCover project={project}/><div className="project-card-info"><div className="card-title-row"><h3>{project.title}</h3><span className="card-year">{project.year}</span></div><p>{withoutFinalPeriod(project.summary)}</p><div className="tags">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div></div></Link>;
}
