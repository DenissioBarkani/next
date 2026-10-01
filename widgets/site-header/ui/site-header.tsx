"use client";

import Link from "next/link";
import { Mail, Menu, Send, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/entities/profile/model/profile";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  return <><div className="contact-bar"><div className="container contact-bar__inner"><a className="contact-bar__link" href={`mailto:${profile.email}`} aria-label={`Почта: ${profile.email}`} title={`Почта: ${profile.email}`}><Mail aria-hidden="true" /><span>{profile.email}</span></a><a className="contact-bar__link contact-bar__telegram" href={profile.telegram} target="_blank" rel="noreferrer" aria-label="Telegram: HackConf" title="Telegram: HackConf"><Send aria-hidden="true" /><span>HackConf</span></a></div></div><header className="site-header"><div className="container header-inner"><Link href="/" className="brand" onClick={closeMenu}>{profile.name}<span>.</span></Link><nav className="desktop-nav" aria-label="Основная навигация"><Link href="/#projects">Проекты</Link><Link href="/#about">Обо мне</Link><a className="nav-pill" href={profile.telegram} target="_blank" rel="noreferrer">Telegram</a><a className="header-contact" href={`mailto:${profile.email}`}>Написать мне</a></nav><button className="menu-toggle" type="button" aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>{isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>{isMenuOpen && <nav className="mobile-nav container" aria-label="Мобильная навигация"><Link href="/#projects" onClick={closeMenu}>Проекты</Link><Link href="/#about" onClick={closeMenu}>Обо мне</Link><a href={profile.telegram} target="_blank" rel="noreferrer" onClick={closeMenu}>Telegram</a><a href={`mailto:${profile.email}`} onClick={closeMenu}>Написать мне</a></nav>}</header></>;
}
