import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import {
  findProject,
  getNextProject,
  projectSitemapEntries,
  projectStaticParams,
} from "@/lib/projects";

describe("project catalog", () => {
  it("builds static params for every project", () => {
    expect(projectStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it("finds projects by slug and returns undefined for unknown values", () => {
    expect(findProject("student-profile")?.title).toBe("Цифровой профиль студента");
    expect(findProject("missing-project")).toBeUndefined();
  });

  it("wraps the next project after the last entry", () => {
    expect(getNextProject(projects.at(-1)!.slug).slug).toBe(projects[0].slug);
  });

  it("creates one absolute sitemap entry per project", () => {
    expect(projectSitemapEntries(site.url)).toEqual(
      projects.map((project) => ({ url: `${site.url}/projects/${project.slug}` })),
    );
  });
});
