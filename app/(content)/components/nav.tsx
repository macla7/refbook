"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { DP } from "./dp";

const navItems = {
  "/": {
    name: "Home",
  },
  "/auth": {
    name: "Auth",
  },
};

export function Navbar() {
  // const router = useRouter();
  return (
    <nav
      className="flex h-full flex-row justify-between items-center mx-3"
      id="nav"
    >
      <h1 className=" px-4 py-2 text-7xl font-bold rounded-full bg-our-gold text-our-pink  ">
        Champ Stamp
      </h1>
      <div className="flex flex-row items-center">
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              className="mx-1 rounded-md bg-our-cyan px-6 py-3 my-2 text-lg font-semibold  hover:bg-our-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              key={path}
              href={path}
            >
              {name}
            </Link>
          );
        })}
        <DP />
        {/* <button
          onClick={() => {
            signOut();
            // router.push("auth");
          }}
        >
          Sign Out here baby
        </button> */}
      </div>
    </nav>
  );
}
