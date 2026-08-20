"use server";

import { cookies } from "next/headers";

import { fetchGraphQL } from "@/lib/wordpress";
import { LOGIN_MUTATION } from "@/graphql/auth";

type LoginResponse = {
  login: {
    authToken: string;
    refreshToken: string;
    user: {
      id: string;
      databaseId: number;
      name: string;
      username: string;
      email: string;
      avatar: {
        url: string;
      };
      roles: {
        nodes: {
          name: string;
        }[];
      };
    };
  };
};

/**
 * Verify Cloudflare Turnstile token.
 */
async function verifyTurnstile(
  token: string
): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error(
      "TURNSTILE_SECRET_KEY is not defined."
    );

    throw new Error(
      "Turnstile is not configured."
    );
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          secret,
          response: token,
        }),

        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Turnstile API error:",
        response.status,
        response.statusText
      );

      return false;
    }

    const result =
      await response.json();

    console.log(
      "Login Turnstile verification:",
      result
    );

    return result.success === true;
  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error
    );

    return false;
  }
}

/**
 * Login user.
 */
export async function loginUser(
  username: string,
  password: string,
  turnstileToken: string
): Promise<
  LoginResponse["login"]["user"]
> {

  /**
   * ----------------------------------------
   * 1. Validate Turnstile token
   * ----------------------------------------
   */
  if (!turnstileToken) {
    throw new Error(
      "Please complete the security verification."
    );
  }

  /**
   * ----------------------------------------
   * 2. Verify Turnstile server-side
   * ----------------------------------------
   */
  const isTurnstileValid =
    await verifyTurnstile(
      turnstileToken
    );

  if (!isTurnstileValid) {
    throw new Error(
      "Security verification failed. Please try again."
    );
  }

  /**
   * ----------------------------------------
   * 3. WordPress JWT login
   * ----------------------------------------
   */
  const result =
    await fetchGraphQL<LoginResponse>(
      LOGIN_MUTATION,
      {
        username,
        password,
      }
    );

  const {
    authToken,
    refreshToken,
    user,
  } = result.login;

  /**
   * ----------------------------------------
   * 4. Store authentication cookies
   * ----------------------------------------
   */
  const cookieStore =
    await cookies();

  /**
   * Access token
   */
  cookieStore.set(
    "wp_auth_token",
    authToken,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",
    }
  );

  /**
   * Refresh token
   */
  cookieStore.set(
    "wp_refresh_token",
    refreshToken,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",
    }
  );

  /**
   * Logged-in user
   */
  cookieStore.set(
    "wp_user",
    JSON.stringify(user),
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",
    }
  );

  /**
   * Return user to LoginForm
   */
  return user;
}