export const GET_HERO_QUERY = `
query GetHomePage {
  page(id: "home", idType: URI) {
    homepage {
      slide1 {
        node {
          sourceUrl
          altText
        }
      }
      slide2 {
        node {
          sourceUrl
          altText
        }
      }
      slide3 {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
`;