export const GET_TESTIMONIALS_QUERY = `
query GetTestimonials {

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

}
`;