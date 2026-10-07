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
    Accept: "application/json",
  };

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

    // Cache public requests, but never cache authenticated requests.
    ...(token
      ? { cache: "no-store" as const }
      : {
          next: {
            revalidate: 60,
          },
        }),
  });

  // Read as text first so a 429/plain-text response doesn't crash JSON.parse.
  const responseText = await response.text();

  if (!response.ok) {
    console.error("GraphQL HTTP Error:", {
      status: response.status,
      statusText: response.statusText,
      response: responseText,
    });

    throw new Error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}${
        responseText ? ` - ${responseText}` : ""
      }`
    );
  }

  let result: {
    data?: T;
    errors?: Array<{
      message?: string;
      extensions?: {
        debugMessage?: string;
      };
    }>;
  };

  try {
    result = JSON.parse(responseText);
  } catch {
    console.error("Invalid GraphQL JSON response:", responseText);

    throw new Error(
      `GraphQL returned invalid JSON: ${responseText.slice(0, 300)}`
    );
  }

  if (result.errors?.length) {
    console.error(
      "GraphQL Errors:",
      JSON.stringify(result.errors, null, 2)
    );

    const errorMessage = result.errors
      .map(
        (error) =>
          error.extensions?.debugMessage ||
          error.message ||
          "Unknown GraphQL error"
      )
      .join(", ");

    throw new Error(errorMessage);
  }

  return result.data as T;
}