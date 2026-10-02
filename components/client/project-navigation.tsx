"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLink } from "@/components/site/arrow-link";
import type { Project } from "@/content/projects";
import { projectHref, resolveProjectNavigation } from "@/lib/projects-navigation";

type ProjectNavigationProps = {
  readonly project: Pick<Project, "slug" | "shortTitle">;
};

function useProjectNavigation(projectSlug: string) {
  const searchParams = useSearchParams();
  return resolveProjectNavigation(projectSlug, searchParams.getAll("from"));
}

export function ProjectBreadcrumb({ project }: ProjectNavigationProps) {
  const navigation = useProjectNavigation(project.slug);
  return (
    <div className="breadcrumb">
      <Link href="/">Главная</Link>
      <span>/</span>
      <Link href={navigation.returnHref}>{navigation.breadcrumbLabel}</Link>
      <span>/</span>
      <span aria-current="page">{project.shortTitle}</span>
    </div>
  );
}

export function ProjectRelatedNavigation({ project }: ProjectNavigationProps) {
  const navigation = useProjectNavigation(project.slug);
  return (
    <div className="related-projects">
      <Link
        href={navigation.returnHref}
        className="arrow-link arrow-link--back related-projects-back"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        <span className="related-projects-label related-projects-label--desktop">
          {navigation.returnLabel}
        </span>
        <span className="related-projects-label related-projects-label--mobile">К работам…</span>
      </Link>
      <div className="related-projects-actions">
        <ArrowLink
          href="/projects"
          className={
            navigation.context === "home"
              ? "related-projects-all"
              : "related-projects-all related-projects-all--mobile-only"
          }
        >
          Все проекты
        </ArrowLink>
        <ArrowLink
          href={projectHref(navigation.nextSlug, navigation.context)}
          className="related-projects-next"
        >
          <span className="related-projects-label related-projects-label--desktop">
            Следующий проект
          </span>
          <span className="related-projects-label related-projects-label--mobile">Следующий</span>
        </ArrowLink>
      </div>
    </div>
  );
}
