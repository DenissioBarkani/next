import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/project/project-details";
import { findProject, getNextProject, projectStaticParams } from "@/lib/projects";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return projectStaticParams()}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const project=findProject(slug);return {title:project?.title??"Проект не найден",description:project?.summary}}
export default async function ProjectPage({params}:Props){const {slug}=await params;const project=findProject(slug);if(!project)notFound();return <ProjectDetails project={project} nextProject={getNextProject(slug)}/>}
