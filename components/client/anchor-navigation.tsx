"use client";

import { useEffect } from "react";
import { getSameDocumentAnchor } from "@/lib/anchor-navigation";
import { isAnchorTargetReached } from "@/lib/case-toc";

export const ANCHOR_NAVIGATE_EVENT = "portfolio:anchor-navigate";
export const ANCHOR_SETTLED_EVENT = "portfolio:anchor-settled";
export const ANCHOR_CANCELLED_EVENT = "portfolio:anchor-cancelled";

export type AnchorNavigationSource = "click" | "history";

export type AnchorNavigationDetail = {
  readonly id: string;
  readonly source: AnchorNavigationSource;
  readonly token: number;
};

export function getStickyAnchorOffset() {
  if (!window.matchMedia("(max-width: 700px)").matches) return 35;

  const header = document.querySelector<HTMLElement>(".site-header");
  const toc = document.querySelector<HTMLElement>(".case-toc");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  const tocRect = toc?.getBoundingClientRect();
  const visibleHeaderBottom = Math.max(0, headerBottom);
  const tocIsSticky = tocRect && tocRect.top <= visibleHeaderBottom + 1;

  return tocIsSticky ? Math.max(visibleHeaderBottom, tocRect.bottom) + 8 : visibleHeaderBottom + 8;
}

function scrollToAnchor(id: string, behavior: ScrollBehavior) {
  const target = document.getElementById(id);
  if (!target) return false;

  const top = Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - getStickyAnchorOffset(),
  );

  window.scrollTo({
    top,
    left: 0,
    behavior,
  });
  return true;
}

function getAnchorFromEventTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
}

export function AnchorNavigation() {
  useEffect(() => {
    let token = 0;
    let activeOperation: AnchorNavigationDetail | undefined;
    let frameId = 0;
    let lastScrollY = window.scrollY;
    let stableFrames = 0;

    function dispatch(name: string, detail: AnchorNavigationDetail) {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    }

    function clearOperation(detail: AnchorNavigationDetail, cancelled = false) {
      if (activeOperation?.token !== detail.token) return;
      activeOperation = undefined;
      document.documentElement.removeAttribute("data-anchor-scrolling");
      dispatch(cancelled ? ANCHOR_CANCELLED_EVENT : ANCHOR_SETTLED_EVENT, detail);
    }

    function isAtTarget(id: string) {
      const target = document.getElementById(id);
      if (!target) return true;

      const offset = getStickyAnchorOffset();
      const top = target.getBoundingClientRect().top;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const atDocumentEnd = window.scrollY >= maxScroll - 1;
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < 1) stableFrames += 1;
      else stableFrames = 0;
      lastScrollY = scrollY;

      return isAnchorTargetReached({ targetTop: top, offset, atDocumentEnd }) && stableFrames >= 2;
    }

    function monitorOperation(detail: AnchorNavigationDetail) {
      if (activeOperation?.token !== detail.token) return;
      if (isAtTarget(detail.id)) {
        clearOperation(detail);
        return;
      }
      frameId = requestAnimationFrame(() => monitorOperation(detail));
    }

    function startOperation(id: string, source: AnchorNavigationSource) {
      const detail: AnchorNavigationDetail = { id, source, token: ++token };
      activeOperation = detail;
      stableFrames = 0;
      lastScrollY = window.scrollY;
      document.documentElement.setAttribute("data-anchor-scrolling", "true");
      dispatch(ANCHOR_NAVIGATE_EVENT, detail);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollToAnchor(id, reducedMotion ? "auto" : "smooth");

      if (reducedMotion) {
        frameId = requestAnimationFrame(() => monitorOperation(detail));
      } else {
        frameId = requestAnimationFrame(() => monitorOperation(detail));
      }
    }

    function cancelFromUserInput() {
      if (!activeOperation) return;
      cancelAnimationFrame(frameId);
      clearOperation(activeOperation, true);
    }

    function handleScrollEnd() {
      if (activeOperation) {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => monitorOperation(activeOperation!));
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (interruptKeys.has(event.key)) cancelFromUserInput();
    }

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
      if (!anchor || !document.getElementById(anchor.id)) return;

      event.preventDefault();
      if (window.location.hash !== anchor.hash) {
        window.history.pushState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${anchor.hash}`,
        );
      }
      startOperation(anchor.id, "click");
    }

    function handleHistoryNavigation() {
      if (!window.location.hash) return;

      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (document.getElementById(id)) startOperation(id, "history");
      } catch {
        // Keep the browser's default behavior for malformed URL fragments.
      }
    }

    const interruptKeys = new Set([
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "End",
      "Home",
      "PageDown",
      "PageUp",
      " ",
    ]);

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("wheel", cancelFromUserInput, { passive: true });
    window.addEventListener("touchstart", cancelFromUserInput, { passive: true });
    window.addEventListener("pointerdown", cancelFromUserInput, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("hashchange", handleHistoryNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("wheel", cancelFromUserInput);
      window.removeEventListener("touchstart", cancelFromUserInput);
      window.removeEventListener("pointerdown", cancelFromUserInput);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
      document.documentElement.removeAttribute("data-anchor-scrolling");
    };
  }, []);

  return null;
}
