export const ANCHOR_OFFSET_TOLERANCE = 48;

export type SectionPosition = {
  readonly id: string;
  readonly top: number;
};

export function getActiveSectionId(
  sections: readonly SectionPosition[],
  activationLine: number,
): string | undefined {
  return sections.reduce<string | undefined>(
    (activeId, section) => (section.top <= activationLine ? section.id : activeId),
    undefined,
  );
}

export function isAnchorTargetReached({
  targetTop,
  offset,
  atDocumentEnd,
}: {
  readonly targetTop: number;
  readonly offset: number;
  readonly atDocumentEnd: boolean;
}) {
  return (
    atDocumentEnd || (targetTop >= offset - 16 && targetTop <= offset + ANCHOR_OFFSET_TOLERANCE)
  );
}
