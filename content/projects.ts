export type CodeLanguage = "tsx" | "vue" | "html" | "css";

export type CodeExample = {
  readonly path: string;
  readonly language: CodeLanguage;
  readonly code: string;
  readonly sourceUrl: string;
  readonly summary: string;
  readonly startLine?: number;
  readonly endLine?: number;
};

export type ProjectMedia =
  | {
      readonly type: "image";
      readonly src: string;
      readonly alt: string;
      readonly caption: string;
      readonly width: number;
      readonly height: number;
    }
  | {
      readonly type: "video";
      readonly src: string;
      readonly caption: string;
      readonly poster?: string;
    };

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly kind: {
    readonly label: string;
    readonly detail?: string;
  };
  readonly year: string;
  readonly summary: string;
  readonly description: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly tasks: readonly string[];
  readonly decisions: readonly { title: string; text: string }[];
  readonly result: string;
  readonly repo?: string;
  readonly demo?: string;
  readonly repoNote?: string;
  readonly cover: {
    readonly tone: "tournament" | "student" | "bank" | "artdir" | "sneakers";
    readonly label: string;
    readonly headline: string;
    readonly technology: string;
    readonly icon: "layers" | "component" | "braces" | "pen-tool" | "code";
    readonly symbol: string;
    readonly image?: {
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
    };
  };
  readonly media: readonly ProjectMedia[];
  readonly examples: readonly CodeExample[];
  readonly codeSection?: { readonly title: string; readonly intro: string; readonly eyebrow?: string };
  readonly timeline?: { readonly suffix?: string; readonly text: string };
};

const sourceExamples = {
  "DenissioBarkani/student-dep": {
    files: [
      { path: "app/page.tsx", language: "tsx", code: "  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        setLoading(true);\n        const data = await fetchCompany(currentPage, perPage);\n        setCompanies(data.companyData);\n        setPaginationData({\n          pages: data.pages,\n          totalItems: data.items,\n        });\n        setSearch(false);\n      } catch (error) {\n        console.error(\"Error loading products:\", error);\n        setCompanies([]);\n        setSearch(false);\n      } finally {\n        setLoading(false);\n      }\n    };\n    if (!search) {\n      fetchData();\n    }\n  }, [currentPage, search, setCompanies, setSearch]);", sourceUrl: "https://github.com/DenissioBarkani/student-dep/blob/d48b17c3a72f4d897c119a798bc4ff9351d28035/app/page.tsx#L71-L93", summary: "Загрузка данных для текущей страницы: loading, обновление пагинации и обработка ошибок.", startLine: 71, endLine: 93 },
      { path: "components/shared/company-card.tsx", language: "tsx", code: "import Link from \"next/link\";\nimport React from \"react\";\nimport { Title } from \"./title\";\nimport { Button } from \"../ui\";\nimport { ArrowRight } from \"lucide-react\";\nimport Image from \"next/image\"; // Импортируем компонент Image\nimport { cn } from \"@/lib/utils\";\nimport { Tag } from \"./tag\";\n\n\ninterface CompanyTag {\n  id: number;\n  text: string;\n}\n\nexport interface CompanyProps {\n  id: number;\n  name: string;\n  imageUrl: string;\n  description: string;\n  tags: CompanyTag[];\n  deadline: string;\n  places: number;\n  className?: string;\n}\n\nexport const CompanyCard: React.FC<CompanyProps> = ({\n  id,\n  name,\n  imageUrl,\n  description,\n  tags,\n  deadline,\n  places,\n  className,\n}) => {\n\n  return (\n    <Link\n      href={`/company/${id}`}\n      className={cn(\n        \"h-full flex flex-col rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg\",\n        className\n      )}>\n      <div className=\"relative h-56\">\n        <Image\n          src={imageUrl}\n          width={1140}\n          height={900}\n          alt={name}\n          className=\"h-full object-cover object-top md:object-top\"\n          loading={id > 5 ? \"eager\" : \"lazy\"}\n          priority={id <= 5 ? false : true}\n        />\n      </div>\n\n      <div className=\"p-3 flex flex-col flex-grow\">\n        <div className=\"flex flex-wrap gap-2 mb-3\">\n          {tags.map((tag) => (\n            <Tag\n              className=\"px-2 py-1 bg-muted rounded-[4px] text-[10px] text-muted-foreground\"\n              key={tag.id}\n              variant=\"default\"\n              size=\"sm\">\n              {tag.text}\n            </Tag>\n          ))}\n        </div>\n\n        <Title\n          text={name}\n          size=\"sm\"\n          className=\"text-lg font-medium mb-2.5 leading-5\"\n        />\n\n        <div className=\"flex-grow\">\n          <p className=\"text-sm text-muted-foreground line-clamp-4\">\n            {description}\n          </p>\n        </div>\n\n        <div className=\"mt-2.5\">\n          <time\n            dateTime=\"2023-12-31\"\n            className=\"inline-block px-2 py-1 text-[10px] text-time-secondary bg-time-primary rounded-lg\">\n            Приём заявок до: {deadline}\n          </time>\n\n          <div className=\"flex justify-between items-center\">\n            <div className=\"text-base\">\n              <span className=\"text-primary font-semibold\">{places}</span> мест\n            </div>\n\n            <Button\n              variant=\"link\"\n              size={\"link\"}\n              textSize={\"lg\"}\n              className=\"gap-1 text-lg\">\n              Подробнее\n              <ArrowRight size={18} />\n            </Button>\n          </div>\n        </div>\n      </div>\n    </Link>\n  );\n};", sourceUrl: "https://github.com/DenissioBarkani/student-dep/blob/d48b17c3a72f4d897c119a798bc4ff9351d28035/components/shared/company-card.tsx#L1-L107", summary: "Типизированная карточка предложения компании: изображение, теги, описание и переход на подробную страницу.", startLine: 1, endLine: 107 },
      { path: "components/shared/checkbox-filters-group.tsx", language: "tsx", code: "import { cn } from \"@/lib/utils\";\nimport React from \"react\";\nimport { Title } from \"./title\";\n\nimport { FilterCheckboxProps, FilterCheckbox } from \"./filter-checkbox\";\n\ntype Item = FilterCheckboxProps;\n\ninterface Props {\n  items: Item[];\n  title: string;\n  className?: string;\n  limit?: number;\n}\n\nexport const CheckboxFiltersGroup: React.FC<Props> = ({\n  title,\n  items = [],\n  limit = 5,\n  className,\n}) => {\n  const [showAll, setShowAll] = React.useState(false);\n\n  const list = showAll ? items : items.slice(0, limit);\n  return (\n    <div className={cn(\"\", className)}>\n      <Title size=\"sm\" className=\"mb-5 font-bold\" text={title} />\n\n      <div className=\"space-y-2 max-h-50 overflow-auto scrollbar\">\n        {list.map((item, index) => (\n          <FilterCheckbox key={index} text={item.text} value={item.value} />\n        ))}\n      </div>\n      {items.length > limit && items.length != 0 && (\n        <button\n          onClick={() => setShowAll(!showAll)}\n          className=\"text-primary mt-2 inline-block\">\n          {showAll ? \"Скрыть\" : \"+ Показать все\"}\n        </button>\n      )}\n    </div>\n  );\n};", sourceUrl: "https://github.com/DenissioBarkani/student-dep/blob/d48b17c3a72f4d897c119a798bc4ff9351d28035/components/shared/checkbox-filters-group.tsx#L1-L43", summary: "Группа фильтров с ограниченным числом видимых вариантов и раскрытием списка.", startLine: 1, endLine: 43 },
    ],
  },
  "DenissioBarkani/vue-sneakers": {
    demoUrl: "https://denissiobarkani.github.io/vue-sneakers/",
    files: [
      { path: "src/App.vue", language: "vue", code: "const addToCart = (item) => {\n  // не добавляем дубликаты\n  if (!cart.value.some((ci) => ci.id === item.id)) {\n    cart.value.push(item)\n  }\n  item.isAdded = true\n}\nconst removeFromCart = (item) => {\n  const idx = cart.value.findIndex((ci) => ci.id === item.id)\n  if (idx !== -1) {\n    cart.value.splice(idx, 1)\n  }\n  item.isAdded = false\n}\n\nconst drawerOpen = ref(false)\nconst closeDrawer = () => {\n  drawerOpen.value = false\n}\nconst openDrawer = () => {\n  drawerOpen.value = true\n}\nprovide('cart', {\n  cart,\n  closeDrawer,\n  openDrawer,\n  addToCart,\n  removeFromCart,\n})", sourceUrl: "https://github.com/DenissioBarkani/vue-sneakers/blob/c1b7ae17f9c1365c41d625717c9f69af8c4b6b04/src/App.vue#L46-L74", summary: "Добавление без дубликатов, удаление из корзины и общий интерфейс действий через provide.", startLine: 46, endLine: 74 },
      { path: "src/components/CardList.vue", language: "vue", code: "<script setup>\nimport { inject } from 'vue'\nimport Card from './Card.vue'\n\ndefineProps({\n  items: Array,\n  isFavorites: Boolean,\n})\n\nconst emit = defineEmits(['addToFavorite', 'addToCart'])\n\n</script>\n\n<template>\n  <div v-auto-animate class=\"grid grid-cols-4 gap-5\">\n    <Card\n      v-for=\"item in items\"\n      :id=\"item.id\"\n      :key=\"item.id\"\n      :title=\"item.title\"\n      :image-url=\"item.imageUrl\"\n      :price=\"item.price\"\n      :is-added=\"item.isAdded\"\n      :is-favorite=\"item.isFavorite\"\n      :on-click-favorite=\"() => emit('addToFavorite', item)\"\n      :on-click-add=\"isFavorites ? null :() => emit('addToCart', item)\"\n    />\n  </div>\n</template>", sourceUrl: "https://github.com/DenissioBarkani/vue-sneakers/blob/c1b7ae17f9c1365c41d625717c9f69af8c4b6b04/src/components/CardList.vue#L1-L29", summary: "Список карточек с передачей состояния и событиями избранного/корзины.", startLine: 1, endLine: 29 },
      { path: "src/pages/Home.vue", language: "vue", code: "<!-- eslint-disable vue/multi-word-component-names -->\n<script setup>\nimport { inject, onMounted, reactive, ref, watch } from 'vue'\nimport CardList from '../components/CardList.vue'\nimport debounce from 'lodash.debounce'\nimport axios from 'axios'\nconst {cart, addToCart, removeFromCart } = inject('cart')\nconst items = ref([])\nconst filters = reactive({\n  sortBy: 'title',\n  searchQuery: '',\n})\nconst onChangeSelect = (event) => {\n  filters.sortBy = event.target.value\n}\n\nconst onChangeInput = debounce((event) => {\n  filters.searchQuery = event.target.value\n}, 300)", sourceUrl: "https://github.com/DenissioBarkani/vue-sneakers/blob/c1b7ae17f9c1365c41d625717c9f69af8c4b6b04/src/pages/Home.vue#L1-L19", summary: "Реактивные параметры сортировки и поиска с debounce 300 мс.", startLine: 1, endLine: 19 },
    ],
  },
  "DenissioBarkani/Ai-artdir": {
    demoUrl: "https://denissiobarkani.github.io/Ai-artdir/",
    files: [
      { path: "index.html", language: "html", code: "                <div class=\"header__body\">\n                    <div class=\"header__inner\">\n            \n                        <div class=\"header__left\">\n                            <div class=\"header__logo\" data-scroll=\"#page\">\n                                <img src=\"assets/images/logo.svg\" alt=\"Лого ЭйАй\">\n                            </div>\n                        </div>\n            \n            \n                        <div class=\"header__right\">\n            \n                            <nav class=\"nav__list\">\n                                <a class=\"nav__link\" data-scroll=\"#how\">Как это работает</a>\n                                <a class=\"nav__link\" data-scroll=\"#think\">Преимущества</a>\n                                <a class=\"nav__link\" data-scroll=\"#pricing\">Прайсинг</a>\n                                <a class=\"nav__link\" data-scroll=\"#techno\">Технологии</a>\n                                <a class=\"nav__link\" data-scroll=\"#reviews\">Отзывы</a>\n                            </nav>\n            \n                            <div class=\"header__button\">\n                                <button class=\"btn__gradient\" href=\"#\" data-modal=\"donat-modal\">Платить сюда</button>\n                            </div>\n            \n                            <div class=\"header__arrow fixed\">\n                                <img src=\"assets/images/arro.svg\" alt=\"\">\n                            </div>\n            \n                        </div>\n            \n                    </div>", sourceUrl: "https://github.com/DenissioBarkani/Ai-artdir/blob/0a4d372f94a8cf3acfc53bd6f05d822e6d48a768/index.html#L49-L79", summary: "Разметка шапки и навигации: имена классов по БЭМ и data-атрибуты для переходов и модального окна.", startLine: 49, endLine: 79 },
      { path: "assets/css/style.css", language: "css", code: ".table {\n    display: none;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}\n\n.table.active {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n@media (max-width: 1079px) {\n    .table.active {\n        display: none;\n    }\n}\n\n.table--mobile {\n    display: none;\n}\n\n@media (max-width: 1079px) {\n    .table--mobile.active {\n        display: grid;\n    }\n}\n\n.table__item {\n    width: 252px;\n    text-align: center;\n}\n\n@media (max-width: 1079px) {\n    .table__item {\n        width: 100%;\n        margin-bottom: 16px;\n    }\n}", sourceUrl: "https://github.com/DenissioBarkani/Ai-artdir/blob/0a4d372f94a8cf3acfc53bd6f05d822e6d48a768/assets/css/style.css#L1068-L1105", summary: "CSS для разных вариантов таблицы тарифов: desktop flex и mobile grid через медиазапрос.", startLine: 1068, endLine: 1105 },
    ],
  },
} as const satisfies Record<string, { readonly files: readonly CodeExample[]; readonly demoUrl?: string }>;

export const projects = [
  {
    slug: "tournament-platform", title: "B2B-платформа турниров", shortTitle: "Турниры", kind: { label: "Коммерческий опыт" }, year: "2025 — 2026", summary: "Интерфейсы для организации турниров по единоборствам и работы судей.", description: "Разрабатывал клиентскую часть платформы для автоматизации турниров по единоборствам в команде заказчика. Проект одновременно был оплачиваемой работой и моей выпускной квалификационной работой.", role: "Frontend-разработчик · участие в системном анализе", stack: ["Vue 3", "Nuxt", "TypeScript", "Tailwind CSS", "Vue Query", "Pinia", "REST API"], tasks: ["Разработал адаптивные интерфейсы панели судейства и публичной страницы турнира.", "Создал и поддерживал библиотеку из 20+ переиспользуемых UI-компонентов.", "Интегрировал клиентскую часть с REST API и настроил запросы через Vue Query.", "Исследовал предметную область, участвовал в интервью с заказчиком и подготовке требований.", "Предложил переход на Nuxt; после обсуждения команда выбрала его для клиентской части."], decisions: [{ title: "Переиспользуемые компоненты", text: "Общие элементы вынесены в библиотеку, чтобы поддерживать единый стиль и собирать новые интерфейсы из готовых компонентов." }, { title: "Асинхронные данные", text: "Для REST API использовал Vue Query. Клиентское состояние организовано с помощью Pinia." }, { title: "От требований к интерфейсу", text: "Аналитическая работа помогала связывать сценарии организаторов и судей с конкретными страницами и действиями." }], result: "Реализована клиентская часть MVP. По материалам выпускного проекта платформа прошла тестирование на реальном мероприятии.", cover: { tone: "tournament", label: "TOURNAMENT SYSTEM", headline: "Организация.\nСудейство.\nРезультаты.", technology: "Vue / Nuxt", icon: "layers", symbol: "[ ]" }, media: [], examples: [], timeline: { suffix: "ВКР", text: "Панель судейства, публичные страницы, UI-компоненты и интеграция с backend. Работа в команде заказчика." },
  },
  {
    slug: "student-profile", title: "Цифровой профиль студента", shortTitle: "Цифровой профиль", kind: { label: "Проект ДГТУ" }, year: "2025", summary: "Платформа для студентов и компаний на Next.js и React.", description: "Командный проект ДГТУ: клиентская часть платформы для студентов и компаний. Работал над интерфейсами совместно с backend-разработчиком.", role: "Frontend-разработчик · UI/UX", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"], tasks: ["Разработал клиентскую часть с нуля.", "Создал адаптивные страницы и переиспользуемые компоненты.", "Работал над UI/UX-дизайном интерфейсов.", "Подключил тестовый REST API для пользователей и компаний."], decisions: [{ title: "Компонентная структура", text: "Повторяющиеся элементы выделены в компоненты. Страницы и маршруты организованы средствами Next.js." }, { title: "Совместная работа с backend", text: "Согласовывал клиентские сценарии с backend-разработчиком и подключал API к интерфейсам." }], result: "Реализованы клиентские страницы MVP и взаимодействие с тестовым API.", repoNote: "Публичные примеры Next.js взяты из student-dep. Описание командного проекта — по материалам резюме.", cover: { tone: "student", label: "STUDENT PROFILE", headline: "Студенты\nи компании.", technology: "React / Next.js", icon: "component", symbol: "{ }" }, media: [], examples: sourceExamples["DenissioBarkani/student-dep"].files, codeSection: { eyebrow: "Реальные исходники", title: "Next.js: публичные примеры", intro: "Фрагменты из моего публичного репозитория student-dep: работа с данными, компоненты и фильтры." }, timeline: { text: "Клиентская часть на Next.js и React. Совместная работа с backend-разработчиком." },
  },
  {
    slug: "center-invest", title: "Боты под управлением", shortTitle: "Центр-инвест", kind: { label: "Практика", detail: "Центр-инвест" }, year: "Лето 2025", summary: "Внутреннее SPA для управления Telegram-чат-ботами.", description: "Во время практики в банке «Центр-инвест» работал над интерфейсом управления Telegram-ботами. Задачи были связаны с формами, API, таблицами и состояниями приложения.", role: "Frontend-разработчик · практика", stack: ["React", "TypeScript", "MUI", "Zustand", "React Hook Form", "Zod", "REST API"], tasks: ["Работал с типизированными формами и валидацией.", "Организовал API-слой с Axios Interceptors.", "Реализовывал защищённые маршруты и Basic-аутентификацию.", "Работал с виртуализированной таблицей, загрузкой и обработкой ошибок.", "Добавлял подтверждение удаления и другие состояния интерфейса."], decisions: [{ title: "Формы и валидация", text: "Использовал React Hook Form и Zod для обработки ввода и проверки данных." }, { title: "Состояния приложения", text: "Предусматривал загрузку, ошибки и подтверждение удаления, чтобы результат действий пользователя был понятен." }], result: "Получил практический опыт разработки внутреннего React-приложения и интеграции с API.", repo: "https://github.com/DenissioBarkani/Center-invest-hr-telegram", repoNote: "Публичный fork Center-invest-IT/hr-telegram-bot-admin. Описание личного вклада — по материалам практики.", cover: { tone: "bank", label: "CENTER-INVEST", headline: "Управление\nTelegram-ботами.", technology: "React / TypeScript", icon: "braces", symbol: "/ /" }, media: [], examples: [], timeline: { text: "SPA для управления Telegram-ботами: формы, таблицы, API и состояния интерфейса." },
  },
  {
    slug: "ai-artdir", title: "AI-Artdir", shortTitle: "AI-Artdir", kind: { label: "Личный проект", detail: "вёрстка" }, year: "2023", summary: "Адаптивный лендинг по Figma с формой и слайдером.", description: "Лендинг AI-Artdir: работа с макетом Figma, адаптивной вёрсткой и интерактивными элементами на JavaScript.", role: "Вёрстка и JavaScript", stack: ["HTML", "Sass", "JavaScript", "jQuery", "Gulp"], tasks: ["Сверстал адаптивный лендинг по макету Figma.", "Реализовал клиентские состояния формы и валидацию.", "Добавил слайдер тарифов.", "Работал со сборкой на Gulp."], decisions: [{ title: "От макета к странице", text: "Реализовывал структуру и адаптивные состояния интерфейса по Figma." }, { title: "Интерактивные элементы", text: "JavaScript управляет навигацией, формой и слайдером. В публичном демо успешная отправка формы имитируется; серверная отправка не подключена." }], result: "Реализован лендинг с адаптивной вёрсткой и клиентскими взаимодействиями.", repo: "https://github.com/DenissioBarkani/Ai-artdir", demo: sourceExamples["DenissioBarkani/Ai-artdir"].demoUrl, cover: { tone: "artdir", label: "AI-ARTDIR", headline: "Дизайн.\nВёрстка.\nДетали.", technology: "HTML / Sass / JS", icon: "pen-tool", symbol: "/ /" }, media: [], examples: sourceExamples["DenissioBarkani/Ai-artdir"].files, codeSection: { eyebrow: "Реальные исходники", title: "Немного кода", intro: "Выбранные фрагменты из публичного репозитория. У каждого файла есть пояснение и ссылка на точную версию исходника." },
  },
  {
    slug: "vue-sneakers", title: "Vue Sneakers", shortTitle: "Vue Sneakers", kind: { label: "Учебный проект", detail: "по гайду" }, year: "Vue 3", summary: "Каталог кроссовок: компоненты Vue, поиск и корзина.", description: "Учебный проект, выполненный по гайду. Показывает практику работы с Vue: карточки товаров, корзина, поиск и взаимодействие с API.", role: "Учебная практика Vue", stack: ["Vue 3", "JavaScript", "Tailwind CSS", "Axios"], tasks: ["Работал с компонентами карточек и списком товаров.", "Реализовывал действия корзины.", "Работал с поиском и debounce.", "Использовал Axios для запросов к API."], decisions: [{ title: "Корзина", text: "Состояние корзины и связанные действия передаются компонентам через provide/inject." }, { title: "Поиск", text: "Debounce уменьшает количество обновлений при вводе строки поиска." }], result: "Учебное приложение с открытыми исходниками и доступным демо. Самостоятельные изменения относительно гайда отдельно не атрибутированы.", repo: "https://github.com/DenissioBarkani/vue-sneakers", demo: sourceExamples["DenissioBarkani/vue-sneakers"].demoUrl, cover: { tone: "sneakers", label: "VUE SNEAKERS", headline: "Практика\nна Vue.", technology: "Vue / Components", icon: "code", symbol: "/ /" }, media: [], examples: sourceExamples["DenissioBarkani/vue-sneakers"].files, codeSection: { eyebrow: "Реальные исходники", title: "Немного кода", intro: "Выбранные фрагменты из публичного репозитория. У каждого файла есть пояснение и ссылка на точную версию исходника." },
  },
] as const satisfies readonly Project[];


