import { ContactPanel } from "@/widgets/contact-panel/ui/contact-panel";
import { AdditionalDirections } from "@/widgets/additional-directions/ui/additional-directions";
import { EducationOverview } from "@/widgets/education-overview/ui/education-overview";
import { ExperienceOverview } from "@/widgets/experience-overview/ui/experience-overview";
import { Hero } from "@/widgets/hero/ui/hero";
import { ProjectShowcase } from "@/widgets/project-showcase/ui/project-showcase";

export default function Home() { return <main id="main"><Hero /><section className="tech-strip"><div className="shell"><span>Основной стек</span><b>Vue 3</b><b>Nuxt</b><b>React</b><b>Next.js</b><b>TypeScript</b><b>Tailwind CSS</b><b>REST API</b></div></section><ProjectShowcase /><ExperienceOverview /><EducationOverview /><AdditionalDirections /><ContactPanel /></main>; }
