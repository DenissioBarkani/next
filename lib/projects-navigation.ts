import { featuredProjects, orderedProjects } from "@/lib/projects";

export type ProjectNavigationContext = "home" | "catalog";

export type ProjectNavigation = {
  readonly context: ProjectNavigationContext;
  readonly returnHref: string;
  readonly returnLabel: string;
  readonly breadcrumbLabel: string;
  readonly nextSlug: string;
};

type RawProjectNavigationContext = string | null | readonly string[];

function isHomeProject(slug: string) {
  return featuredProjects.some((project) => project.slug === slug);
}

export function parseProjectNavigationContext(
  rawContext: RawProjectNavigationContext,
  projectSlug: string,
): ProjectNavigationContext {
  const context = Array.isArray(rawContext)
    ? rawContext.length === 1
      ? rawContext[0]
      : null
    : rawContext;
  return context === "home" && isHomeProject(projectSlug) ? "home" : "catalog";
}

export function projectHref(slug: string, context: ProjectNavigationContext = "catalog") {
  return context === "home" ? `/projects/${slug}?from=home` : `/projects/${slug}`;
}

export function resolveProjectNavigation(
  projectSlug: string,
  rawContext: RawProjectNavigationContext,
): ProjectNavigation {
  const context = parseProjectNavigationContext(rawContext, projectSlug);
  const collection = context === "home" ? featuredProjects : orderedProjects;
  const projectIndex = collection.findIndex((project) => project.slug === projectSlug);
  const nextSlug =
    collection[(projectIndex + 1) % collection.length]?.slug ?? orderedProjects[0].slug;

  return context === "home"
    ? {
        context,
        returnHref: "/#projects",
        returnLabel: "К работам на главной",
        breadcrumbLabel: "Работы",
        nextSlug,
      }
    : {
        context,
        returnHref: "/projects",
        returnLabel: "Ко всем проектам",
        breadcrumbLabel: "Работы",
        nextSlug,
      };
}
