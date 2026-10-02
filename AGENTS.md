<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Описание проекта

Портфолио Дениса Баркалова на Next.js App Router, TypeScript, Tailwind CSS и shadcn/ui. Сайт статичный: проекты и страницы формируются из типизированного контента, а интерактивность ограничена локальными клиентскими компонентами.

### Структура

- `app/` — маршруты, metadata, sitemap, robots и подключение глобальных стилей.
- `components/site/` — общая оболочка: шапка, footer и контакты.
- `components/sections/` — серверные секции страниц.
- `components/project/` — карточка, обложка и detail-page проекта.
- `components/client/` — browser API, canvas, анимация, галерея и просмотр кода.
- `components/ui/` — локальные shadcn primitives.
- `content/` — единственный источник текстов, контактов, ссылок, дат, проектов и медиа.
- `lib/` — чистые helpers без JSX.

## Правила для агентов

1. Перед изменением Next.js API или файловой конвенции прочитай подходящий документ из `node_modules/next/dist/docs/`.
2. Придерживайся **KISS и YAGNI**: выбирай простое решение под текущую задачу; не добавляй функции, слои, обёртки и зависимости «на будущее».
3. Придерживайся **DRY**: проекты, контакты, даты, URL и контент меняются в `content/`, отдельно от JSX. Не дублируй их в компонентах.
4. У компонента одна задача. Выделяй повторяемые блоки и самостоятельное поведение: карточку проекта, галерею, просмотрщик кода. Не дроби статичную разметку на одноразовые обёртки.
5. Используй минимальную FSD-структуру: маршруты в `app/`, повторно используемые компоненты в `components/`, общие элементы в `components/site` или `components/ui`. Новые слои и папки создавай только при реальной самостоятельной ответственности.
6. TypeScript работает в `strict` режиме. Описывай props и данные явно, используй readonly-контент и чистые функции. `any` допустим только с документированным техническим обоснованием.
7. Серверные компоненты используй по умолчанию. `"use client"` добавляй только для browser API, локального состояния, анимации или пользовательского действия.
8. Сохраняй shadcn-подход: primitives находятся в `components/ui`; проверь импорты перед изменением или удалением компонента.
9. Каталог проектов immutable. Для поиска проекта, static params, следующего проекта и sitemap используй `lib/projects.ts`, не изменяй данные при импорте.
10. Не форматируй код вручную: Prettier — единственный источник правил раскладки. Для всего проекта используй `npm run format`, для проверки без изменений — `npm run format:check`.
11. До передачи работы выполни `npm run format:check`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run test` и `npm run build`. После UI-изменений проверь `/`, `/more`, страницы проектов, ссылки, anchors, интерактивность и мобильный вид.
