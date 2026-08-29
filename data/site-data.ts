export type Project = {
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  description?: string;
  image: string;
  gallery?: string[];
};

export type ProjectCategory = {
  title: string;
  slug: string;
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
