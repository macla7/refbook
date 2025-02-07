"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { User } from "app/types";
import { AuthUser } from "aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export default function AuthPage() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter(); // Next.js router for navigation

  // If a login occurs, redirect to "/"
  Hub.listen("auth", (data) => {
    console.log(data);
    console.log("logginnnnnnnnnnnnnnnnng in");
    router.push("/");
  });

  // Check if a user is already logged in (before the login UI shows)...
  // So if authenticated user vists "/auth", this just redirects back to "/"
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          router.push("/"); // Redirect if already logged in
        }
      } catch (error) {
        console.log("No user logged in:");
      }
    };

    checkUser();
  }, [router]); // Runs once when the component mounts

  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => {
        return <div>Loading...</div>;
      }}
    </Authenticator>
  );
}
