import { redirect } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getMyProperties } from "@/actions/property";

export default async function MyPropertiesPage() {
  let result;

  try {
    result = await getMyProperties();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "";

    /**
     * Access token expired.
     *
     * Redirect to the Route Handler which:
     * 1. Reads wp_refresh_token
     * 2. Gets a new JWT
     * 3. Updates wp_auth_token
     * 4. Redirects back to this page
     */
    if (
      message ===
      "JWT_ACCESS_TOKEN_EXPIRED"
    ) {
      redirect(
        "/api/auth/refresh?returnTo=/agent-dashboard/properties"
      );
    }

    throw error;
  }

  const properties =
    result.properties?.nodes ?? [];

 

  return (
    <>
      <PageHero
        title={"My Properties"}
        backgroundImage={""}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Agent Dashboard", href: "/agent-dashboard" },
          { label: "My Properties" },
        ]}
      />
    <main className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <h1>My Properties</h1>

          <p className="text-muted">
            Manage your submitted properties.
          </p>
        </div>

        <Link
          href="/agent-dashboard/properties/new"
          className="btn btn-primary"
        >
          Add New Property
        </Link>

      </div>

      {properties.length === 0 ? (

        <div className="text-center py-5">

          <h3>
            No properties found
          </h3>

          <p className="text-muted">
            You haven't submitted any
            properties yet.
          </p>

          <Link
            href="/agent-dashboard/properties/new"
            className="btn btn-primary"
          >
            Add Your First Property
          </Link>

        </div>

      ) : (

        <div className="row g-4">

          {properties.map(
            (property) => (

              <div
                key={
                  property.databaseId
                }
                className="col-md-6 col-lg-4"
              >

                <div className="card h-100">

                  {property
                    .featuredImage
                    ?.node
                    ?.sourceUrl && (

                    <img
                      src={
                        property
                          .featuredImage
                          .node
                          .sourceUrl
                      }
                      alt={
                        property
                          .featuredImage
                          .node
                          .altText ||
                        property.title
                      }
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit:
                          "cover",
                      }}
                    />

                  )}

                  <div className="card-body">

                    <h3 className="h5">
                      {property.title}
                    </h3>

                    <div className="mb-3">

                      <span
                        className={`badge ${
                          property.status ===
                          "publish"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {property.status}
                      </span>

                    </div>

                    {property.status ===
                      "publish" && (

                      <Link
                        href={`/property/${property.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Property
                      </Link>

                    )}

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </main>
    </>
  );
}