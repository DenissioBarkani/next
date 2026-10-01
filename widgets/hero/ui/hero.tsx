import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/entities/profile/model/profile";
import { Ambient } from "@/features/hero-ambient/ui/ambient";

export function Hero() {
  return <section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span className="small-square" />Vue · React · TypeScript</p><h1>Frontend<span className="blue">.</span><br />От макета<br />до продукта<span className="blue">.</span></h1><p className="hero-intro">{profile.intro}</p><div className="hero-actions"><Button asChild className="action primary"><a href="#projects">Смотреть работы</a></Button><Button asChild variant="outline" className="action secondary"><a href="/resume/denis-barkalov.doc" download><Download />Резюме</a></Button></div><div className="hero-footnote"><span>Ростов-на-Дону</span><span>/</span><span>Рассматриваю работу в команде</span></div></div><Ambient /></section>;
}
