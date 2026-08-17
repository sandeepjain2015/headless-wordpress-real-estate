"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fetchGraphQL } from "@/lib/wordpress";
import { LOGIN_MUTATION } from "@/graphql/auth";

export type LoginResponse = {
  login: {
    authToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      roles: {
        nodes: {
          name: string;
        }[];
      };
    };
  };
};

export async function loginUser(
  username: string,
  password: string
) {
  const result = await fetchGraphQL<LoginResponse>(
    LOGIN_MUTATION,
    {
      input: {
        clientMutationId: "agent-login",
        username,
        password,
      },
    }
  );

  const { authToken, refreshToken, user } =
    result.login;

  const cookieStore = await cookies();

  cookieStore.set(
    "wp_auth_token",
    authToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  cookieStore.set(
    "wp_refresh_token",
    refreshToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  cookieStore.set(
    "wp_user",
    JSON.stringify(user),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  return {
    success: true,
    user,
  };
}