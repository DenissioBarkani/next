"use client";

import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { Check, Code2, Copy, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CodeExample, CodeLanguage } from "@/content/projects";

const prismLanguages: Record<CodeLanguage, Language> = {
  tsx: "tsx",
  vue: "markup",
  html: "markup",
  css: "css",
};

export function CodeViewer({ files }: { readonly files: readonly CodeExample[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  if (!files.length) return null;

  async function copy(file: CodeExample) {
    try {
      await navigator.clipboard.writeText(file.code);
      setCopied(file.path);
      setMessage("Код скопирован");
    } catch {
      setMessage("Не удалось скопировать автоматически. Выделите код и скопируйте его вручную.");
    }
  }

  return <Tabs defaultValue={files[0].path} className="code-viewer" onValueChange={() => { setCopied(null); setMessage(""); setExpanded(false); }}><TabsList className="code-tabs-list" aria-label="Исходные файлы">{files.map((file) => <TabsTrigger value={file.path} key={file.path}><Code2 size={15}/>{file.path.split("/").pop()}</TabsTrigger>)}</TabsList>{files.map((file) => <TabsContent value={file.path} key={file.path} className="code-panel"><div className="code-description"><div><p className="code-path">{file.path}</p><p>{file.summary}</p></div><Button variant="outline" className="code-copy" onClick={() => copy(file)}>{copied === file.path ? <Check size={14}/> : <Copy size={14}/>} {copied === file.path ? "Скопировано" : "Копировать"}</Button></div>{message && <p role="status" className="copy-message">{message}</p>}<Highlight theme={themes.vsDark} code={file.code.trimEnd()} language={prismLanguages[file.language]}>{({ tokens, getLineProps, getTokenProps }) => <pre className={`code-window ${expanded ? "code-expanded" : ""}`} tabIndex={0} aria-label={`Код файла ${file.path}`}><code>{tokens.map((line, index) => <span {...getLineProps({ line })} key={index} className="code-line"><span className="line-number" aria-hidden="true">{(file.startLine ?? 1) + index}</span><span className="line-code">{line.map((token, tokenIndex) => <span {...getTokenProps({ token })} key={tokenIndex}/>)}</span></span>)}</code></pre>}</Highlight><div className="code-source"><a href={file.sourceUrl} target="_blank" rel="noreferrer"><GitFork size={14}/> Оригинал в GitHub</a><Button variant="ghost" className="code-copy" onClick={() => setExpanded((value) => !value)}>{expanded ? "Свернуть код" : "Развернуть код"}</Button></div></TabsContent>)}</Tabs>;
}
