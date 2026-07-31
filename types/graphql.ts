export interface Page {
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
    };
  };
}

export interface PageResponse {
  page: Page;
}