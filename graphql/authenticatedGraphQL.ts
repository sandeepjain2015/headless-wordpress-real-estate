import { cookies } from "next/headers";

import { fetchGraphQL } from "@/lib/wordpress";

export async function authenticatedGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const cookieStore = await cookies();

  const authToken =
    cookieStore.get("wp_auth_token")?.value;

  if (!authToken) {
    throw new Error(
      "Authentication token not found. Please login."
    );
  }

  

  try {

    const result =
      await fetchGraphQL<T>(
        query,
        variables,
        authToken
      );

    

    return result;

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "";

    
    if (
      message
        .toLowerCase()
        .includes("expired token")
    ) {
      throw new Error(
        "JWT_ACCESS_TOKEN_EXPIRED"
      );
    }

    throw error;
  }
}