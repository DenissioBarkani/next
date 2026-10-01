"use client";

import { useState } from "react";
import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import { Button } from "@/components/ui/button";
import { withoutFinalPeriod } from "@/lib/utils";

type ContactDetails = {
  readonly phone: string;
};

type ContactRevealProps = {
  readonly sitekey: string | undefined;
};

export function ContactReveal({ sitekey }: ContactRevealProps) {
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactDetails>();
  const [message, setMessage] = useState<string>();

  async function revealContacts(token: string) {
    setCaptchaVisible(false);
    setIsLoading(true);
    setMessage(undefined);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        cache: "no-store",
      });
      const body: unknown = await response.json();

      if (!response.ok || !isContactDetails(body)) {
        setMessage(getErrorMessage(body));
        return;
      }

      setContacts(body);
    } catch {
      setMessage(withoutFinalPeriod("Не удалось проверить капчу. Попробуйте ещё раз."));
    } finally {
      setIsLoading(false);
    }
  }

  function startCaptcha() {
    if (!sitekey) {
      setMessage(withoutFinalPeriod("Капча ещё не настроена. Добавьте ключ SmartCaptcha в переменные окружения."));
      return;
    }

    setMessage(undefined);
    setCaptchaVisible(true);
  }

  return <div className="contact-reveal"><div className="contact-reveal__control">{contacts ? <a className="contact-phone" href={`tel:${contacts.phone.replace(/[^+\d]/g, "")}`}>{contacts.phone}</a> : <Button type="button" className="action primary" onClick={startCaptcha} disabled={isLoading}>{isLoading ? "Проверяем…" : "Показать телефон"}</Button>}</div>{sitekey ? <InvisibleSmartCaptcha sitekey={sitekey} language="ru" visible={captchaVisible} hideShield onChallengeHidden={() => setCaptchaVisible(false)} onSuccess={revealContacts} onNetworkError={() => { setCaptchaVisible(false); setMessage(withoutFinalPeriod("Не удалось загрузить капчу. Попробуйте ещё раз.")); }} onJavascriptError={() => { setCaptchaVisible(false); setMessage(withoutFinalPeriod("Не удалось загрузить капчу. Попробуйте ещё раз.")); }} onTokenExpired={() => { setCaptchaVisible(false); setMessage(withoutFinalPeriod("Срок проверки истёк. Попробуйте ещё раз.")); }} /> : null}{message ? <p className="contact-reveal__status" role="alert">{message}</p> : null}</div>;
}

function isContactDetails(value: unknown): value is ContactDetails {
  if (typeof value !== "object" || value === null) return false;
  const contacts = value as Record<string, unknown>;
  return typeof contacts.phone === "string";
}

function getErrorMessage(value: unknown) {
  if (typeof value === "object" && value !== null && "error" in value && typeof value.error === "string") return withoutFinalPeriod(value.error);
  return withoutFinalPeriod("Не удалось подтвердить проверку. Попробуйте ещё раз.");
}
