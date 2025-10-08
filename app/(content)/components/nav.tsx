"use client";

import Link from "next/link";
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "assets/rango3.svg";
import { useSearch } from "app/context/SearchContext";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";

export function Navbar() {
  const [dbUser, setDBUser] = useState<User>(userDefault);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState({
    "/about_us": { name: "About Us" },
    ["/users"]: { name: "People" },
  });
  const { search, setSearch } = useSearch();

  useEffect(() => {
    refreshUser();
  }, [router]);

  async function refreshUser() {
    try {
      const session = await fetchAuthSession();
      const currentAuthUser = await getCurrentUser();
      setIsActive(true);
      setNavItems((prev) => ({
        ...prev,
        ["/users"]: { name: "People" },
      }));
      setDBUser(await getUser(currentAuthUser.userId));
    } catch (error) {
      setIsActive(false);
      setNavItems({
        "/about_us": { name: "About Us" },
        ["/users"]: { name: "People" },
      });
      setDBUser(userDefault);
    }
  }

  useEffect(() => {
    let dbUserName = dbUser.name;
    if (dbUserName == undefined) {
      router.push("/auth/createUser");
    }
  }, [dbUser]);

  async function handleClick() {
    if (!isActive) {
      router.push("/auth");
    } else {
      await signOut();
      await refreshUser();
      router.push("/");
    }
  }

  return (
    <nav className="flex h-full items-center px-6 py-4 z-10">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <div className="flex items-center">
            <Link key={"/"} href={"/"}>
            <Image
              src={logo}
              alt="Default Profile"
              className="lg:w-[150px] md:w-[125px]"
            />
            </Link>
        </div>

        {/* Center: Search + Nav items (will grow to fill available space) */}
        <div className="flex items-center flex-1 justify-center space-x-8">
          <form
            className="flex-shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/users");
            }}
          >
            <div className="relative xl:w-xs w-2xs">
              <input
                type="search"
                className="p-2 w-full border-1 border-solid border-gray-200 text-sm text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-ourBrown"
                placeholder="Search people"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-ourBrown rounded-e-sm border-1 border-solid border-gray-200"
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

          <div className="flex items-center space-x-6">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="rounded-md bg-transparent text-ourBrown xl:px-4 px-2 py-3 text-lg font-semibold transition"
              >
                <span className="relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Menu / DP */}
        <div className="relative flex-shrink-0">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isActive ? "Open user menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isActive ? (
              <DP user={dbUser} />
            ) : (
              <svg
                className="w-6 h-6 text-ourBrown"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <nav className="flex flex-col py-2">
                {dbUser.id !== "unknown" && (
                  <Link
                    href={`/users/${dbUser.id}/profile`}
                    className="px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
                {dbUser.id !== "unknown" && (
                  <Link
                    href={`/users/${dbUser.id}/account`}
                    className="px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                )}
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleClick();
                  }}
                  className="text-left px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                >
                  {isActive ? "Sign Out" : "Log In"}
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
