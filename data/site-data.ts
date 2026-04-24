export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
};

export type Metric = {
  value: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const metrics: Metric[] = [
  {
    value: "18",
    label: "концептов в коллекции MVP для будущего каталога"
  },
  {
    value: "2-3",
    label: "колонки на desktop с сохранением чистой мобильной сетки"
  },
  {
    value: "1",
    label: "акцентный оттенок во всей визуальной системе"
  }
];

export const projectCategories = ["Частные резиденции", "Интерьеры", "Культурные пространства", "Hospitality"];

export const projects: Project[] = [
  {
    slug: "house-atria",
    title: "House Atria",
    category: "Частная резиденция",
    description: "Дом с центральным световым атриумом, монолитной пластикой фасада и спокойной палитрой натурального камня.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "frame-villa",
    title: "Frame Villa",
    category: "Загородный дом",
    description: "Линейная композиция с длинными видовыми коридорами, приватным внутренним двором и интегрированным ландшафтом.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "gallery-passage",
    title: "Gallery Passage",
    category: "Культурное пространство",
    description: "Мягкая реконструкция общественного пространства с акцентом на маршрут, световые акценты и событийный сценарий.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "atrium-lofts",
    title: "Atrium Lofts",
    category: "Девелопмент",
    description: "Камерный жилой объект с ритмичным фасадом, террасами и общими пространствами без визуальной перегрузки.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "quiet-hotel",
    title: "Quiet Hotel",
    category: "Hospitality",
    description: "Бутик-отель, построенный на балансе тактильных материалов, теплого света и приватной атмосферы в общественных зонах.",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "stone-courtyard",
    title: "Stone Courtyard",
    category: "Интерьер",
    description: "Интерьерный кейс с монохромной палитрой, цельными объемами хранения и природной фактурой камня и дерева.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80"
    ]
  }
];

export const services = [
  {
    index: "01",
    title: "Private Residences",
    description: "Архитектура частных домов с фокусом на сценарии жизни, пластике объема и приватности участков."
  },
  {
    index: "02",
    title: "Interior Concepts",
    description: "Минималистичные интерьеры с проработкой материала, света, мебели и общей пространственной тишины."
  },
  {
    index: "03",
    title: "Public Spaces",
    description: "Культурные и коммерческие пространства, где маршрут, масштаб и атмосфера становятся частью бренда."
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "Что уже входит в MVP на текущем этапе?",
    answer:
      "Главная страница, hero-блок, сетка проектов, блок подхода, FAQ и контактная секция. Контент и изображения пока демонстрационные."
  },
  {
    question: "Почему Mantine используется только частично?",
    answer:
      "В ТЗ важно избежать ощущения готового библиотечного шаблона. Поэтому библиотека подключена адресно, только для интерактивного FAQ и общей темы."
  },
  {
    question: "Как можно развить проект дальше?",
    answer:
      "Следующим шагом можно подключить headless CMS, админ-панель, real project pages, формы заявок, SEO-блоки и аналитику."
  }
];
