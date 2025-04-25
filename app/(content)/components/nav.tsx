"use client";

import Link from "next/link";
import { AuthUser, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu
import Image from "next/image";
import logo from "assets/rango3.svg";
import { useSearch } from "app/context/SearchContext";

export function Navbar() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [navItems, setNavItems] = useState({
    "/about_us": { name: "About Us" },
  });
  const { search, setSearch } = useSearch();

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsActive(true);
          setUser(currentUser);
          setNavItems((prev) => ({
            ...prev,
            [`/users/${currentUser.userId}/profile`]: { name: "My Profile" },
            ["/users"]: { name: "People" },
          }));
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
        <Link key={"/"} href={"/"}>
          <Image src={logo} alt="Default Profile" width={150} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex flex-row items-center space-x-4">
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault(); // prevent full page reload
            router.push("/users"); // navigate to users page
          }}
        >
          <div className="relative w-xs">
            <input
              type="search"
              className="p-2 w-full bg-ourCream border-1 border-solid border-gray-200 text-sm text-gray-900 bg-gray-50 rounded-sm focus:outline-none focus:ring-2 focus:ring-ourBrown"
              placeholder="Search people"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-ourBrown bg-ourCream rounded-e-sm border-1 border-solid border-gray-200"
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

        {Object.entries(navItems).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="rounded-md bg-transparent text-ourBrown px-4 py-3 text-lg font-semibold transition"
          >
            <span className="relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
              {name}
            </span>
          </Link>
        ))}

        <button
          onClick={handleClick}
          className="cursor-pointer rounded-md bg-transparent text-ourBrown px-4 py-3 text-lg font-semibold transition"
        >
          <span className="relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
            {isActive ? "Sign Out" : "Log In"}
          </span>
        </button>

        <div className="w-12 h-12">
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
