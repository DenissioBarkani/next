import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitFork,Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "@/entities/project/ui/project-cover";
import { CodeViewer } from "@/features/code-explorer/ui/code-viewer";
import { MediaGallery } from "@/features/media-gallery/ui/media-gallery";
import { getProject,projects } from "@/entities/project/model/projects";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=getProject(slug);return {title:p?.title??"Проект не найден",description:p?.summary}}
export default async function ProjectPage({params}:Props){const {slug}=await params;const p=getProject(slug);if(!p)notFound();const next=projects[(projects.findIndex(x=>x.slug===slug)+1)%projects.length];return <main id="main" className="shell case-main"><div className="breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/#projects">Работы</Link><span>/</span><span>{p.shortTitle}</span></div>
 <section className="case-intro"><div><p className="eyebrow">{p.kind}</p><h1>{p.title}</h1><p className="case-description">{p.description}</p><div className="case-actions">{p.demo&&<Button asChild className="action primary"><a href={p.demo} target="_blank" rel="noreferrer"><Globe size={17}/>Открыть сайт</a></Button>}{p.repo&&<Button asChild variant="outline" className="action secondary"><a href={p.repo} target="_blank" rel="noreferrer"><GitFork size={17}/>Репозиторий</a></Button>}</div></div><dl className="case-meta"><div><dt>Период</dt><dd>{p.year}</dd></div><div><dt>Моя роль</dt><dd>{p.role}</dd></div><div><dt>Стек</dt><dd><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></dd></div></dl></section>
 <ProjectCover project={p} large/>
 <div className="case-body"><nav className="case-toc" aria-label="Разделы проекта"><p className="eyebrow">В этом проекте</p><a href="#contribution">Мой вклад</a>{p.decisions.length>0&&<a href="#decisions">Решения и стек</a>}<a href="#result">Результат</a>{p.media.length>0&&<a href="#media">Интерфейсы</a>}{p.examples.length>0&&<a href="#code">Исходный код</a>}</nav><div className="case-content">
  <section id="contribution" className="case-section"><h2>Что я сделал</h2><ol className="task-list">{p.tasks.map((t,i)=><li key={t}><span>{String(i+1).padStart(2,"0")}</span><div>{t}</div></li>)}</ol></section>
  {p.decisions.length>0&&<section id="decisions" className="case-section"><h2>Решения и технологии</h2><div className="decision-grid">{p.decisions.map(d=><div className="decision" key={d.title}><h3>{d.title}</h3><p>{d.text}</p></div>)}</div></section>}
  <section id="result" className="case-section"><h2>Результат</h2><div className="result-box"><p>{p.result}</p></div>{p.repoNote&&<p className="repo-note">{p.repoNote}</p>}{!p.repo&&p.examples.length===0&&<p className="repo-note">Исходники проекта закрыты. На странице описан мой вклад в разработку.</p>}</section>
  {p.media.length>0&&<section id="media" className="case-section"><h2>Интерфейсы и демонстрация</h2><MediaGallery items={p.media}/></section>}
  {p.examples.length>0&&<section id="code" className="case-section"><p className="eyebrow">Реальные исходники</p><h2>{p.slug==="student-profile"?"Next.js: публичные примеры":"Немного кода"}</h2><p className="code-intro">{p.slug==="student-profile"?"Фрагменты из моего публичного репозитория student-dep: работа с данными, компоненты и фильтры.":"Выбранные фрагменты из публичного репозитория. У каждого файла есть пояснение и ссылка на точную версию исходника."}</p><CodeViewer files={p.examples}/></section>}
 </div></div><div className="related-projects"><Link href="/#projects">Все работы</Link><Link href={`/projects/${next.slug}`}>Следующий проект: {next.shortTitle}</Link></div>
 </main>}
