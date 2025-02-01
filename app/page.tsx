"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("User not authenticated, redirecting...");
        router.push("/auth"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  return (
    <section>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Just making some adjustments, WOOORK!!!!
      </h1>

      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
