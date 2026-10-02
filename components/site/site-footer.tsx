import Link from "next/link";
import { GitFork } from "lucide-react";
import type { SiteProfile } from "@/content/site";

export function SiteFooter({
  profile,
  year,
}: {
  readonly profile: SiteProfile;
  readonly year: string;
}) {
  return (
    <footer className="site-footer shell">
      <Link href="/" className="footer-name">
        {profile.name} <span className="blue">/</span> Frontend
      </Link>
      <span>© {year}</span>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`GitHub ${profile.name}`}
      >
        <GitFork size={19} />
      </a>
    </footer>
  );
}
