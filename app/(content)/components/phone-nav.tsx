"use client";

import Link from "next/link";
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu
import Image from "next/image";
import logo from "assets/rango3.svg";
import { useSearch } from "app/context/SearchContext";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";

export function PhoneNavbar() {
  const [dbUser, setDBUser] = useState<User>(userDefault);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
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
      // Check if user is logged in
      const session = await fetchAuthSession();
      const currentAuthUser = await getCurrentUser();
      setIsActive(true);
      setNavItems((prev) => ({
        ...prev,
        [`/users/${currentAuthUser.userId}/profile`]: { name: "My Profile" },
        ["/users"]: { name: "People" },
      }));
      // Check if they exist in the db meaningfully
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
    console.log(dbUser);
    console.log("THIS IS THE DB USER NAME: " + dbUserName);
    if (dbUserName == undefined) {
      router.push("/auth/createUser");
    }
  }, [dbUser]);

  async function handleClick() {
    if (!isActive) {
      router.push("/auth");
    } else {
      await signOut();
      await refreshUser(); // re-check after signout

      router.push("/");
    }
  }

  return (
    <nav className="flex h-full items-center px-3 py-4 z-10">
      <div className="flex items-center justify-between w-full gap-3">
        <Link key={"/"} href={"/"}>
          <Image src={logo} alt="Default Profile" width={80} />
        </Link>

        {/* Navigation - force row on all screen sizes */}
        <div className="flex">
          <form
            className="flex-shrink-0"
            onSubmit={(e) => {
              e.preventDefault(); // prevent full page reload
              router.push("/users"); // navigate to users page
            }}
          >
            <div className="relative xl:w-xs w-48">
              <input
                type="search"
                className="p-2 w-full border-1 border-solid border-gray-200 text-xs text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-ourBrown"
                placeholder="Search people"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                className="absolute top-0 end-0 p-2.5 text-xs font-medium h-full text-ourBrown  rounded-e-sm border-1 border-solid border-gray-200"
                key={"/users"}
                href={"/users"}
              >
                <svg
                  className="w-6 h-3"
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

          {/*
            Wrap the trigger + menu in a focus container and use onBlur to
            close the menu when focus moves outside. This avoids adding
            document-level event listeners.
          */}
          <div
            className="relative"
            onBlur={(e) => {
              // relatedTarget is the element receiving focus
              const related = (e as React.FocusEvent)
                .relatedTarget as Node | null;
              // if focus moved outside the current container, close the menu
              if (
                !related ||
                !(e.currentTarget as HTMLElement).contains(related)
              ) {
                setIsMenuOpen(false);
              }
            }}
          >
            {/* full-screen transparent overlay to catch touch/click-away on mobile */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onMouseDown={() => setIsMenuOpen(false)}
                onTouchStart={() => setIsMenuOpen(false)}
              />
            )}
            {/* DP as the hamburger/menu trigger */}
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
              className="flex items-center p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ourBrown ml-2"
            >
              {isActive ? (
                <div className="w-7 h-7">
                  <DP user={dbUser} />
                </div>
              ) : (
                <Menu className="w-7 h-7 text-ourBrown" />
              )}
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <nav className="flex flex-col py-2">
                  {Object.entries(navItems).map(([path, { name }]) => (
                    <Link
                      key={path}
                      href={path}
                      className="px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}

                  <button
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await handleClick();
                    }}
                    className="text-left px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                  >
                    {isActive ? "Sign Out" : "Log In"}
                  </button>

                  {dbUser.id !== "unknown" ? (
                    <Link
                      href={`/users/${dbUser.id}/account`}
                      className="px-4 py-2 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-ourBrown">Account</span>
                      </div>
                    </Link>
                  ) : null}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
