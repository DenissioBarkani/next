import { Download, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/site/telegram-icon";
import { AccentPeriod } from "@/components/site/accent-period";
import { ContactReveal } from "@/components/client/contact-reveal";
import type { homePage } from "@/content/pages";
import type { SiteProfile } from "@/content/site";

type ContactPanelProps = { readonly data: typeof homePage.contacts; readonly profile: SiteProfile };

export function ContactPanel({ data, profile }: ContactPanelProps) {
  const [firstTitleLine, secondTitleLine] = data.title.split("\n");
  return <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="eyebrow">{data.eyebrow}</p><h2>{firstTitleLine}<br /><AccentPeriod text={secondTitleLine}/></h2><p>{data.text.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p></div><div className="contact-links"><ContactReveal sitekey={process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY}/><a className="contact-github" href={profile.telegram} target="_blank" rel="noreferrer"><TelegramIcon size={20}/>Telegram / {profile.telegramHandle.slice(1)}</a><a className="contact-github" href={profile.github} target="_blank" rel="noreferrer"><GitFork size={20} />GitHub / {profile.githubHandle}</a><Button asChild variant="outline" className="action secondary"><a href={profile.resumeHref} download><Download size={17} />Скачать резюме · DOC</a></Button></div></div></section>;
}
