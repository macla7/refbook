"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { UsersList } from "./components/usersList";
import { TestimonialsList } from "./components/testimonialsList";
import { TestimonialForm } from "./components/testimonialForm";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user ISSSSSS: ", currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("User not authenticated, redirecting...");
        router.push("/auth"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchTestimonials() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/testimonials",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function makeATestimonial() {
    try {
      // 🔥 Fetch the authentication session
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString();

      if (!jwtToken) {
        console.error("No authentication token found.");
        return;
      }

      // 🔥 Decode the JWT Token to extract the Cognito User ID (sub)
      const tokenPayload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT payload
      const userId = tokenPayload.sub; // Cognito User ID (Unique ID for the user)

      console.log("User ID:", userId);
      console.log("JWT Token:", jwtToken);

      // 🔥 Send PUT request with AuthorId set to the user's Cognito ID
      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/testimonials",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            message: "This guy is a great guy!",
            subjectUserId: "123", // Example: ID of the person the testimonial is about
            authorId: userId, // ✅ Automatically assign the user's Cognito ID
          }),
        }
      );

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error making testimonial:", error);
    }
  }

  return (
    <section>
      {user ? (
        <div>
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Users List here
          </h2>
          <UsersList />
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Testimonials List here
          </h2>
          <TestimonialsList />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
