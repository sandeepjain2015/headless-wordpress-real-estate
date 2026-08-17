export const APPLY_AS_AGENT_MUTATION = `
  mutation ApplyAsAgent(
    $name: String!
    $email: String!
    $phone: String
    $description: String
    $facebook: String
    $twitter: String
    $linkedin: String
    $instagram: String
    $imageId: Int
  ) {
    applyAsAgent(
      input: {
        name: $name
        email: $email
        phone: $phone
        description: $description
        facebook: $facebook
        twitter: $twitter
        linkedin: $linkedin
        instagram: $instagram
        imageId: $imageId
      }
    ) {
      success
      message
      userId
      user {
        id
        name
        email
      }
    }
  }
`;