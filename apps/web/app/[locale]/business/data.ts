import {
  BookOpen,
  Building2,
  DraftingCompass,
  Factory,
  FileSignature,
  Gem,
  Gift,
  GraduationCap,
  LayoutDashboard,
  type LucideIcon,
  Megaphone,
  Pill,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Workflow,
} from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/963956954441";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mohammad-khayata-9169801a9";

// Placeholder photography — replace ids with real project shots when ready.
export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  hero: "/assets/portrait-6.png",
  planning: unsplash("1532622785990-d2c36a76f5a6"),
  ecommerce: unsplash("1758524944006-ba8116008496"),
  delivery: unsplash("1586528116311-ad8dd3c8310d"),
  dashboard: unsplash("1551288049-bebda4e38f71"),
  websites: unsplash("1526628953301-3e589a6a8b74"),
};

// Placeholder client marks — swap `icon` for a logo path once assets exist.
export const clients: { name: string; icon: LucideIcon }[] = [
  { name: "Unique Line", icon: DraftingCompass },
  { name: "Rivira Pharma", icon: Pill },
  { name: "Awija Metal", icon: Factory },
  { name: "Altin Saray", icon: Gem },
  { name: "Al E'lm Nour", icon: BookOpen },
  { name: "Golden Wrap", icon: Gift },
  { name: "Fly Order", icon: ShoppingBag },
  { name: "JDM Contracts", icon: FileSignature },
  { name: "Pro Marketing", icon: Megaphone },
  { name: "MR Course", icon: GraduationCap },
  { name: "ELKOOD", icon: Building2 },
];

export const services = [
  {
    icon: LayoutDashboard,
    title: "أنظمة ومواقع الأعمال",
    body: "نطور مواقع الشركات والأنظمة الداخلية التي تساعدك على إدارة عملك بشكل أفضل.",
    items: [
      "لوحات التحكم والإدارة",
      "أنظمة الطلبات والمبيعات",
      "نماذج وسير عمل إلكتروني",
      "أنظمة إدارة البيانات",
      "البوابات الداخلية للعملاء أو الموظفين",
      "حلول مخصصة حسب طبيعة العمل",
    ],
    image: images.dashboard,
  },
  {
    icon: ShoppingCart,
    title: "التجارة الإلكترونية",
    body: "إذا كنت تبدأ متجرًا جديدًا أو تريد تطوير تجارتك الإلكترونية، يمكننا تجهيز وتشغيل الحل المناسب لك.",
    items: [
      "المتجر الإلكتروني",
      "إدارة المنتجات والطلبات",
      "لوحة تحكم التاجر",
      "إدارة العمليات",
      "ربط خدمات التوصيل",
      "التكامل مع الخدمات الأخرى",
    ],
    note: "E-Dukkan هو أحد الحلول التي يمكن الاعتماد عليها لهذا النوع من المشاريع.",
    image: images.ecommerce,
  },
  {
    icon: Truck,
    title: "التوصيل وإدارة الطلبات",
    body: "للمتاجر والشركات التي تعتمد على التوصيل، نعمل على Deal Delivery لإدارة عمليات التوصيل وتتبع الطلبات والسائقين.",
    note: "يمكن استخدامه كجزء من متجر إلكتروني أو كحل لإدارة عمليات التوصيل داخل الشركة.",
    image: images.delivery,
  },
  {
    icon: Workflow,
    title: "الربط والأتمتة",
    body: "ليس كل احتياج يحتاج إلى نظام جديد. نساعدك على ربط الأنظمة والخدمات التي تستخدمها بالفعل لتقليل العمل اليدوي وتكرار إدخال البيانات.",
    formula: ["أداة موجودة", "ربط جيد", "أتمتة بسيطة"],
  },
];

export const discoveryQuestions = [
  "كيف تعمل العملية اليوم؟",
  "أين يضيع الوقت؟",
  "ما الذي يتم يدويًا؟",
  "ما الأنظمة التي تستخدمها حاليًا؟",
  "هل تحتاج فعلًا إلى نظام جديد؟",
];

export const possibleSolutions = [
  "خدمة جاهزة",
  "Odoo",
  "أداة موجودة مع بعض الأتمتة",
  "ربط بين الأنظمة",
  "نظام مخصص",
  "التعاون مع شركة متخصصة",
];

export const behindTheScenes = [
  "إدارة البيانات",
  "الصلاحيات",
  "العمليات",
  "التكامل",
  "الأداء",
  "الاعتمادية",
  "سهولة الاستخدام",
];

export const solutions = [
  {
    title: "E-Dukkan",
    body: "منصة تجارة إلكترونية متكاملة للتاجر، تشمل المتجر وإدارة المنتجات والطلبات ولوحة التحكم، مع إمكانية التكامل مع خدمات التوصيل.",
    image: images.ecommerce,
    featured: true,
  },
  {
    title: "Deal Delivery",
    body: "منصة لإدارة عمليات التوصيل، تربط الأعمال بالطلبات والسائقين والتتبع، ويمكن استخدامها كجزء من منظومة التجارة الإلكترونية أو بشكل مستقل.",
    image: images.delivery,
    featured: true,
  },
  {
    title: "أنظمة أعمال وERP",
    body: "خبرة في بناء لوحات الإدارة، النماذج، البيانات، العمليات، وأنظمة الأعمال التي تحتاجها الشركات لإدارة عملياتها اليومية.",
    image: images.dashboard,
  },
  {
    title: "مواقع ومنصات رقمية",
    body: "مواقع الشركات والمنصات والخدمات الرقمية، من صفحات التعريف إلى الأنظمة التفاعلية المتكاملة.",
    image: images.websites,
  },
];

export const decisionLadder = [
  { when: "إذا كان Google Forms كافيًا", then: "نستخدمه." },
  { when: "إذا كان Odoo مناسبًا", then: "نستخدمه." },
  { when: "إذا كانت هناك خدمة جاهزة تحل المشكلة", then: "نربطها." },
  { when: "إذا كانت هناك شركة متخصصة تنفذ جزءًا أفضل", then: "نتعاون معها." },
];

export const steps = [
  {
    title: "نتعرف على احتياجك",
    body: "تخبرنا عن نشاطك والمشكلة التي تواجهها، حتى لو لم تكن تعرف ما هو الحل التقني المطلوب.",
  },
  {
    title: "نبحث عن الحل المناسب",
    body: "جاهز، مخصص، أتمتة، تكامل، أو شراكة مع جهة متخصصة.",
  },
  {
    title: "ننفذ ونربط",
    body: "نحرص على أن تعمل الأجزاء معًا بدل أن تحصل على مجموعة أدوات منفصلة.",
  },
  {
    title: "نطور مع نمو العمل",
    body: "ليس المطلوب بناء كل شيء من اليوم الأول. نبدأ بما تحتاجه فعلًا، ثم نوسع الحل عندما يكون هناك سبب حقيقي لذلك.",
  },
];
