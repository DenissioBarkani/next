"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteProfile } from "@/content/site";

type SiteHeaderProps = {
  readonly profile: SiteProfile;
  readonly navigation: readonly { readonly href: string; readonly label: string }[];
};

export function SiteHeader({ profile, navigation }: SiteHeaderProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 700px)");
    let lastScrollY = window.scrollY;

    function updateHeaderVisibility() {
      if (document.documentElement.hasAttribute("data-anchor-scrolling")) return;

      if (!mobileViewport.matches) {
        setIsHidden(false);
        lastScrollY = window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      const distance = scrollY - lastScrollY;

      if (scrollY < 16) {
        setIsHidden(false);
      } else if (Math.abs(distance) >= 12) {
        setIsHidden(distance > 0);
      }

      lastScrollY = scrollY;
    }

    function resetForViewportChange() {
      lastScrollY = window.scrollY;
      if (!mobileViewport.matches) setIsHidden(false);
    }

    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    mobileViewport.addEventListener("change", resetForViewportChange);
    updateHeaderVisibility();

    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      mobileViewport.removeEventListener("change", resetForViewportChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-mobile-header-hidden", isHidden);
    return () => document.documentElement.removeAttribute("data-mobile-header-hidden");
  }, [isHidden]);

  return (
    <header className={`site-header${isHidden ? " site-header--hidden" : ""}`}>
      <div className="shell nav-inner">
        <Link href="/" className="wordmark" aria-label={`${profile.name} — главная`}>
          <span className="monogram">
            DB<span>.</span>
          </span>
          <span>
            {profile.name}
            <small>{profile.role}</small>
          </span>
        </Link>
        <nav aria-label="Основная навигация">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="nav-contact">
          Контакты
          <span className="small-square" />
        </Link>
      </div>
    </header>
  );
}
