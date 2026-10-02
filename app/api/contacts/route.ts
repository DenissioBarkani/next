export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const attempts = new Map<string, number[]>();

type CaptchaResponse = { readonly status?: string };

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp))
    return json({ error: "Слишком много попыток. Подождите минуту и попробуйте снова." }, 429);

  const token = await getToken(request);
  if (!token)
    return json({ error: "Не удалось получить токен проверки. Попробуйте ещё раз." }, 400);

  const config = getContactConfig();
  if (!config) return json({ error: "Сервис контактов временно недоступен." }, 503);

  const verified = await verifyCaptcha(token, config.captchaSecret, clientIp);
  if (!verified) return json({ error: "Проверка не пройдена. Попробуйте ещё раз." }, 403);

  return json({ phone: config.phone });
}

async function getToken(request: Request) {
  try {
    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("token" in body) ||
      typeof body.token !== "string"
    )
      return null;
    const token = body.token.trim();
    return token.length > 0 && token.length <= 4_096 ? token : null;
  } catch {
    return null;
  }
}

function getContactConfig() {
  const captchaSecret = process.env.YANDEX_SMARTCAPTCHA_SERVER_KEY;
  const phone = process.env.CONTACT_PHONE;
  if (!captchaSecret || !phone) return null;
  return { captchaSecret, phone };
}

async function verifyCaptcha(token: string, secret: string, ip: string) {
  try {
    const response = await fetch("https://smartcaptcha.yandexcloud.net/validate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, token, ip }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as CaptchaResponse;
    return result.status === "ok";
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((attempt) => now - attempt < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function json(body: { readonly error: string } | { readonly phone: string }, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}
