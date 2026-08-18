export const LOGIN_MUTATION = `
  mutation Login(
    $username: String!
    $password: String!
  ) {
    login(
      input: {
        username: $username
        password: $password
      }
    ) {
      authToken
      refreshToken

      user {
        id
        databaseId
        name
        username
        email
      avatar {
          url
        }
        roles {
          nodes {
            name
          }
        }
      }
    }
  }
`;
export const REFRESH_JWT_AUTH_TOKEN_MUTATION = `
  mutation RefreshJwtAuthToken(
    $jwtRefreshToken: String!
  ) {
    refreshJwtAuthToken(
      input: {
        jwtRefreshToken: $jwtRefreshToken
      }
    ) {
      authToken
    }
  }
`;