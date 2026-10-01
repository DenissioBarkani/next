import type { MetadataRoute } from "next";
import { publishedProjects } from "@/entities/project/model/projects";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = "https://denis-barkalov.vercel.app"; return [{ url: baseUrl }, ...publishedProjects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}` }))]; }
