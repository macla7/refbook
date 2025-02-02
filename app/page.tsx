"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

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

  useEffect(() => {
    fetchData();
  }, []); // Run once on mount

  return (
    <section>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Just making some adjustments, WOOORK!!!!
      </h1>
      <button onClick={fetchData}>Fetch Protected Data</button>;
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
