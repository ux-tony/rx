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

export type ServiceItem = {
  index: string;
  title: string;
  description: string;
};

export const metrics: Metric[] = [
  {
    value: "18",
    label: "концепций и предварительных сценариев для будущей коллекции портфолио"
  },
  {
    value: "2-3",
    label: "формата подачи, чтобы сайт одинаково уверенно работал на desktop и mobile"
  },
  {
    value: "1",
    label: "контактный маршрут от первого обращения до запуска проектной работы"
  }
];

export const projectCategories = ["Частные резиденции", "Интерьеры", "Общественные пространства", "Hospitality"];

export const projects: Project[] = [
  {
    slug: "house-atria",
    title: "House Atria",
    category: "Частные резиденции",
    description: "Просторный дом с внутренним атриумом, мягким сценарием света и сдержанной палитрой натурального камня.",
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
    category: "Частные резиденции",
    description: "Загородная вилла с длинными видовыми осями, приватным внутренним двором и интегрированным ландшафтом.",
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
    category: "Общественные пространства",
    description: "Реконструкция общественного пространства с акцентом на маршрут, световые акценты и событийный сценарий.",
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
    category: "Общественные пространства",
    description: "Камерный жилой объект с ритмичным фасадом, террасами и продуманными общими пространствами.",
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
    description: "Бутик-отель, построенный на балансе тактильных материалов, тёплого света и приватной атмосферы.",
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
    category: "Интерьеры",
    description: "Интерьерный кейс с монохромной палитрой, цельными объёмами хранения и природной фактурой камня и дерева.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80"
    ]
  }
];

export const services: ServiceItem[] = [
  {
    index: "01",
    title: "Жилые и общественные интерьеры",
    description:
      "Продумываем планировку, свет, материалы и сценарии повседневного использования, чтобы интерьер сохранял актуальность и в жизни, и в эксплуатации."
  },
  {
    index: "02",
    title: "Фасады зданий",
    description:
      "Формируем внешний образ объекта через ритм, пропорции и материал, подбирая решение, которое держит архитектурный характер на расстоянии и вблизи."
  },
  {
    index: "03",
    title: "Гостиницы и рестораны",
    description:
      "Создаём пространства для гостевого опыта: от первого впечатления и навигации до атмосферы общих зон, номеров и ресторанных сценариев."
  },
  {
    index: "04",
    title: "Ландшафт и коммерческие территории",
    description:
      "Разрабатываем ландшафтный дизайн и концепции территории для коммерческих объектов, связывая архитектуру, маршрут, озеленение и точки взаимодействия."
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "С чего начинается работа над проектом и что нужно подготовить до первой встречи?",
    answer:
      "Первый этап — короткое интервью о задачах, составе помещений, участке или объекте, желаемых сроках и ориентире по бюджету. На встречу полезно принести референсы, план БТИ, фото объекта и любые вводные по инженерии или ограничениям."
  },
  {
    question: "Как понять, какой объём проектирования мне нужен: концепция, эскиз или полный проект?",
    answer:
      "Это зависит от цели. Если нужно понять образ и планировочную идею, достаточно концепции. Если объект идёт в реализацию, обычно нужен полный комплект: планировка, визуализация, рабочие чертежи, материалы и координация смежников."
  },
  {
    question: "Можно ли спроектировать интерьер или фасад в рамках уже существующего бюджета?",
    answer:
      "Да, но бюджет важно обсуждать с самого начала. Он влияет на состав решений, материалы, конструктив и глубину детализации. Чем раньше мы фиксируем рамку бюджета, тем точнее проект и меньше пересборок в процессе."
  },
  {
    question: "Сколько времени занимает архитектурный проект?",
    answer:
      "Срок зависит от масштаба и состава проекта. Концепция может занять несколько недель, а полный цикл по интерьеру или общественному объекту — от нескольких месяцев. На сроки сильнее всего влияют скорость согласований и объём изменений по ходу работы."
  },
  {
    question: "Насколько активно заказчик участвует в процессе?",
    answer:
      "Мы строим работу так, чтобы участие было содержательным, но не перегруженным. Обычно заказчик подключается на ключевых этапах: утверждение концепции, планировок, материалов, визуализации и финального пакета решений."
  },
  {
    question: "Что входит в сопровождение реализации после завершения проекта?",
    answer:
      "При необходимости подключаем авторский надзор или сопровождение: уточнения для подрядчиков, проверка соответствия проекту, ответы по узлам и материалам, а также корректировки, если в процессе возникают объективные ограничения."
  },
  {
    question: "Можно ли заказать только один блок работ, например фасад, ресторан или благоустройство территории?",
    answer:
      "Да. Проект можно собрать модульно: отдельно интерьер, фасад, гостиничный блок, ресторан или концепцию территории. Главное — на старте определить границы задачи, чтобы решение было цельным и не требовало полной переделки на следующем этапе."
  }
];
