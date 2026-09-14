import { PhotoArchiveItem, ServiceItem, StatItem } from "../types";

export const founderData = {
  name: "Yuichi Narisawa (成澤 祐一 / Yu)",
  role: "Founder & Creative Director / Certified National Tour Guide (English)",
  trackRecord: "10年間で約6,000名以上の世界中のゲストを東京の深層へ案内。",
  gear: "Sony α7V, Cinema Prime Lenses, Street & Luxury Aesthetics",
  bio: "「予定調和の観光ガイドではなく、街の熱量と美学を共有するクリエイティブディレクターとして。路地裏の錆びた質感から表参道の洗練された建築美まで、計算された構図とストリートのエッジをもって東京の『今』を切り取ります。」"
};



export const servicesData: ServiceItem[] = [
  {
    id: "s1",
    tag: "01",
    title: "BESPOKE TOURS",
    subtitle: "UNSCRIPTED & CULTURAL IMMERSION",
    description: "「予定調和」の観光を排し、東京の深淵を解き明かすプライベートツアーの提供。",
    bullets: ["Tailored Itineraries", "Deep Cultural Context", "Spontaneous Encounters"],
    link: "/tours"
  },
  {
    id: "s2",
    tag: "02",
    title: "PHOTOGRAPHY & MEDIA",
    subtitle: "CINEMATIC STREET PERSPECTIVES",
    description: "都市の陰影、熱量、質感を切り取るスティル、およびシネマティック映像の企画・制作。",
    bullets: ["Narrative Photography", "Cinematic Video", "Visual Storytelling"],
    link: "/photography"
  },
  {
    id: "s3",
    tag: "03",
    title: "TOURISM STRATEGY & ADVISORY",
    subtitle: "DESTINATION DEVELOPMENT & LOCAL ADVISORY",
    description: "観光事業者、自治体、DMOに向けた受入環境整備、高付加価値コンテンツ開発、現場視点に基づく実践的戦略コンサルティング。",
    bullets: ["Experience Curation", "High-Yield Strategy", "Municipal Partnerships"],
    link: "/consulting"
  },
  {
    id: "s4",
    tag: "04",
    title: "GUIDE ENTREPRENEUR ACADEMY",
    subtitle: "PROFESSIONAL TALENT INCUBATION",
    description: "単なる案内人にとどまらない、自立した事業主としての視点・収益構造を持つトップティアガイドの育成・研修。",
    bullets: ["High-Ticket Positioning", "Brand Development", "Field Masterclasses"],
    link: "/academy"
  }
];

export const photoArchiveData: PhotoArchiveItem[] = [
  {
    id: "p1",
    title: "Neon Echoes",
    location: "Shinjuku, Tokyo",
    tag: "STREET",
    src: "/images/hero/A7V04824 1 Large.jpeg",
    ratio: "portrait",
    focalLength: "35mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 35MM F1.4 // RAW PROCESSED"
  },
  {
    id: "p2",
    title: "Concrete Minimalism",
    location: "Omotesando, Tokyo",
    tag: "ARCHITECTURE",
    src: "/images/hero/A7V00424 Large.jpeg",
    ratio: "landscape",
    focalLength: "50mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 50MM F1.2 // BW CONVERTED"
  },
  {
    id: "p3",
    title: "Midnight Silhouette",
    location: "Shibuya, Tokyo",
    tag: "PORTRAIT",
    src: "/images/hero/A7V00582_GEN 2 Large.jpeg",
    ratio: "portrait",
    focalLength: "85mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 85MM F1.4 // PUSHED +1EV"
  },
  {
    id: "p4",
    title: "Industrial Arteries",
    location: "Akihabara, Tokyo",
    tag: "URBAN",
    src: "/images/hero/A7V06246 Large.jpeg",
    ratio: "landscape",
    focalLength: "35mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 35MM F1.4 // CINE TONE"
  },
  {
    id: "p5",
    title: "Hidden Alleys",
    location: "Golden Gai, Tokyo",
    tag: "STREET",
    src: "/images/hero/A7V06568 Large.jpeg",
    ratio: "portrait",
    focalLength: "50mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 50MM F1.2 // LOW LIGHT"
  },
  {
    id: "p6",
    title: "Cultural Threads",
    location: "Asakusa, Tokyo",
    tag: "CULTURE",
    src: "/images/hero/A7V06833 Large.jpeg",
    ratio: "landscape",
    focalLength: "35mm",
    camera: "Sony a7V",
    exif: "SONY α7V // 35MM F1.4 // CINE TONE"
  }
];

export const pricingPlans = [
  {
    id: "plan-a",
    name: "Street Snap Option",
    description: "Added to any private tour. Unposed, cinematic captures of your journey.",
    details: ["20+ Graded Photos", "Delivered in 48 hours", "Optimized for social media"]
  },
  {
    id: "plan-b",
    name: "Editorial Portrait Session",
    description: "A dedicated 2-hour shooting session focusing on editorial-style street portraits.",
    details: ["2 Hours dedicated shooting", "10+ Retouched Looks", "Creative Direction included"]
  },
  {
    id: "plan-c",
    name: "Commercial / Brand Production",
    description: "Bespoke production for brands requiring high-end Tokyo aesthetics.",
    details: ["Full day production", "Extensive licensing", "Location scouting"]
  }
];

export const statsData: StatItem[] = [
  {
    number: "5.0",
    label: "Star Rating",
    description: "Consistently flawless reviews."
  },
  {
    number: "6K+",
    label: "Guests Guided",
    description: "Global clientele over 10 years."
  },
  {
    number: "100%",
    label: "Custom Routes",
    description: "No templated itineraries."
  },
  {
    number: "40+",
    label: "Nationalities",
    description: "Bridging diverse cultures."
  }
];
