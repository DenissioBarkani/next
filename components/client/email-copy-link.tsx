"use client";

import { Check, Mail } from "lucide-react";
import { useEffect, useState } from "react";

type EmailCopyLinkProps = {
  readonly email: string;
};

export function EmailCopyLink({ email }: EmailCopyLinkProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 2_000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  }

  return <div className="contact-email"><button type="button" className="contact-github contact-email__button" onClick={copyEmail} aria-describedby="email-copy-status">{copied ? <Check size={20} /> : <Mail size={20} />}{copied ? "Почта скопирована" : <>Почта / {email}</>}</button><p id="email-copy-status" className={error ? "contact-email__status" : "sr-only"} role="status">{error ? "Не удалось скопировать адрес" : copied ? "Почта скопирована" : ""}</p></div>;
}
