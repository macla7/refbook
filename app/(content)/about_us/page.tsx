"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "../components/usersList";
import { AuthUser } from "aws-amplify/auth";
import Image from "next/image";
import background from "assets/iStock-2163734002-2.svg";

export default function usersPage() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter(); // Next.js router for navigation

  return (
    <section className="p-8 grow bg-white relative">
      <Image
        alt="Mountains"
        src={background}
        quality={100}
        fill
        style={{
          margin: 0,
          objectFit: "cover",
          padding: "0",
        }}
      />
    </section>
  );
}
