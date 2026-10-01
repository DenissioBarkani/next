import Link from "next/link";
import { GitFork } from "lucide-react";
import { profile } from "@/entities/profile/model/profile";

export function SiteFooter() { return <footer className="site-footer shell"><Link href="/" className="footer-name">Денис Баркалов <span className="blue">/</span> Frontend</Link><span>© 2026</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub Дениса Баркалова"><GitFork size={19} /></a></footer>; }
