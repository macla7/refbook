"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "./components/usersList";
import { AuthUser } from "aws-amplify/auth";
import { TestimonialsList } from "./components/testimonialsList";
import Link from "next/link";

// *** This is the root / landing page ! ***
export default function rootPage() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        router.push("/users");
      } catch (error) {

      }
    }

    checkUser();
  }, [router]); // Run once on mount


  return (
    <>
      <div>Landing Page</div>
    </>
  );
}
