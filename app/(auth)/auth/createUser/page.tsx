"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import { UserForm } from "app/(content)/components/userForm";

export default function Page() {
  const [userId, setUserId] = useState("");

  // Check if a user is already logged in (before the login UI shows)...
  // So if authenticated user vists "/auth", this just redirects back to "/"
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          console.log(currentUser);
          setUserId(currentUser.userId);
        }
      } catch (error) {
        console.log("No user logged in:");
      }
    };

    checkUser();
  }, []); // Runs once when the component mounts

  return (
    <div className="w-full p-8 bg-ourCream flex justify-center">
      <UserForm id={userId} />
    </div>
  );
}
