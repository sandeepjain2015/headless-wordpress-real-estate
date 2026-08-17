export const GET_PROPERTIES_QUERY = `
query GetProperties {
  properties(first: 10) {
    nodes {
      id
      title
      slug
      date

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
      }
    }
  }
}
`;
export const GET_PROPERTY_QUERY = `
query GetProperty($slug: ID!) {
  property(id: $slug, idType: SLUG) {
    title
    content
    featuredImage {
      node {
        sourceUrl
      }
    }
    propertyDetail {
      price
      bedroom
      bathroom
      area
      mapEmbed
    }
    author {
      node {
        name
        email
        avatar {
          url
        }
        description
        userDetails {
          designation
          phone
          facebook
          twitter
          linkedin
          instagram
          image{
           node {
    id
    sourceUrl
    altText
  }
          }
        }
      }
    }
  }
}
`;
export const SUBMIT_PROPERTY_MUTATION = `
  mutation SubmitPropertyForReview(
    $input: SubmitPropertyForReviewInput!
  ) {
    submitPropertyForReview(input: $input) {
      success
      message
      propertyId
    }
  }
`;