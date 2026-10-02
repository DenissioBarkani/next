import { ArrowLink } from "@/components/site/arrow-link";
export default function NotFound() {
  return (
    <main id="main" className="shell case-main more-page">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p className="intro">Перейдите к списку работ, чтобы выбрать проект</p>
      <ArrowLink href="/#projects" className="text-link">
        Посмотреть работы
      </ArrowLink>
    </main>
  );
}
