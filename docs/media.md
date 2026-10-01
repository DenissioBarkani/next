# Медиа для проектов

Скрипт готовит изображения и видео для статичного сайта: сжимает их, удаляет метаданные, создаёт обложки для видео и записывает готовые пути с размерами в `media-manifest.json`.

## Один раз: установить FFmpeg для видео

На Windows установите [FFmpeg](https://ffmpeg.org/download.html) любым удобным способом и откройте новый терминал. Команды ниже должны показать версии:

```powershell
ffmpeg -version
ffprobe -version
```

Скрипт не скачивает и не устанавливает программы сам. Для изображений ничего устанавливать не нужно: он использует Sharp, который поставляется с Next.js.

## Добавить медиа

1. Создайте папку `media-source/projects/<slug>/`, где `<slug>` совпадает со `slug` проекта в `content/projects.ts`.
2. Положите туда исходные JPG, JPEG, PNG, WebP, MP4, MOV, M4V или WebM. Вложенные папки допустимы.
3. Выполните команду:

   ```powershell
   npm run media:prepare -- <slug>
   ```

   Чтобы обработать все проекты, выполните `npm run media:prepare`. Параметр `--force` пересоздаёт всё, даже если исходники не менялись.

4. Готовые файлы будут в `public/projects/<slug>/`. Исходники и `media-manifest.json` находятся в игнорируемой Git папке `media-source/`.
5. Откройте `media-source/projects/<slug>/media-manifest.json` и добавьте элементы в `media` нужного проекта в `content/projects.ts`. Для изображений заполните `alt` и `caption`, для видео — `caption`.

Пример записи:

```ts
media: [
  {
    type: "image",
    src: "/projects/tournament-platform/judge-screen.webp",
    alt: "Экран судейства турнира",
    caption: "Рабочее место судьи",
    width: 1600,
    height: 900,
  },
  {
    type: "video",
    src: "/projects/tournament-platform/judge-flow.mp4",
    poster: "/projects/tournament-platform/judge-flow-poster.webp",
    caption: "Короткая демонстрация сценария судейства",
  },
],
```

## Параметры обработки

| Материал | Результат | Ограничение |
| --- | --- | --- |
| Изображение | WebP, качество 82 | ширина до 2400 px |
| Видео | H.264 MP4, CRF 23, AAC, `faststart` | ширина до 1920 px, 30 fps |
| Обложка видео | WebP, качество 80 | кадр на 0,25 секунде, ширина до 1600 px |

Видео предназначены для коротких демонстраций интерфейса. Для длинных роликов и заметного трафика лучше вынести доставку видео в специализированный сервис.
