import { describe, expect, it } from "vitest";
import {
  parseProjectNavigationContext,
  projectHref,
  resolveProjectNavigation,
} from "@/lib/projects-navigation";

describe("project navigation", () => {
  it("keeps a home context only for projects featured on the homepage", () => {
    expect(parseProjectNavigationContext("home", "tournament-platform")).toBe("home");
    expect(parseProjectNavigationContext("home", "smart-home")).toBe("catalog");
  });

  it("uses the catalog for missing, repeated or unknown contexts", () => {
    expect(parseProjectNavigationContext(null, "tournament-platform")).toBe("catalog");
    expect(parseProjectNavigationContext(["home", "catalog"], "tournament-platform")).toBe(
      "catalog",
    );
    expect(parseProjectNavigationContext("catalog", "tournament-platform")).toBe("catalog");
    expect(parseProjectNavigationContext("unknown", "tournament-platform")).toBe("catalog");
  });

  it("creates clean catalog URLs and preserves the homepage context", () => {
    expect(projectHref("tournament-platform")).toBe("/projects/tournament-platform");
    expect(projectHref("tournament-platform", "home")).toBe(
      "/projects/tournament-platform?from=home",
    );
  });

  it("returns and cycles within the current project collection", () => {
    expect(resolveProjectNavigation("ai-artdir", "home")).toMatchObject({
      returnHref: "/#projects",
      returnLabel: "К работам на главной",
      nextSlug: "tournament-platform",
    });
    expect(resolveProjectNavigation("vue-sneakers", null)).toMatchObject({
      returnHref: "/projects",
      returnLabel: "Ко всем проектам",
      nextSlug: "tournament-platform",
    });
  });
});
