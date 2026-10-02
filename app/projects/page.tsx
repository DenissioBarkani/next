import type { Metadata } from "next";
import Link from "next/link";
import { ProjectShowcase } from "@/components/sections/project-showcase";
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
      <ProjectShowcase
        projects={orderedProjects}
        eyebrow="Работы"
        heading="Все проекты"
        note={["Коммерческие, учебные", "и личные проекты"]}
      />
    </main>
  );
}
