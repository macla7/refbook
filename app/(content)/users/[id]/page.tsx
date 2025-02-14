"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const userId: string = params.id;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString();

      if (!jwtToken) {
        console.error("No authentication token found.");
        return;
      }

      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + `/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // ✅ Check if the response is OK (200-299 range)
      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      // ✅ Check if response has content before parsing JSON
      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server.");
      }

      const data = JSON.parse(text);
      setUser(data);
      console.log("response from server:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        User Profile
      </h2>
      <div className="flex flex-col space-y-1 mb-4">
        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
          <p className="w-[100px] tabular-nums">{user.email}</p>
          <p className=" tracking-tight">{user.id}</p>
        </div>
      </div>

      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Testimonials Form here
      </h2>
      <TestimonialForm subjectUserId={userId} subjectUserEmail={user.email} />
    </>
  );
}
