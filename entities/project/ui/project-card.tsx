import Link from "next/link";
import { ProjectCover } from "@/entities/project/ui/project-cover";
import type { Project } from "@/entities/project/model/projects";

export function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="project-card"><ProjectCover project={project}/><div className="project-card-info"><div className="card-meta"><span>{project.kind}</span><span>{project.year}</span></div><div className="card-title-row"><h3>{project.title}</h3><span className="card-plus" aria-hidden="true">+</span></div><p>{project.summary}</p><div className="tags">{project.stack.slice(0,4).map((item)=><span key={item}>{item}</span>)}</div></div></Link>;
}
