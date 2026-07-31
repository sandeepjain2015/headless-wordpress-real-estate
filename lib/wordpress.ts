export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const API_URL = process.env.WP_GRAPHQL_URL;

  if (!API_URL) {
    throw new Error("WP_GRAPHQL_URL is not defined.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 60,
    },
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error("GraphQL request failed.");
  }

  console.log("Fetched GraphQL data:", result.data);

  return result.data as T;
}