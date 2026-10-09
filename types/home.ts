import type { Testimonial } from "@/types/testimonial";

export type HomeImage = {
  sourceUrl: string;
  altText?: string | null;
};

export type HomeProperty = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: HomeImage | null;
  } | null;
  propertyDetail?: {
    price?: string | null;
    bedroom?: number | null;
    bathroom?: number | null;
    area?: number | null;
  } | null;
};

export type HomeAgent = {
  title: string;
  content?: string | null;
  featuredImage?: {
    node?: Pick<HomeImage, "sourceUrl"> | null;
  } | null;
  agentDetails?: {
    designation?: string | null;
    facebookUrl?: string | null;
    twitterUrl?: string | null;
    linkedinUrl?: string | null;
    instagramUrl?: string | null;
  } | null;
};

export type HomeResponse = {
  page?: {
    homepage?: {
      slide1?: { node?: HomeImage | null } | null;
      slide2?: { node?: HomeImage | null } | null;
      slide3?: { node?: HomeImage | null } | null;
    } | null;
  } | null;
  properties?: { nodes: HomeProperty[] } | null;
  testimonials?: { nodes: Testimonial[] } | null;
  agents?: { nodes: HomeAgent[] } | null;
};
