"use client";
import { useState } from "react";
import { Highlight,themes,type Language } from "prism-react-renderer";
import { Copy,Check,GitFork,Code2 } from "lucide-react";
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { CodeExample } from "@/entities/project/model/projects";

export function CodeViewer({files}:{files:(CodeExample&{startLine?:number})[]}){
 const [copied,setCopied]=useState<string|null>(null);const [message,setMessage]=useState("");const [expanded,setExpanded]=useState(false);
 if(!files.length)return null;
 async function copy(file:CodeExample){try{await navigator.clipboard.writeText(file.code);setCopied(file.path);setMessage("Код скопирован")}catch{setMessage("Не удалось скопировать автоматически. Выделите код и скопируйте его вручную.")}}
 return <Tabs defaultValue={files[0].path} className="code-viewer" onValueChange={()=>{setCopied(null);setMessage("");setExpanded(false)}}>
  <TabsList className="code-tabs-list" aria-label="Исходные файлы">{files.map(f=><TabsTrigger value={f.path} key={f.path}><Code2 size={15}/>{f.path.split("/").pop()}</TabsTrigger>)}</TabsList>
  {files.map(file=>{const lang=(file.language==="html"?"markup":file.language==="vue"?(file.code.includes("<template>")||file.code.includes("<script")?"markup":"javascript"):file.language==="ts"?"typescript":file.language) as Language;return <TabsContent value={file.path} key={file.path} className="code-panel">
   <div className="code-description"><div><p className="code-path">{file.path}</p><p>{file.summary}</p></div><Button variant="outline" className="code-copy" onClick={()=>copy(file)}>{copied===file.path?<Check size={14}/>:<Copy size={14}/>} {copied===file.path?"Скопировано":"Копировать"}</Button></div>
   {message&&<p role="status" className="copy-message">{message}</p>}
   <Highlight theme={themes.vsDark} code={file.code.trimEnd()} language={lang}>{({tokens,getLineProps,getTokenProps})=><pre className={`code-window ${expanded?"code-expanded":""}`} tabIndex={0} aria-label={`Код файла ${file.path}`}><code>{tokens.map((line,i)=><span {...getLineProps({line})} key={i} className="code-line"><span className="line-number" aria-hidden="true">{(file.startLine??1)+i}</span><span className="line-code">{line.map((token,j)=><span {...getTokenProps({token})} key={j}/>)}</span></span>)}</code></pre>}</Highlight>
   <div className="code-source"><a href={file.sourceUrl} target="_blank" rel="noreferrer"><GitFork size={14}/> Оригинал в GitHub</a><Button variant="ghost" className="code-copy" onClick={()=>setExpanded(x=>!x)}>{expanded?"Свернуть код":"Развернуть код"}</Button></div>
  </TabsContent>})}
 </Tabs>
}
