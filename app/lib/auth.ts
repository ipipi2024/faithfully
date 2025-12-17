import { auth } from "@/auth";

export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}

export async function requireAuth() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error("Unauthorized");
  }

  return true;
}
