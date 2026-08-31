export type ServiceItem = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  link: string;
};

export type PhotoArchiveItem = {
  id: string;
  title: string;
  location: string;
  tag: string;
  src: string;
  ratio: "portrait" | "landscape" | "square";
  focalLength: string;
  camera: string;
  exif: string;
};

export type ReviewItem = {
  id: string;
  author: string;
  country: string;
  rating: number;
  date?: string;
  comment: string;
  tourType: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  details: string[];
  price?: string;
};

export type StatItem = {
  number: string;
  label: string;
  description: string;
};
