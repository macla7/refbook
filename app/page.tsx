"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { UsersList } from "./components/usersList";

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

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
        "https://qf3cucadwb.execute-api.ap-southeast-2.amazonaws.com/users",
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
        "https://qf3cucadwb.execute-api.ap-southeast-2.amazonaws.com/testimonials",
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
        "https://qf3cucadwb.execute-api.ap-southeast-2.amazonaws.com/testimonials",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            message: "This guy is a great guy!",
            subjectUserId: "123", // Example: ID of the person the testimonial is about
            AuthorId: userId, // ✅ Automatically assign the user's Cognito ID
          }),
        }
      );

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error making testimonial:", error);
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, []); // Run once on mount

  return (
    <section>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Just making some adjustments, WOOORK!!!!
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchData}
      >
        Fetch Users Data
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchTestimonials}
      >
        Fetch Testimonials Data
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={makeATestimonial}
      >
        Make a testimonal
      </button>
      <UsersList />
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
