export const GET_AGENTS_QUERY = `
query GetAgents {
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
`