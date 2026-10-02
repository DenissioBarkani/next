"use client";

import { useEffect } from "react";
import { getSameDocumentAnchor } from "@/lib/anchor-navigation";

function scrollToAnchor(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

function getAnchorFromEventTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
}

export function AnchorNavigation() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = getAnchorFromEventTarget(event.target);
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self"))
        return;

      const anchor = getSameDocumentAnchor(link.href, window.location);
      if (!anchor || !scrollToAnchor(anchor.id)) return;

      event.preventDefault();
      if (window.location.hash !== anchor.hash) {
        window.history.pushState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${anchor.hash}`,
        );
      }
    }

    function handleHistoryNavigation() {
      if (!window.location.hash) return;

      try {
        scrollToAnchor(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        // Keep the browser's default behavior for malformed URL fragments.
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("hashchange", handleHistoryNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("hashchange", handleHistoryNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
    };
  }, []);

  return null;
}
