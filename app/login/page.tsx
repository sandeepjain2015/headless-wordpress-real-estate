"use client";

import { FormEvent, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { loginUser } from "@/actions/auth";
import PageHero from "@/components/PageHero";
import { cookies } from "next/headers";
export default async function LoginPage() {
  const cookieStore = await cookies();
  
    const userCookie =
      cookieStore.get("wp_user")?.value;
  
    if (userCookie) {
      redirect("/agent-dashboard");
    }
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(
        username,
        password
      );

    

      /**
       * Agent login successful.
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
      } else {
        setError(
          "You are not authorized as an agent."
        );
      }

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

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        title={"Agent Login"}
        backgroundImage={""}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Login" },
        ]}
      />
    <main className="container py-5">

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

        <form
          onSubmit={handleSubmit}
        >

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

          <div className="text-center">

            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </div>

        </form>

      </div>

    </main>
    </>
  );
}