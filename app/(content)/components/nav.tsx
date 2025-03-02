"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { DP } from "./dp";

const navItems = {
  "/": {
    name: "Home",
  },
  "/users": {
    name: "People",
  },
  "/auth": {
    name: "Auth",
  },
};

export function Navbar() {
  // const router = useRouter();
  return (
    <nav
      className="flex h-full flex-row justify-between items-center mx-3 "
      id="nav"
    >
      <div className="flex items-center h-full">
        <h1 className="px-4 py-2 text-6xl font-bold rounded-full text-black">
          (&nbsp;&nbsp;) (&nbsp;&nbsp;)
        </h1>
        <h1 className="px-4 pb-2 py-4 text-7xl font-bold rounded-full text-black">
          Rango
        </h1>
      </div>
      <div className="flex flex-row items-center">
        <form className="w-sm mr-8">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                className="p-4 w-full border-none z-20 text-sm text-gray-900 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:border-white"
                placeholder="Not working yet baby..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-e-md"
              >
                <svg
                  className="w-8 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              className="mr-8 rounded-md bg-black text-white px-6 py-3 my-2 text-lg font-semibold  hover:bg-our-sec focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
