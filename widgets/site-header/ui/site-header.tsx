import Link from "next/link";
import { profile } from "@/entities/profile/model/profile";

export function SiteHeader() {
  return <header className="site-header"><div className="shell nav-inner"><Link href="/" className="wordmark" aria-label="Денис Баркалов — главная"><span className="monogram">db<span>.</span></span><span>{profile.name}<small>{profile.role}</small></span></Link><nav aria-label="Основная навигация"><Link href="/#projects">Работы</Link><Link href="/#experience">Опыт</Link><Link href="/#about">Обо мне</Link></nav><Link href="/#contact" className="nav-contact">Связаться<span className="small-square" /></Link></div></header>;
}
