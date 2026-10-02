export const homePage = {
  hero: {
    eyebrow: "Около года коммерческой разработки",
    title: "Frontend-",
    titleLine: "разработчик",
    intro:
      "Мне важно понимать смысл решений в интерфейсе и видеть их пользу для людей. Люблю изучать новые подходы и проверять их на практике. Ценю работу в команде и обратную связь — они помогают развиваться и улучшать результат",
    workLink: "#projects",
    workLabel: "Смотреть работы",
    status: "Открыт к предложениям · Ростов-на-Дону",
  },
  technology: {
    primary: ["Vue 3", "Nuxt", "TypeScript", "Tailwind CSS", "REST API"],
    secondary: ["React", "Next.js"],
  },
  experience: {
    eyebrow: "02 / Опыт",
    title: "Мой путь в разработке",
    note: "Вёрсткой занимаюсь с 2020 года.\nКоммерческий опыт — 2025–2026.",
    componentCount: "20+",
    componentCountDescription: "UI-компонентов в библиотеке\nтурнирной платформы",
    capabilities: [
      { icon: "layers", label: "Компонентный подход" },
      { icon: "braces", label: "Интерфейсы и REST API" },
      { icon: "globe", label: "Адаптивная вёрстка" },
    ],
  },
  education: {
    eyebrow: "03 / Образование",
    title: "Учился через",
    highlightedTitle: "проектную работу",
    summary: "ДГТУ · Школа Икс\nИнформационные системы и технологии\nСистемная аналитика · Выпуск 2026",
    link: "https://donstux.com/education",
    linkLabel: "Об образовательной модели",
    lead: "Общался с заказчиками, уточнял требования и работал в команде — ещё во время обучения",
    description:
      "В Школе Икс проекты встроены в учебный процесс. Индивидуальная траектория сочетает базовые дисциплины, профессиональные треки и модули по выбору",
    cells: [
      { number: "01", title: "Задача и требования", text: "Изучение предметной области, пользовательские сценарии и технические задания" },
      { number: "02", title: "Командная разработка", text: "Распределение задач и взаимодействие с разработчиками и дизайнером" },
      { number: "03", title: "Работающий результат", text: "Реализация интерфейсов и участие в тестировании MVP турнирной платформы" },
    ],
  },
  directions: {
    eyebrow: "04 / Дополнительные направления",
    title: "За пределами frontend",
    items: [
      { href: "/more#analysis", icon: "braces", title: "Системный анализ", text: "Требования, бизнес-процессы, UML и BPMN. Кейсы из проектной работы" },
      { href: "/more#video", icon: "audio", title: "Видео и контент", text: "Видеомонтаж, графика и опыт создания контента для YouTube" },
    ],
  },
  contacts: {
    eyebrow: "05 / Контакты",
    title: "Давайте\nпознакомимся",
    text: "Ищу работу во frontend-разработке\nИнтересно обсудить проекты и задачи команды",
  },
} as const;

export type MorePageSection = {
  readonly id?: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly cases?: readonly { readonly title: string; readonly text: string; readonly href?: string; readonly linkLabel?: string }[];
  readonly tags?: readonly string[];
};

export type MorePageData = {
  readonly metadata: { readonly title: string; readonly description: string };
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly MorePageSection[];
  readonly backLink: { readonly href: string; readonly label: string };
};

export const morePage = {
  metadata: {
    title: "Другие направления",
    description: "Системный анализ, проектная работа, видеомонтаж и создание контента.",
  },
  eyebrow: "Дополнительный опыт",
  title: "Больше, чем\nинтерфейсы",
  intro:
    "Проектная работа научила меня разбираться в задачах пользователей. А создание контента — объяснять идеи и доводить материал до готового результата.",
  sections: [
    {
      id: "analysis",
      title: "Системный анализ",
      paragraphs: ["В Школе Икс работал с предметной областью, требованиями, пользовательскими сценариями и моделированием процессов. Использовал UML и BPMN, изучал взаимодействие систем, REST API и базы данных."],
      cases: [
        { title: "Турнирная платформа", text: "Исследовал процесс организации турниров, анализировал аналоги и проводил интервью с заказчиком. Участвовал в формировании функциональных и нефункциональных требований, ролей и пользовательских сценариев. Подготовил ТЗ на клиентскую часть и участвовал в проектировании интерфейсов.", href: "/projects/tournament-platform", linkLabel: "Подробнее о турнирной платформе" },
        { title: "Настольная игра для детей с РАС", text: "В учебном командном проекте исследовали потребности детей с расстройствами аутистического спектра и общались с профильной организацией. На основе исследования подготовили настольную игру, учитывая особенности восприятия и задачи обучения." },
      ],
      tags: ["Требования", "User Stories", "UML", "BPMN", "REST API", "SQL"],
    },
    {
      id: "video",
      title: "Видео и создание контента",
      paragraphs: ["Есть опыт создания контента для YouTube: от идеи и подготовки материала до монтажа и публикации. Работал с Vegas Pro, After Effects и Photoshop.", "Этот опыт помогает структурировать информацию, объяснять решения и готовить демонстрации проектов."],
      tags: ["Видеомонтаж", "Vegas Pro", "After Effects", "Photoshop", "YouTube"],
    },
    {
      title: "Командная работа",
      paragraphs: ["В учебном проекте «Умный дом» руководил командой из восьми человек, распределял задачи и работал с Miro. Проект включал ESP32, MQTT, данные датчиков и управление через веб-интерфейс.", "Знаком со Scrum и участвовал в проектах с распределением задач. Основное направление, в котором ищу работу, — frontend-разработка."],
    },
  ],
  backLink: { href: "/#projects", label: "Вернуться к frontend-проектам" },
} as const satisfies MorePageData;

