"use client";

import Link from "next/link";
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { DP } from "./dp";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu
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
      <div className="hidden lg:flex flex-row items-center space-x-4">
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault(); // prevent full page reload
            router.push("/users"); // navigate to users page
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

        <button
          onClick={handleClick}
          className="cursor-pointer rounded-md bg-transparent text-ourBrown px-4 py-3 text-lg font-semibold transition"
        >
          <span className="relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
            {isActive ? "Sign Out" : "Log In"}
          </span>
        </button>

        {dbUser.id !== "unknown" ? (
          <div className="w-12 h-12">
            <Link href={`/users/${dbUser.id}/account`}>
              <DP user={dbUser} />
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
