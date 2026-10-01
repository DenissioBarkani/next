import { GitFork, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/entities/profile/model/profile";

export function ContactPanel() { return <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="eyebrow">05 / Контакты</p><h2>Давайте<br />познакомимся<span className="blue">.</span></h2><p>Ищу работу во frontend-разработке.<br />Готов обсудить проекты и задачи команды.</p></div><div className="contact-links"><a className="contact-phone" href={profile.phoneHref}>{profile.phone}</a><a className="contact-github" href={profile.github} target="_blank" rel="noreferrer"><GitFork size={20} />GitHub / DenissioBarkani</a><Button asChild variant="outline" className="action secondary"><a href="/resume/denis-barkalov.doc" download><Download size={17} />Скачать резюме · DOC</a></Button></div></div></section>; }
