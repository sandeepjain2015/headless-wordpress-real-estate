"use server";

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
          slug: string;
        }[];
      };
    };
  };
};

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {

  return fetchGraphQL<LoginResponse>(
    LOGIN_MUTATION,
    {
      input: {
        provider: "PASSWORD",
        username,
        password,
      },
    }
  );
}