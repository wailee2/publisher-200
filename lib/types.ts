export type SanityImage = {
  asset?: { _ref: string };
} | undefined;

export type Service = {
  _id: string;
  title: string;
  summary: string;
  imageOne?: SanityImage;
  imageTwo?: SanityImage;
  order?: number;
};

export type PortfolioItem = {
  _id: string;
  title: string;
  slug: { current: string };
  cover?: SanityImage;
  category?: string;
  author?: string;
  summary?: string;
  externalLink?: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage;
  bio?: string;
};

export type Testimonial = {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: SanityImage;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

export type Pillar = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};
