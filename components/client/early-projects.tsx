"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

type EarlyProject = {
  readonly period?: string;
  readonly title: string;
  readonly text: string;
  readonly href?: string;
  readonly linkLabel?: string;
};

type EarlyProjectsProps = {
  readonly data: {
    readonly title: string;
    readonly summary: string;
    readonly items: readonly EarlyProject[];
  };
};

export function EarlyProjects({ data }: EarlyProjectsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="early-projects">
      <button
        type="button"
        className="early-projects-toggle"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>
          <span className="early-projects-title">{data.title}</span>
          <span className="early-projects-summary">{data.summary}</span>
        </span>
        <ChevronDown
          className={isOpen ? "early-projects-chevron is-open" : "early-projects-chevron"}
        />
      </button>
      {isOpen && (
        <div className="early-projects-content" id={contentId}>
          {data.items.map((item) => (
            <article className="early-project" key={item.title}>
              <div>
                {item.period && <span className="timeline-date">{item.period}</span>}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              {item.href && item.linkLabel && (
                <Link href={item.href} className="arrow-link early-project-link">
                  {item.linkLabel}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
