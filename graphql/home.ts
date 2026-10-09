export const GET_HOME_QUERY = `
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
    properties(first: 10) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        propertyDetail {
          price
          bedroom
          bathroom
          area
        }
      }
    }
    testimonials(first: 10) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        testimonialDetails {
          designation
        }
      }
    }
    agents(first: 10) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        agentDetails {
          designation
          facebookUrl
          twitterUrl
          linkedinUrl
          instagramUrl
        }
      }
    }
  }
`;
