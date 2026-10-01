export const site = {
  url: "https://denis-barkalov.vercel.app",
  metadata: {
    defaultTitle: "Денис Баркалов · Frontend-разработчик",
    titleTemplate: "%s · Денис Баркалов",
    description:
      "Портфолио Дениса Баркалова: Vue, React, TypeScript, интерфейсы, проекты и исходный код.",
  },
  profile: {
    name: "Денис Баркалов",
    role: "Frontend-разработчик",
    email: "dbarkalovuc@gmail.com",
    phone: "+7 (918) 546-32-01",
    phoneHref: "tel:+79185463201",
    telegram: "https://t.me/DenissioBarkaniBH",
    telegramHandle: "@DenissioBarkaniBH",
    github: "https://github.com/DenissioBarkani",
    githubHandle: "DenissioBarkani",
    resumeHref: "/resume/denis-barkalov.doc",
  },
  navigation: [
    { href: "/#projects", label: "Работы" },
    { href: "/#experience", label: "Опыт" },
    { href: "/#about", label: "Обо мне" },
  ],
  footerYear: "2026",
} as const;

export type SiteProfile = typeof site.profile;
