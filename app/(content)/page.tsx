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

  return (
    <>
      <div className="flex items-center justify-left w-[100%] h-[100%]">
        <div className="w-[150px] h-full skew-x-12 bg-gradient-to-b from-ourGold to-ourGold2">
          {" "}
        </div>
        <div className="w-[150px] h-full skew-x-12 bg-gradient-to-b from-ourGold2 to-ourGold">
          {" "}
        </div>
        <div className="w-[150px] h-full skew-x-12 bg-gradient-to-b from-ourGold to-ourGold2">
          {" "}
        </div>
        <p className="text-6xl p-12">Landing Page</p>
      </div>
    </>
  );
}
