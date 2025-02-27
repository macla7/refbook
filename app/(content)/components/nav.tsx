"use client";

import Link from "next/link";
import { AuthUser, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState } from "react";

const navItems = {
  "/": {
    name: "Home",
  },
  "/auth": {
    name: "Auth",
  },
};

export function Navbar() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsActive(true);
        }
      } catch (error) {
        setIsActive(false);
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  function handleClick() {
    if (!isActive) {
      router.push("/auth");
    } else {
      signOut();
      router.push("/");
    }
  }

  return (
    <nav
      className="flex h-full flex-row justify-between items-center mx-3 "
      id="nav"
    >
      <h1 className=" px-4 py-2 text-7xl font-bold rounded-full text-black  ">
        (&nbsp;&nbsp;) (&nbsp;&nbsp;) Champ Stamp
      </h1>
      <div className="flex flex-row items-center">
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              className="mx-1 rounded-sm bg-our-nav px-6 py-3 my-2 text-lg font-semibold  hover:bg-our-sec focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              key={path}
              href={path}
            >
              {name}
            </Link>
          );
        })}
        <div className="w-20 h-20">
          {" "}
          <DP />
        </div>

        <button
          type="button"
          className="mx-1 rounded-sm bg-our-nav px-6 py-3 my-2 text-lg font-semibold  hover:bg-our-sec focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleClick}
        >
          {isActive ? "Sign Out" : "Log In"}
        </button>
      </div>
    </nav>
  );
}
