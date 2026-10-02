export type CurrentDocumentLocation = Pick<Location, "href" | "origin" | "pathname" | "search">;

export type SameDocumentAnchor = {
  readonly hash: string;
  readonly id: string;
};

export function getSameDocumentAnchor(
  href: string,
  currentLocation: CurrentDocumentLocation,
): SameDocumentAnchor | undefined {
  const destination = new URL(href, currentLocation.href);

  if (
    destination.origin !== currentLocation.origin ||
    destination.pathname !== currentLocation.pathname ||
    destination.search !== currentLocation.search ||
    destination.hash.length < 2
  ) {
    return undefined;
  }

  try {
    const id = decodeURIComponent(destination.hash.slice(1));
    return id ? { hash: destination.hash, id } : undefined;
  } catch {
    return undefined;
  }
}
