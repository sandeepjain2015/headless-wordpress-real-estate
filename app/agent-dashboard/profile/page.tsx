import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import Image from "next/image";
export default async function ProfilePage() {
  const cookieStore = await cookies();

  const userCookie =
    cookieStore.get("wp_user")?.value;

  if (!userCookie) {
    redirect("/login");
  }

  let user;

  try {
    user = JSON.parse(userCookie);
  } catch {
    redirect("/login");
  }

  const role =
    user.roles?.nodes?.find(
      (item: { name: string }) =>
        item.name === "agent"
    )?.name || "";

  if (role !== "agent") {
    redirect("/agent-dashboard");
  }

  return (
    <>
     <PageHero
        title="My Profile"
        backgroundImage={""}
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Agent Dashboard",
            href: "/agent-dashboard",
          },
          { label: "My Profile" },
        ]}
      />
    <main className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <h1>My Profile</h1>

          <p className="text-muted mb-0">
            View your agent account information.
          </p>
        </div>

        <Link
          href="/agent-dashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>

      </div>

      {/* Profile */}
      <div className="row">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h2 className="h4 mb-4">
                Account Information
              </h2>

              <div className="row g-4">

                {/* Name */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    Name
                  </label>

                  <div className="form-control bg-light">
                    {user.name || "—"}
                  </div>

                </div>

                {/* Username */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    Username
                  </label>

                  <div className="form-control bg-light">
                    {user.username || "—"}
                  </div>

                </div>

                {/* Email */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    Email
                  </label>

                  <div className="form-control bg-light">
                    {user.email || "—"}
                  </div>

                </div>

                {/* Role */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    Account Type
                  </label>

                  <div className="form-control bg-light">
                    Real Estate Agent
                  </div>

                </div>

                {/* User ID */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    User ID
                  </label>

                  <div className="form-control bg-light">
                    {user.databaseId || "—"}
                  </div>

                </div>

                {/* Status */}
                <div className="col-md-6">

                  <label className="form-label text-muted">
                    Status
                  </label>

                  <div className="form-control bg-light">
                    <span className="badge bg-success">
                      Approved
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Profile summary */}
        <div className="col-lg-4 mt-4 mt-lg-0">

          <div className="card border-0 shadow-sm">

            <div className="card-body text-center p-4">

              <div>
               <Image
                         src={user.avatar.url}
                         alt={user.name}
                         width={120}
                         height={120}
                         className="rounded-full"
                       />
              </div>

              <h3 className="h5 mb-1">
                {user.name}
              </h3>

              <p className="text-muted mb-3">
                Real Estate Agent
              </p>

              <span className="badge bg-success">
                Approved Agent
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
    </>
  );
}