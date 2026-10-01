import Link from "next/link";
import type { Project } from "@/entities/project/model/projects";

export function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="project-card"><div className="card-glow" /><div className="card-meta"><p className="eyebrow">{project.category}</p><span>{project.year}</span></div><h3>{project.title}</h3><p className="card-summary">{project.summary}</p><span className="card-link">Смотреть кейс <b>→</b></span></Link>;
}
