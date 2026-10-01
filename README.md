# Портфолио Дениса Баркалова

Статичное портфолио на Next.js App Router, TypeScript, Tailwind CSS и shadcn/ui.

## Команды

```bash
npm run dev
npm run lint
npm run test
npx tsc --noEmit --incremental false
npm run build
```

## Медиа для проектов

Исходники складывайте в `media-source/projects/<slug>/` и запускайте `npm run media:prepare -- <slug>`. Скрипт FFmpeg создаёт WebP для изображений, H.264 MP4 и обложку WebP для видео в `public/projects/<slug>/`.

Инструкция по установке FFmpeg, доступным форматам и добавлению готовых файлов в контент: [docs/media.md](docs/media.md).

`next build` использует стандартный runtime Next.js. Сайт рассчитан на публикацию как обычное Next-приложение; canonical URL задан в `content/site.ts`.

## Структура

- `app/` — маршруты Next.js, metadata, sitemap и общие CSS imports.
- `components/site/` — общая оболочка сайта.
- `components/sections/` — серверные секции страниц.
- `components/project/` — карточка, обложка и detail-page проекта.
- `components/client/` — локальная интерактивность: canvas, анимация, галерея и просмотр кода.
- `components/ui/` — shadcn primitives.
- `content/` — типизированный контент и ссылки без JSX.
- `lib/` — чистые helpers.

## Добавление проекта

1. Подготовьте изображения и видео командой `npm run media:prepare -- <slug>`.
2. Добавьте одну запись в `content/projects.ts` с уникальным `slug`, `cover`, описанием, ссылками и медиа.

Каталог автоматически создаёт карточку, страницу `/projects/<slug>`, static params, sitemap и следующий проект. Добавьте поле `timeline`, если проект должен появиться в блоке опыта на главной.

Для изображений укажите `src`, `alt`, `caption`, `width` и `height`; это сохраняет корректное соотношение сторон и предотвращает layout shift.
