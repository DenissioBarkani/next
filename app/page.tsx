import { AdditionalDirections } from "@/components/sections/additional-directions";
import { ContactPanel } from "@/components/sections/contact-panel";
import { EducationOverview } from "@/components/sections/education-overview";
import { ExperienceOverview } from "@/components/sections/experience-overview";
import { Hero } from "@/components/sections/hero";
import { ProjectCard } from "@/components/project/project-card";
import { ArrowLink } from "@/components/site/arrow-link";
import { homePage } from "@/content/pages";
import { featuredProjects } from "@/lib/projects";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section className="tech-strip">
        <div className="shell">
          <span>Основной опыт</span>
          {homePage.technology.primary.map((item) => (
            <b key={item}>{item}</b>
          ))}
          <span>Дополнительно</span>
          {homePage.technology.secondary.map((item) => (
            <b key={item}>{item}</b>
          ))}
        </div>
      </section>
      <section id="projects" className="section projects-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Работы</p>
              <h2>Проекты в деталях</h2>
            </div>
            <p className="heading-note">
              Продуктовая разработка,
              <br />
              практика и учебные проекты
            </p>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} context="home" />
            ))}
          </div>
          <ArrowLink href="/projects" className="projects-all-link">
            Все проекты
          </ArrowLink>
        </div>
      </section>
      <ExperienceOverview />
      <EducationOverview />
      <AdditionalDirections />
      <ContactPanel />
    </main>
  );
}
