import { Mail } from "lucide-react";
import { TelegramIcon } from "@/shared/ui/telegram-icon";
import { profile } from "@/entities/profile/model/profile";

export function ContactBar() {
  return <aside className="contact-bar" aria-label="Быстрые контакты"><div className="shell contact-bar__inner"><ul className="contact-bar__list"><li><a className="contact-bar__link" href={`mailto:${profile.email}`} aria-label={`Почта: ${profile.email}`}><Mail size={17}/><span>{profile.email}</span></a></li><li><a className="contact-bar__link contact-bar__link--telegram" href={profile.telegram} target="_blank" rel="noreferrer" aria-label="Telegram: @DenissioBarkaniBH"><TelegramIcon size={22}/><span>@DenissioBarkaniBH</span></a></li></ul></div></aside>;
}
