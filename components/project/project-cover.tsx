import Image from "next/image";
import { Braces, Code2, Component, Layers, PenTool, type LucideIcon } from "lucide-react";
import type { Project } from "@/content/projects";

const icons = { layers: Layers, component: Component, braces: Braces, "pen-tool": PenTool, code: Code2 } satisfies Record<string, LucideIcon>;

export function ProjectCover({ project, large = false }: { readonly project: Project; readonly large?: boolean }) {
  const { cover } = project;
  const Icon = icons[cover.icon];
  return <div className={`project-cover cover-${cover.tone} ${large ? "cover-large" : ""}`}>{cover.image ? <Image src={cover.image.src} alt={cover.image.alt} width={cover.image.width} height={cover.image.height} sizes={large ? "(max-width: 700px) calc(100vw - 40px), (max-width: 1240px) calc(100vw - 96px), 1240px" : "(max-width: 700px) calc(100vw - 40px), 50vw"} className="cover-image"/> : <><div className="cover-grid"/><div className="cover-top"><span>{cover.label}</span><Icon size={23} strokeWidth={1.4}/></div><div className="cover-type">{cover.headline}</div><div className="cover-bottom"><span>{cover.technology}</span><span className="cover-symbol" aria-hidden="true">{cover.symbol}</span></div></>}</div>;
}
