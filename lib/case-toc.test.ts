import { describe, expect, it } from "vitest";
import { getActiveSectionId, isAnchorTargetReached } from "@/lib/case-toc";

describe("case table of contents", () => {
  it("selects the last section that crossed the activation line", () => {
    const sections = [
      { id: "task", top: -180 },
      { id: "contribution", top: 50 },
      { id: "result", top: 510 },
    ];

    expect(getActiveSectionId(sections, 100)).toBe("contribution");
    expect(getActiveSectionId(sections, -200)).toBeUndefined();
  });

  it("accepts the browser's normal anchor-position tolerance", () => {
    expect(isAnchorTargetReached({ targetTop: 85, offset: 53, atDocumentEnd: false })).toBe(true);
    expect(isAnchorTargetReached({ targetTop: 120, offset: 53, atDocumentEnd: false })).toBe(false);
    expect(isAnchorTargetReached({ targetTop: 500, offset: 53, atDocumentEnd: true })).toBe(true);
  });
});
