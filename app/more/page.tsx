import type { Metadata } from "next";
import { MorePageContent } from "@/components/sections/more-page-content";
import { morePage } from "@/content/pages";

export const metadata: Metadata = morePage.metadata;

export default function More() {
  return <MorePageContent data={morePage} />;
}
