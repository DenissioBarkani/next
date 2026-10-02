"use client";

import { useEffect, useRef, useState } from "react";
import {
  ANCHOR_CANCELLED_EVENT,
  ANCHOR_NAVIGATE_EVENT,
  ANCHOR_SETTLED_EVENT,
  getStickyAnchorOffset,
  type AnchorNavigationDetail,
} from "@/components/client/anchor-navigation";
import { ANCHOR_OFFSET_TOLERANCE, getActiveSectionId } from "@/lib/case-toc";

export type ProjectTocItem = {
  readonly id: string;
  readonly label: string;
};

type ProjectTocProps = {
  readonly items: readonly ProjectTocItem[];
};

export function ProjectToc({ items }: ProjectTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const linksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const itemIds = new Set(items.map((item) => item.id));
    let frameId = 0;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    function getHashId() {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        return itemIds.has(id) ? id : undefined;
      } catch {
        return undefined;
      }
    }

    function updateActiveFromScroll() {
      if (document.documentElement.hasAttribute("data-anchor-scrolling")) return;

      const headerOffset = getStickyAnchorOffset();

      const currentSectionId = getActiveSectionId(
        sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top })),
        headerOffset + ANCHOR_OFFSET_TOLERANCE,
      );

      if (currentSectionId && itemIds.has(currentSectionId)) setActiveId(currentSectionId);
      else if (sections[0]) setActiveId(sections[0].id);
    }

    function handleNavigation(event: Event) {
      const detail = (event as CustomEvent<AnchorNavigationDetail>).detail;
      if (itemIds.has(detail.id)) setActiveId(detail.id);
    }

    function handleSettledOrCancelled() {
      requestAnimationFrame(updateActiveFromScroll);
    }

    function handleScroll() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveFromScroll);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(ANCHOR_NAVIGATE_EVENT, handleNavigation);
    window.addEventListener(ANCHOR_SETTLED_EVENT, handleSettledOrCancelled);
    window.addEventListener(ANCHOR_CANCELLED_EVENT, handleSettledOrCancelled);
    const hashId = getHashId();
    frameId = requestAnimationFrame(() => {
      if (hashId) setActiveId(hashId);
      else updateActiveFromScroll();
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(ANCHOR_NAVIGATE_EVENT, handleNavigation);
      window.removeEventListener(ANCHOR_SETTLED_EVENT, handleSettledOrCancelled);
      window.removeEventListener(ANCHOR_CANCELLED_EVENT, handleSettledOrCancelled);
    };
  }, [items]);

  useEffect(() => {
    const activeLink = activeId ? linkRefs.current[activeId] : undefined;
    if (!activeLink) return;

    linksRef.current?.scrollTo({
      left: activeLink.offsetLeft - (linksRef.current.clientWidth - activeLink.offsetWidth) / 2,
      behavior: "auto",
    });
  }, [activeId]);

  return (
    <nav className="case-toc" aria-label="Разделы проекта">
      <div className="case-toc__heading">
        <p className="eyebrow">Навигация по кейсу</p>
        <p className="case-toc__hint">Быстрый переход к разделу</p>
      </div>
      <div className="case-toc__links" ref={linksRef}>
        {items.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            aria-current={activeId === item.id ? "location" : undefined}
            ref={(element) => {
              linkRefs.current[item.id] = element;
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
