"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CodeExcerpt } from "@/entities/project/model/projects";

export function CodePanel({ excerpts }: { excerpts: CodeExcerpt[] }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activePath, setActivePath] = useState(excerpts[0]?.path ?? "");
  const activeExcerpt = excerpts.find((excerpt) => excerpt.path === activePath) ?? excerpts[0];
  async function copyCode(code: string) { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <section className="code-section" aria-labelledby="code-heading"><p className="eyebrow">Реальный подход</p><h2 id="code-heading">Фрагменты кода</h2><Tabs value={activePath} onValueChange={setActivePath} className="code-panel"><TabsList className="code-tabs" aria-label="Фрагменты кода">{excerpts.map((excerpt) => <TabsTrigger key={excerpt.path} value={excerpt.path}>{excerpt.title}</TabsTrigger>)}<Button type="button" variant="ghost" size="sm" className="copy" onClick={() => copyCode(activeExcerpt.code)}>{copied ? <Check /> : <Copy />} {copied ? "Скопировано" : "Копировать"}</Button></TabsList>{excerpts.map((excerpt) => { const lines = excerpt.code.split("\n"); const isExpanded = expanded[excerpt.path]; const shownLines = isExpanded ? lines : lines.slice(0, 12); return <TabsContent key={excerpt.path} value={excerpt.path}><div className="code-info"><div><p>{excerpt.path}</p><span>{excerpt.purpose}</span></div><span>{excerpt.reason}</span></div><pre><code>{shownLines.map((line, index) => <span key={`${line}-${index}`}><i>{index + 1}</i>{line}{"\n"}</span>)}</code></pre>{lines.length > 12 && <Button type="button" variant="ghost" className="expand" onClick={() => setExpanded((current) => ({ ...current, [excerpt.path]: !isExpanded }))}>{isExpanded ? "Свернуть фрагмент" : "Показать весь фрагмент"}</Button>}</TabsContent>; })}</Tabs></section>;
}
