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

    // Important: allow Next.js/Vercel to cache public GraphQL requests.
    next: {
      revalidate: 60,
    },
  });

  /**
   * Read response as text first.
   * This prevents JSON.parse() from crashing when WordPress,
   * hosting, firewall, or rate limiter returns plain text.
   */
  const responseText = await response.text();

  /**
   * HTTP error / rate-limit response.
   */
  if (!response.ok) {
    console.error("GraphQL HTTP Error:", {
      status: response.status,
      statusText: response.statusText,
      url: API_URL,
      response: responseText,
    });

    throw new Error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}${
        responseText ? ` - ${responseText}` : ""
      }`
    );
  }

  /**
   * Parse JSON only after confirming the HTTP request succeeded.
   */
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
      `GraphQL returned an invalid JSON response: ${responseText.slice(0, 300)}`
    );
  }

  /**
   * GraphQL errors.
   */
  if (result.errors?.length) {
    console.error(
      "GraphQL Errors:",
      JSON.stringify(result.errors, null, 2)
    );

    const errorMessage = result.errors
      .map((error) => {
        return (
          error.extensions?.debugMessage ||
          error.message ||
          "Unknown GraphQL error"
        );
      })
      .join(", ");

    throw new Error(errorMessage);
  }

  /**
   * Return GraphQL data.
   */
  return result.data as T;
}