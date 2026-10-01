import { Mail, Send } from "lucide-react";
import { profile } from "@/entities/profile/model/profile";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-contacts"><div><p className="footer-label">Контакты</p><h2>Есть задача?<br />Давайте обсудим.</h2></div><div className="footer-actions"><a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />{profile.email}</a><a href={profile.telegram} target="_blank" rel="noreferrer"><Send aria-hidden="true" />Telegram · HackConf</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
}
