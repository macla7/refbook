"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "../components/usersList";
import { AuthUser } from "aws-amplify/auth";
import Image from "next/image";
import background from "assets/iStock-2163734002-2.svg";
import { userDefault } from "app/defaults/user";
import { User } from "app/types";

export default function usersPage() {
  const [user, setUser] = useState<AuthUser | User>();
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user is: ", currentUser);
        setUser(currentUser);
      } catch (error) {
        console.log("User not authenticated");
        setUser(userDefault);
        // router.push("/"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  return (
    <section className="p-8 grow bg-white relative">
      <Image
        alt="Mountains"
        src={background}
        quality={100}
        fill
        style={{
          margin: 0,
          objectFit: "cover",
          padding: "0",
        }}
      />
      {user ? (
        <div className="relative">
          <UsersList />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
