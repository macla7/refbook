"use client";

import Link from "next/link";
import { DP } from "./dp";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "assets/rango3.svg";
import { useSearch } from "app/context/SearchContext";
import { User } from "app/types";
import { useRouter } from "next/navigation";


type MenuItems = Record<string, { name: string }>;

interface DesktopNavProps {
  dbUser: User;
  isActive: Boolean;
  desktopHamburgerMenu: MenuItems;
  handleClick: () => Promise<void>;
}

export default function DesktopNav({
  dbUser,
  isActive,
  desktopHamburgerMenu,
  handleClick,
}: DesktopNavProps) {
  const { search, setSearch } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const desktopNavbarItems = {
    "/about_us": { name: "About Us" },
    "/users": { name: "People" },
  };



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
            {Object.entries(desktopHamburgerMenu).map(([path, { name }]) => (
                    <Link
                      key={path}
                      href={path}
                      className="px-4 py-2 text-sm text-ourBrown hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
          </div>
        </div>

        {/* Right: Menu / DP */}
        <div
          className="relative flex-shrink-0"
          // close when focus leaves this container (covers keyboard & mouse focus moves)
          onBlur={(e) => {
            const related = (e as any).relatedTarget as Node | null;
            if (
              !related ||
              !(e.currentTarget as HTMLElement).contains(related)
            ) {
              setIsMenuOpen(false);
            }
          }}
        >
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden cursor-pointer"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={dbUser.id !== "unknown" ? "Open user menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {dbUser.id !== "unknown" ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <nav className="flex flex-col py-2">
                  {Object.entries(desktopHamburgerMenu).map(([path, { name }]) => (
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
              </nav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
