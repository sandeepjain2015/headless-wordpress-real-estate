import { requireAgent } from "@/lib/auth";
import NewPropertyForm from "@/app/agent-dashboard/properties/NewPropertyForm";

import PageHero from "@/components/PageHero";
export default async function NewPropertyPage() {
  const user = await requireAgent();

  return (
    <>
      <PageHero
        title={"Add New Property"}
        backgroundImage={""}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Agent Dashboard", href: "/agent-dashboard" },
          { label: "Add New Property" },
        ]}
        />
    <NewPropertyForm
      user={user}
    />
    </>
  );

}