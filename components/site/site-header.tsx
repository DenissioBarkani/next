import Link from "next/link";
import type { SiteProfile } from "@/content/site";

type SiteHeaderProps = {
  readonly profile: SiteProfile;
  readonly navigation: readonly { readonly href: string; readonly label: string }[];
};

export function SiteHeader({ profile, navigation }: SiteHeaderProps) {
  return <header className="site-header"><div className="shell nav-inner"><Link href="/" className="wordmark" aria-label={`${profile.name} — главная`}><span className="monogram">db<span>.</span></span><span>{profile.name}<small>{profile.role}</small></span></Link><nav aria-label="Основная навигация">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><Link href="/#contact" className="nav-contact">Связаться<span className="small-square" /></Link></div></header>;
}
