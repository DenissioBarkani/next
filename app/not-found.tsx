import Link from "next/link";
export default function NotFound(){return <main id="main" className="shell case-main more-page"><p className="eyebrow">404</p><h1>Страница не найдена<span className="blue">.</span></h1><p className="intro">Перейдите к списку работ, чтобы выбрать проект.</p><Link href="/#projects" className="text-link">Посмотреть работы</Link></main>}
