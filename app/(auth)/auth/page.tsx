"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export default function AuthPage() {
  const router = useRouter(); // Next.js router for navigation
  

  // If a login occurs, redirect to "/"
  Hub.listen("auth", (data) => {
    console.log("Auth event has occured, so redirecting to root.");
    
    router.push("/");
  });

  // Check if a user is already logged in (before the login UI shows)...
  // So if authenticated user vists "/auth", this just redirects back to "/"
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          console.log(currentUser);
          // router.push("/"); // Redirect if already logged in
        }
      } catch (error) {
        console.log("No user logged in:");
      }
    };

    checkUser();
  }, [router]); // Runs once when the component mounts

  return (
    <Authenticator
      socialProviders={["amazon", "apple", "facebook", "google"]}
      formFields={{
        signIn: {
          username: {
            label: "Email Address or Phone Number", // Change the label of the username field
            placeholder: "Enter your Email or Phone here",
          },
        },
        signUp: {
          username: {
            label: "Email Address or Phone Number", // Change the label of the username field
            placeholder: "Enter your Email or Phone here",
          },
        },
      }}
    >
      {({ signOut, user }) => {
        return <div>Loading...</div>;
      }}
    </Authenticator>
  );
}
