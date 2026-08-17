import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoggedInUser = {
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

export async function getLoggedInUser(): Promise<LoggedInUser> {
  const cookieStore = await cookies();

  const authToken =
    cookieStore.get("wp_auth_token")?.value;

  const userCookie =
    cookieStore.get("wp_user")?.value;

  if (!authToken || !userCookie) {
    redirect("/login");
  }

  try {
    return JSON.parse(userCookie) as LoggedInUser;
  } catch {
    redirect("/login");
  }
}

export async function requireAgent(): Promise<LoggedInUser> {
  const user = await getLoggedInUser();

  const isAgent = user.roles?.nodes?.some(
    (role) =>
      role.name.toLowerCase() === "agent"
  );

  if (!isAgent) {
    redirect("/");
  }

  return user;
}