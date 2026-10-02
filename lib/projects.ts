import { projects, type Project } from "@/content/projects";

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectKindLabel(project: Pick<Project, "kind">) {
  return project.kind.detail
    ? `${project.kind.label} · ${project.kind.detail}`
    : project.kind.label;
}

export function projectTimelineLabel(project: Pick<Project, "kind" | "timeline">) {
  if (!project.timeline) return projectKindLabel(project);
  if (project.timeline.label) return project.timeline.label;
  return project.timeline.suffix
    ? `${projectKindLabel(project)} · ${project.timeline.suffix}`
    : project.kind.label;
}

export const featuredProjects = projects
  .filter((project) => project.featured)
  .toSorted((first, second) => first.featuredOrder - second.featuredOrder);

export const orderedProjects = projects.toSorted(
  (first, second) => first.featuredOrder - second.featuredOrder,
);

export function projectStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function projectSitemapEntries(baseUrl: string) {
  return projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}` }));
}
