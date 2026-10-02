import { describe, expect, it } from "vitest";
import { getSameDocumentAnchor } from "@/lib/anchor-navigation";

const currentLocation = {
  href: "https://portfolio.example/projects/demo?preview=true",
  origin: "https://portfolio.example",
  pathname: "/projects/demo",
  search: "?preview=true",
} satisfies Pick<Location, "href" | "origin" | "pathname" | "search">;

describe("getSameDocumentAnchor", () => {
  it("recognizes relative and absolute anchors of the current document", () => {
    expect(getSameDocumentAnchor("#projects", currentLocation)).toEqual({
      hash: "#projects",
      id: "projects",
    });
    expect(
      getSameDocumentAnchor("/projects/demo?preview=true#section%20one", currentLocation),
    ).toEqual({ hash: "#section%20one", id: "section one" });
    expect(
      getSameDocumentAnchor("/#projects", {
        href: "https://portfolio.example/",
        origin: "https://portfolio.example",
        pathname: "/",
        search: "",
      }),
    ).toEqual({ hash: "#projects", id: "projects" });
  });

  it("ignores links to another document or origin", () => {
    expect(getSameDocumentAnchor("/projects/other#projects", currentLocation)).toBeUndefined();
    expect(getSameDocumentAnchor("/projects/demo#projects", currentLocation)).toBeUndefined();
    expect(getSameDocumentAnchor("https://example.com/#projects", currentLocation)).toBeUndefined();
  });

  it("ignores empty and malformed fragments", () => {
    expect(getSameDocumentAnchor("", currentLocation)).toBeUndefined();
    expect(getSameDocumentAnchor("#", currentLocation)).toBeUndefined();
    expect(getSameDocumentAnchor("#%E0%A4%A", currentLocation)).toBeUndefined();
  });
});
