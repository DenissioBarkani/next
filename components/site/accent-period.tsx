export function AccentPeriod({ text }: { readonly text: string }) {
  if (!text.endsWith(".")) return text;
  return <>{text.slice(0, -1)}<span className="blue">.</span></>;
}
