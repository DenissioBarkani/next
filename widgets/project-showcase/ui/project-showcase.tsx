import { projects } from "@/entities/project/model/projects";
import { ProjectCard } from "@/entities/project/ui/project-card";

export function ProjectShowcase() { return <section id="projects" className="section projects-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">01 / Выбранные работы</p><h2>Проекты в деталях</h2></div><p className="heading-note">Продуктовая разработка,<br/>практика и учебные проекты.</p></div><div className="project-grid">{projects.map((project)=><ProjectCard key={project.slug} project={project}/>)}</div></div></section>; }
