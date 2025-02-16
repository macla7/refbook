"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "./components/usersList";
import { AuthUser } from "aws-amplify/auth";
import { TestimonialsList } from "./components/testimonialsList";

// *** This is the root / landing page ! ***
export default function rootPage() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user is: ", currentUser);
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
      {user ? (
        <div>
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Users List here
          </h2>
          <UsersList />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
