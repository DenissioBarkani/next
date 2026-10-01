import { Mail } from "lucide-react";
import type { SiteProfile } from "@/content/site";
import { TelegramIcon } from "@/components/site/telegram-icon";

export function ContactBar({ profile }: { readonly profile: SiteProfile }) {
  return <aside className="contact-bar" aria-label="Быстрые контакты"><div className="shell contact-bar__inner"><ul className="contact-bar__list"><li><a className="contact-bar__link" href={`mailto:${profile.email}`} aria-label={`Почта: ${profile.email}`}><Mail size={17}/><span>{profile.email}</span></a></li><li><a className="contact-bar__link contact-bar__link--telegram" href={profile.telegram} target="_blank" rel="noreferrer" aria-label={`Telegram: ${profile.telegramHandle}`}><TelegramIcon size={22}/><span>{profile.telegramHandle}</span></a></li></ul></div></aside>;
}
