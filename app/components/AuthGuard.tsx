import { redirect } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import RequireAuth from "./RequireAuth";

export default async function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await fetchAuthSession();
    if (!session.tokens?.accessToken) {
      redirect("/auth"); // Redirect if not logged in
    }
  } catch (error) {
    console.error("Server-side auth check failed:", error);
    redirect("/auth");
  }

  return <RequireAuth>{children}</RequireAuth>; // Only wraps client-safe parts
}
