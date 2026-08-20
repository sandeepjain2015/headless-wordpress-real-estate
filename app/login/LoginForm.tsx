"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

import { loginUser } from "@/actions/auth";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [turnstileToken, setTurnstileToken] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    /**
     * Turnstile must be completed
     */
    if (!turnstileToken) {
      setError(
        "Please complete the security verification."
      );
      return;
    }

    setLoading(true);

    try {
      /**
       * Login through Server Action
       *
       * Turnstile token is sent to the server.
       */
      const user = await loginUser(
        username,
        password,
        turnstileToken
      );

      /**
       * Check whether the logged-in user
       * has the agent role.
       */
      const isAgent =
        user.roles?.nodes?.some(
          (role) =>
            role.name === "agent"
        );

      if (isAgent) {
        router.push(
          "/agent-dashboard"
        );

        router.refresh();

        return;
      }

      setError(
        "You are not authorized as an agent."
      );

      /**
       * Reset Turnstile after
       * authorization failure.
       */
      setTurnstileToken("");

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );

      /**
       * Turnstile tokens should not
       * be reused after a failed attempt.
       */
      setTurnstileToken("");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="mx-auto border rounded p-4"
      style={{
        maxWidth: "526px",
      }}
    >
      <h1 className="text-center mb-4">
        Agent Login
      </h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Username */}

        <div className="mb-3">
          <label
            htmlFor="username"
            className="form-label"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(event) =>
              setUsername(
                event.target.value
              )
            }
            required
            autoComplete="username"
          />
        </div>

        {/* Password */}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            required
            autoComplete="current-password"
          />
        </div>

        {/* Cloudflare Turnstile */}

        <div className="mb-4 d-flex justify-content-center">
          <Turnstile
            siteKey={
              process.env
                .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
            }

            onSuccess={(token) => {
              console.log(
                "Login Turnstile verified"
              );

              setTurnstileToken(token);
              setError("");
            }}

            onError={() => {
              console.error(
                "Login Turnstile error"
              );

              setTurnstileToken("");

              setError(
                "Security verification failed. Please try again."
              );
            }}

            onExpire={() => {
              console.warn(
                "Login Turnstile expired"
              );

              setTurnstileToken("");

              setError(
                "Security verification expired. Please verify again."
              );
            }}
          />
        </div>

        {/* Submit */}

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-5"
            disabled={
              loading ||
              !turnstileToken
            }
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </div>

      </form>
    </div>
  );
}