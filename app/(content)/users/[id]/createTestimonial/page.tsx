"use client";

import { useState, useEffect } from "react";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";
import { useRouter } from "next/navigation";
import { AuthUser, getCurrentUser } from "@aws-amplify/auth";
import { useSearch } from "app/context/SearchContext";

export default function Page({ params }: { params: { id: string } }) {
  const userId: string = params.id;
  const router = useRouter(); // Next.js router for navigation

  const [user, setUser] = useState<AuthUser | User>();
  const { search, setSearch } = useSearch();

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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    router.refresh();
  }, [router]);

  async function fetchData() {
    setUser(await getUser(userId));
  }

  return (
    <div className="w-full p-8 bg-ourCream flex justify-center">
      <TestimonialForm subjectUserId={userId} />
    </div>
  );
}
