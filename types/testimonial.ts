export type Testimonial = {
  id: string;
  title: string;
  content: string;

  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };

  testimonialDetails?: {
    designation?: string;
  };
};

export type TestimonialsResponse = {
  testimonials: {
    nodes: Testimonial[];
  };
};