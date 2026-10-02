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
      <Link href={navigation.returnHref} className="arrow-link arrow-link--back">
        <ArrowLeft size={17} aria-hidden="true" />
        {navigation.returnLabel}
      </Link>
      <div className="related-projects-actions">
        {navigation.context === "home" && <ArrowLink href="/projects">Все проекты</ArrowLink>}
        <ArrowLink href={projectHref(navigation.nextSlug, navigation.context)}>
          Следующий проект
        </ArrowLink>
      </div>
    </div>
  );
}
