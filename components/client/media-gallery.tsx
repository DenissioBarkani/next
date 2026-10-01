"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ProjectMedia } from "@/content/projects";

export function MediaGallery({ items }: { readonly items: readonly ProjectMedia[] }) {
  return <div className="media-grid">{items.map((item) => <figure className="media-item" key={item.src}>{item.type === "video" ? <video controls preload="metadata" poster={item.poster}><source src={item.src}/></video> : <Dialog><DialogTrigger asChild><button type="button" aria-label={`Увеличить: ${item.caption}`}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 700px) calc(100vw - 40px), 50vw"/></button></DialogTrigger><DialogContent className="media-dialog" showCloseButton={false}><DialogTitle>{item.caption}</DialogTitle><DialogDescription className="sr-only">Изображение проекта в увеличенном размере.</DialogDescription><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="min(1100px, calc(100vw - 32px))"/><DialogClose asChild><Button variant="outline">Закрыть</Button></DialogClose></DialogContent></Dialog>}<figcaption>{item.caption}</figcaption></figure>)}</div>;
}
