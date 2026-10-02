import { Download, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/site/telegram-icon";
import { AccentPeriod } from "@/components/site/accent-period";
import { ContactReveal } from "@/components/client/contact-reveal";
import { EmailCopyLink } from "@/components/client/email-copy-link";
import { homePage } from "@/content/pages";
import { site } from "@/content/site";

export function ContactPanel() {
  const { contacts } = homePage;
  const { profile } = site;
  const [firstTitleLine, secondTitleLine] = contacts.title.split("\n");
  return (
    <section id="contact" className="contact-section">
      <div className="shell contact-inner">
        <div>
          <p className="eyebrow">{contacts.eyebrow}</p>
          <h2>
            {firstTitleLine}
            <br />
            <AccentPeriod text={secondTitleLine} />
          </h2>
          <p>
            {contacts.text.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="contact-links">
          <ContactReveal />
          <EmailCopyLink email={profile.email} />
          <a className="contact-github" href={profile.telegram} target="_blank" rel="noreferrer">
            <TelegramIcon size={20} />
            Telegram / {profile.telegramHandle.slice(1)}
          </a>
          <a className="contact-github" href={profile.github} target="_blank" rel="noreferrer">
            <GitFork size={20} />
            GitHub / {profile.githubHandle}
          </a>
          <Button asChild variant="outline" className="action secondary">
            <a href={profile.resumeHref} download>
              <Download size={17} />
              Скачать резюме · PDF
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
