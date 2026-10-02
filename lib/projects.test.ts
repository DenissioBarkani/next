import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import {
  findProject,
  featuredProjects,
  orderedProjects,
  projectSitemapEntries,
  projectStaticParams,
} from "@/lib/projects";

describe("project catalog", () => {
  it("builds static params for every project", () => {
    expect(projectStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it("finds projects by slug and returns undefined for unknown values", () => {
    expect(findProject("student-profile")?.title).toBe("Цифровой профиль студента");
    expect(findProject("smart-home")?.title).toBe("Панель управления умным домом");
    expect(findProject("missing-project")).toBeUndefined();
  });

  it("keeps the four featured projects in homepage order", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "tournament-platform",
      "student-profile",
      "center-invest",
      "ai-artdir",
    ]);
  });

  it("keeps every project in the all-projects order", () => {
    expect(orderedProjects.map((project) => project.slug)).toEqual([
      "tournament-platform",
      "student-profile",
      "center-invest",
      "ai-artdir",
      "smart-home",
      "vue-sneakers",
    ]);
  });

  it("creates one absolute sitemap entry per project", () => {
    expect(projectSitemapEntries(site.url)).toEqual(
      projects.map((project) => ({ url: `${site.url}/projects/${project.slug}` })),
    );
  });
});
