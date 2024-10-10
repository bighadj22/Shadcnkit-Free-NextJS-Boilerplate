import { WhatIsShadcnKit_en, WhatIsShadcnKit_fr, WhatIsShadcnKit_ar } from "@/app/content/articles/what-is-shadcnkit";

export const blogs = [
  {
    id: 0,
    name: {
      en: "What is ShadcnKit? The Next.js Starter Kit You Need",
      fr: "Qu'est-ce que ShadcnKit ? Le Kit de Démarrage Next.js dont Vous Avez Besoin",
      ar: "ما هو ShadcnKit؟ مجموعة أدوات Next.js التي تحتاجها" // Added Arabic name
    },
    description: {
      en: "Discover ShadcnKit, a comprehensive Next.js starter kit that streamlines web development with integrated tools for hosting, database management, authentication, and more.",
      fr: "Découvrez ShadcnKit, un kit de démarrage Next.js complet qui simplifie le développement web avec des outils intégrés pour l'hébergement, la gestion de base de données, l'authentification, et plus encore.",
      ar: "اكتشف ShadcnKit، مجموعة أدوات شاملة لتطوير الويب باستخدام Next.js، والتي تبسط تطوير الويب مع أدوات مدمجة للاستضافة، وإدارة قواعد البيانات، والمصادقة، والمزيد." // Added Arabic description
    },
    title: {
      en: "What is ShadcnKit? The Next.js Starter Kit You Need",
      fr: "Qu'est-ce que ShadcnKit ? Le Kit de Démarrage Next.js dont Vous Avez Besoin",
      ar: "ما هو ShadcnKit؟ مجموعة أدوات Next.js التي تحتاجها" // Added Arabic title
    },
    slug: "what-is-shadcnkit",
    created_at: new Date("2024-03-15").toISOString(),
    link: "/blog/what-is-shadcnkit",
    article: {
      en: WhatIsShadcnKit_en,
      fr: WhatIsShadcnKit_fr,
      ar: WhatIsShadcnKit_ar // Added Arabic article
    },
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    keywords: ["ShadcnKit", "Next.js", "Web Development", "Starter Kit", "Cloudflare", "Stripe", "Logto", "React"],
  },
];