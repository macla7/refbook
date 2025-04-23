"use client";

import Link from "next/link";
import { AuthUser, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu
import Image from "next/image";
import logo from "assets/rango2.svg";

const navItems = {
  "/": { name: "Home" },
  "/users": { name: "People" },
  "/auth": { name: "Auth" },
};

export function Navbar() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsActive(true);
          setUser(currentUser);
        }
      } catch (error) {
        setIsActive(false);
      }
    }
    checkUser();
  }, [router]);

  function handleClick() {
    if (!isActive) {
      router.push("/auth");
    } else {
      signOut();
      router.push("/");
    }
  }

  return (
    <nav className="flex h-full justify-between items-center px-6 py-4 z-10 ">
      {/* Left Logo Section */}
      <div className="flex items-center">
        {/* <h1 className="px-4 py-2 text-6xl font-bold text-black whitespace-nowrap">
          (&nbsp;&nbsp;) (&nbsp;&nbsp;)
        </h1>

        <h1 className="pr-4 pb-2 py-4 text-6xl font-bold text-black">Rango</h1> */}
        <Image src={logo} alt="Default Profile" width={250} />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex flex-row items-center space-x-4">
        <form className="">
          <div className="relative w-xs">
            <input
              type="search"
              className="p-4 w-full border-none text-sm text-gray-900 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:border-white"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>

        {Object.entries(navItems).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="rounded-md bg-black text-white px-4 py-3 text-lg font-semibold hover:bg-gray-800 transition"
          >
            {name}
          </Link>
        ))}

        <button
          onClick={handleClick}
          className="rounded-md bg-black text-white px-4 py-3 text-lg font-semibold hover:bg-gray-800 transition whitespace-nowrap"
        >
          {isActive ? "Sign Out" : "Log In"}
        </button>

        <div className="w-20 h-20">
          <DP />
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="xl:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md xl:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="text-lg font-semibold text-black hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            <button
              onClick={handleClick}
              className="w-full py-2 px-4 text-center text-lg font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
            >
              {isActive ? "Sign Out" : "Log In"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
