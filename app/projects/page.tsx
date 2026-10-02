import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project/project-card";
import { orderedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Все проекты",
  description: "Коммерческие, учебные и личные проекты Дениса Баркалова.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="projects-page">
      <div className="shell">
        <div className="breadcrumb">
          <Link href="/">Главная</Link>
          <span>/</span>
          <span>Работы</span>
        </div>
      </div>
      <section id="projects" className="section projects-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Работы</p>
              <h2>Все проекты</h2>
            </div>
            <p className="heading-note">
              Коммерческие, учебные
              <br />и личные проекты
            </p>
          </div>
          <div className="project-grid">
            {orderedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
