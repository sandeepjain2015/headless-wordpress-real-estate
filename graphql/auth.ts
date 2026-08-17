export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken

      user {
        id
        name
        username
        email

        roles {
          nodes {
            name
          }
        }
      }
    }
  }
`;