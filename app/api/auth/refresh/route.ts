import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { fetchGraphQL } from "@/lib/wordpress";
import { REFRESH_JWT_AUTH_TOKEN_MUTATION } from "@/graphql/auth";

type RefreshResponse = {
  refreshJwtAuthToken: {
    authToken: string;
    clientMutationId: string | null;
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const returnTo =
    searchParams.get("returnTo") ||
    "/agent-dashboard";

  const cookieStore = await cookies();

  const refreshToken =
    cookieStore.get("wp_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    const result =
      await fetchGraphQL<RefreshResponse>(
        REFRESH_JWT_AUTH_TOKEN_MUTATION,
        {
          jwtRefreshToken: refreshToken,
        }
      );

    const newAuthToken =
      result.refreshJwtAuthToken.authToken;

    if (!newAuthToken) {
      throw new Error(
        "No authentication token returned."
      );
    }

    const response = NextResponse.redirect(
      new URL(returnTo, request.url)
    );

    response.cookies.set(
      "wp_auth_token",
      newAuthToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );

    return response;

  } catch (error) {
    console.error(
      "JWT refresh failed:",
      error
    );

    const response =
      NextResponse.redirect(
        new URL(
          "/login?session=expired",
          request.url
        )
      );

    response.cookies.delete(
      "wp_auth_token"
    );

    response.cookies.delete(
      "wp_refresh_token"
    );

    response.cookies.delete(
      "wp_user"
    );

    return response;
  }
}