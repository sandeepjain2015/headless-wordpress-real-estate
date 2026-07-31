export const GET_PAGE = `
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;