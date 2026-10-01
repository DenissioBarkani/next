export type ProjectStatus = "published" | "draft";

export type CodeExcerpt = {
  title: string;
  path: string;
  purpose: string;
  reason: string;
  code: string;
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  title: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  contribution: string[];
  result: string;
  stack: { name: string; note: string }[];
  liveUrl?: string;
  repoUrl?: string;
  code?: CodeExcerpt[];
  draftNote?: string;
};

export const projects: Project[] = [
  {
    slug: "b2b-tournament-platform",
    status: "published",
    title: "B2B-платформа турниров",
    category: "ВКР · командная разработка",
    year: "2024",
    summary: "Интерфейсы для проведения и сопровождения турниров: публичная часть и рабочее место судьи.",
    challenge: "Заказчику требовалась единая платформа, где участники быстро находят нужный турнир, а организаторы и судьи уверенно работают с событиями и результатами на любом устройстве.",
    contribution: ["Разрабатывал интерфейсы на Vue 3 и Nuxt", "Собрал более 20 переиспользуемых UI-компонентов", "Адаптировал судейские и публичные сценарии под мобильные экраны", "Интегрировал REST API и асинхронные состояния загрузки"],
    result: "Работа стала основной частью выпускной квалификационной работы и была выполнена в команде для реального заказчика. Мой вклад — frontend-интерфейсы и интеграционный слой в пределах обозначенных задач.",
    stack: [
      { name: "Vue 3", note: "компонентная архитектура и композиция логики" },
      { name: "Nuxt", note: "маршрутизация и структура приложения" },
      { name: "TypeScript", note: "предсказуемые контракты данных" },
      { name: "REST API", note: "получение данных и состояния интерфейса" },
    ],
    code: [{
      title: "Состояние загрузки",
      path: "components/TournamentList.vue",
      purpose: "Показывает явный переход между загрузкой, ошибкой и данными.",
      reason: "Сценарий отделён от представления, чтобы пользователь всегда понимал состояние экрана.",
      code: `<script setup lang="ts">\nconst { data: tournaments, status, error } = await useFetch('/api/tournaments')\n</script>\n\n<template>\n  <section aria-live="polite">\n    <p v-if="status === 'pending'">Загружаем турниры…</p>\n    <p v-else-if="error">Не удалось получить данные.</p>\n    <TournamentCard\n      v-else\n      v-for="tournament in tournaments"\n      :key="tournament.id"\n      :tournament="tournament"\n    />\n  </section>\n</template>`,
    }],
  },
  { slug: "center-invest-practice", status: "draft", title: "Практика «Центр-инвест»", category: "Практика", year: "2024", summary: "Черновой кейс: ждёт подтверждения прав, формулировок и личного вклада.", challenge: "", contribution: [], result: "", stack: [], draftNote: "Не опубликован: требуется разрешение на материалы и сверка с резюме." },
  { slug: "student-digital-profile", status: "draft", title: "Цифровой профиль студента", category: "Учебный проект", year: "2024", summary: "Черновой кейс: ждёт подтверждения связи с репозиторием и роли.", challenge: "", contribution: [], result: "", stack: [], draftNote: "Не опубликован: поиск и загрузка в известном компоненте пока имитируются, поэтому AI/API-интеграция не заявляется." },
  { slug: "ai-artdir", status: "draft", title: "AI-Artdir", category: "Эксперимент", year: "2024", summary: "Короткий кандидат с доступным демо; требуется уточнить назначение и авторство.", challenge: "", contribution: [], result: "", stack: [], liveUrl: "https://denissiobarkani.github.io/Ai-artdir/", draftNote: "Не опубликован: нужны подтверждённые формулировки и самостоятельные доработки." },
];

export const publishedProjects = projects.filter((project) => project.status === "published");
export const findPublishedProject = (slug: string) => publishedProjects.find((project) => project.slug === slug);
