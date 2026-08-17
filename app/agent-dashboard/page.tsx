import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import Link from "next/link";
type LoggedInUser = {
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

export default async function AgentDashboard() {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("wp_auth_token")?.value;
  const userCookie = cookieStore.get("wp_user")?.value;

  /**
   * User is not logged in.
   */
  if (!authToken || !userCookie) {
    redirect("/login");
  }

  let user: LoggedInUser;

  try {
    user = JSON.parse(userCookie);
  } catch {
    redirect("/login");
  }

  /**
   * Check Agent role.
   */
  const isAgent = user.roles?.nodes?.some(
    (role) => role.name.toLowerCase() === "agent"
  );

  if (!isAgent) {
    redirect("/");
  }

  return (
    <>
    <PageHero
                title={"Agent Dashboard"}
                backgroundImage={''}
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Agent Dashboard" },
                ]}
              />
    <main className="section">
      <div className="container">

        <div className="row">

          <div className="col-12">

            <div className="mb-5">
              <h1>
                Agent Dashboard
              </h1>

              <p className="text-muted">
                Welcome back, {user.name}.
              </p>
            </div>

          </div>

        </div>

        <div className="row g-4">

          {/* Add Property */}
          <div className="col-md-4">

            <div className="card h-100 p-4">

              <h3 className="mb-3">
                Add Property
              </h3>

              <p>
                Add a new property to your listings.
              </p>

              <Link
                href="/agent-dashboard/properties/new"
                className="btn btn-primary"
              >
                Add Property
              </Link>

            </div>

          </div>

          {/* My Properties */}
          <div className="col-md-4">

            <div className="card h-100 p-4">

              <h3 className="mb-3">
                My Properties
              </h3>

              <p>
                View and manage your properties.
              </p>

              <Link
                href="/agent-dashboard/properties"
                className="btn btn-primary"
              >
                My Properties
              </Link>

            </div>

          </div>

          {/* Profile */}
          <div className="col-md-4">

            <div className="card h-100 p-4">

              <h3 className="mb-3">
                My Profile
              </h3>

              <p>
                Manage your agent profile information.
              </p>

              <Link
                href="/agent-dashboard/profile"
                className="btn btn-primary"
              >
                My Profile
              </Link>

            </div>

          </div>

        </div>

        {/* User Information */}

        <div className="row mt-5">

          <div className="col-lg-8">

            <div className="card p-4">

              <h3 className="mb-4">
                Account Information
              </h3>

              <div className="mb-3">
                <strong>Name:</strong>{" "}
                {user.name}
              </div>

              <div className="mb-3">
                <strong>Username:</strong>{" "}
                {user.username}
              </div>

              <div className="mb-3">
                <strong>Email:</strong>{" "}
                {user.email}
              </div>

              <div>
                <strong>Role:</strong>{" "}
                Agent
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
    </>
  );
}