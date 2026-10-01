import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projectSitemapEntries } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.url }, { url: `${site.url}/more` }, ...projectSitemapEntries(site.url)]; }
