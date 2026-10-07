export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  token?: string
): Promise<T> {
  const API_URL = process.env.WP_GRAPHQL_URL;

  if (!API_URL) {
    throw new Error("WP_GRAPHQL_URL is not defined.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  /**
   * Add JWT authentication when token is available.
   */
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  const result = await response.json();

  

  /**
   * HTTP error.
   */
  if (!response.ok) {
    throw new Error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}`
    );
  }

  /**
   * GraphQL errors.
   */
  if (result.errors?.length) {
    console.error(
      "GraphQL Errors:",
      JSON.stringify(
        result.errors,
        null,
        2
      )
    );

    const errorMessage =
      result.errors
        .map(
          (error: {
            message?: string;
            extensions?: {
              debugMessage?: string;
            };
          }) => {
            return (
              error.extensions?.debugMessage ||
              error.message ||
              "Unknown GraphQL error"
            );
          }
        )
        .join(", ");

    throw new Error(errorMessage);
  }

  /**
   * Return GraphQL data.
   */
  return result.data as T;
}