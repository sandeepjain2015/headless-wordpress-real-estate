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

  console.log("GraphQL HTTP status:", response.status);
  console.log("GraphQL response:", JSON.stringify(result, null, 2));

  if (!response.ok) {
    throw new Error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}`
    );
  }

  if (result.errors?.length) {
    console.error("GraphQL Errors:", JSON.stringify(result.errors, null, 2));

    throw new Error(
      result.errors
        .map((error: { message?: string }) => error.message)
        .join(", ")
    );
  }

  return result.data as T;
}