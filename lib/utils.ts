export { cn } from "cn"

export function withoutFinalPeriod(text: string) {
  return text.endsWith(".") ? text.slice(0, -1) : text;
}
