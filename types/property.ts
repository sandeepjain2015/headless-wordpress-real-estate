export interface PropertiesResponse {
  properties: {
    nodes: Property[];
  };
}


export interface PropertyResponse {
  property: Property | null;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  content: string;

  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };

  author?: {
    node?: {
      id: string;
      name: string;
      slug: string;
      avatar?: {
        url: string;
      };
    };
  };
}