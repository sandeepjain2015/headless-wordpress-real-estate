import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PageHero from "@/components/PageHero";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("wp_user")?.value;

  console.log("User Cookie:", userCookie);

  // Already logged in
  if (userCookie) {
    redirect("/agent-dashboard");
  }

  return (
    <>
      <PageHero
        title="Agent Login"
        backgroundImage=""
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Login" },
        ]}
      />

      <main className="container py-5">
        <LoginForm />
      </main>
    </>
  );
}