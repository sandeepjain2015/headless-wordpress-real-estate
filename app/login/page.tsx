"use client";

import { FormEvent, useState } from "react";
import { loginUser } from "@/actions/auth";
import PageHero from "@/components/PageHero";
export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      const result = await loginUser(
        username,
        password
      );

      console.log(
        "Login successful:",
        result.login.user
      );

      /**
       * Temporary:
       * Check login response first.
       */
      if (result.login.authToken) {

        console.log(
          "Auth Token:",
          result.login.authToken
        );

        console.log(
          "Refresh Token:",
          result.login.refreshToken
        );

        console.log(
          "User:",
          result.login.user
        );

        /**
         * Next step:
         * Store tokens securely in HTTP-only cookies.
         */
      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        "Invalid username or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
    <PageHero
            title={"Agent Login"}
            backgroundImage={''}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Agent Login" },
            ]}
          />
    
    <section className="section">
        <div className="container">
      <div className="row justify-content-center">

        <div className="col-lg-5">

          <div className="card p-4">

            <h2 className="mb-4 text-center">
              Agent Login
            </h2>

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
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  required
                />

              </div>

              {/* Password */}
              <div className="mb-3">

                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

              </div>

              {/* Submit */}
              <div className="text-center mt-4">

                <button
                  type="submit"
                  className="btn btn-primary text-white py-3 px-5"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
</div>
    </section>
    </>
  );
}