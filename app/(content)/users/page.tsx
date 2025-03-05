"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "../components/usersList";
import { AuthUser } from "aws-amplify/auth";

export default function usersPage() {
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
        router.push("/"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  return (
    <section className="p-8 grow bg-white ">
      {user ? (
        <div>
          <UsersList />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
