"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Keep route transitions deterministic when Next preserves a visible page position. */
export function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const routeChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (window.location.hash.length > 1 || (!routeChanged && window.scrollY === 0)) return;

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
}
