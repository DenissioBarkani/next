import { AdditionalDirections } from "@/components/sections/additional-directions";
import { ContactPanel } from "@/components/sections/contact-panel";
import { EducationOverview } from "@/components/sections/education-overview";
import { ExperienceOverview } from "@/components/sections/experience-overview";
import { Hero } from "@/components/sections/hero";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { homePage } from "@/content/pages";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <Hero data={homePage.hero} profile={site.profile} />
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
      <ProjectShowcase projects={projects} />
      <ExperienceOverview data={homePage.experience} projects={projects} />
      <EducationOverview data={homePage.education} />
      <AdditionalDirections data={homePage.directions} />
      <ContactPanel data={homePage.contacts} profile={site.profile} />
    </main>
  );
}
