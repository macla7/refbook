"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { UsersList } from "../components/usersList";
import { AuthUser } from "aws-amplify/auth";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import { userDefault } from "app/defaults/user";
import { User } from "app/types";
import { useSearch } from "app/context/SearchContext";
import Link from "next/link";

export default function usersPage() {
  const [user, setUser] = useState<AuthUser | User>();
  const router = useRouter(); // Next.js router for navigation
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

      <div className="relative flex flex-col items-center w-1/2 justify-center w-full mb-4">
        <div className="w-1/2">
          <p className="text-4xl text-ourBrown font-bold ">People Search</p>
          <p className="relative text-xl text-ourBrown font-bold mb-4">
            Search for people by their name or company
          </p>

          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault(); // prevent full page reload
              router.push("/users"); // navigate to users page
            }}
          >
            <div className="relative w-xs bg-white">
              <input
                type="search"
                className="p-2 w-full border-1 border-solid border-gray-200 text-sm text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-ourBrown"
                placeholder="Search people"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-ourBrown  rounded-e-sm border-1 border-solid border-gray-200"
                key={"/users"}
                href={"/users"}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {user ? (
        <div className="relative ">
          <UsersList />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </section>
  );
}
