import Image from "next/image";
import { Braces, Code2, Component, Layers, PenTool, type LucideIcon } from "lucide-react";
import type { Project } from "@/content/projects";

const icons = {
  layers: Layers,
  component: Component,
  braces: Braces,
  "pen-tool": PenTool,
  code: Code2,
} satisfies Record<string, LucideIcon>;

type ProjectCoverProps = {
  readonly project: Project;
  readonly detail?: boolean;
};

export function ProjectCover({ project, detail = false }: ProjectCoverProps) {
  const { cover } = project;
  const Icon = icons[cover.icon];
  const sizes = detail
    ? "(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 35vw, 420px"
    : "(max-width: 700px) calc(100vw - 40px), 50vw";

  return <div className={`project-cover cover-${cover.tone} ${detail ? "cover-detail" : ""}`}>{cover.image ? <Image src={cover.image.src} alt={cover.image.alt} width={cover.image.width} height={cover.image.height} sizes={sizes} className="cover-image"/> : <><div className="cover-grid"/><div className="cover-top"><span>{cover.label}</span><Icon size={23} strokeWidth={1.4}/></div><div className="cover-type">{cover.headline}</div><div className="cover-bottom"><span>{cover.technology}</span><span className="cover-symbol" aria-hidden="true">{cover.symbol}</span></div></>}</div>;
}
