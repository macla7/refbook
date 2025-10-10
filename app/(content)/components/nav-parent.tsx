"use client";

import { AuthUser, getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";
import DesktopNav from "./desktop-nav";
import PhoneNav from "./phone-nav";

export function NavParent() {
  const [dbUser, setDBUser] = useState<User>(userDefault);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const [desktopHamburgerMenu, setDesktopHamburgerMenu] = useState({});
  const [phoneHamburgerMenu, setPhoneHamburgerMenu] = useState({});

  useEffect(() => {
    refreshUser();
  }, [router]);

  async function refreshUser() {
    try {
      const currentAuthUser = await getCurrentUser();
      setDBUser(await getUser(currentAuthUser.userId));
      setIsActive(true);
      setDesktopHamburgerMenu(({
        [`/users/${currentAuthUser?.userId}/profile`]: { name: "My Profile" },
        [`/users/${currentAuthUser?.userId}/account`]: { name: "Account Settings" },
      }));
      setPhoneHamburgerMenu(({
        ["/about_us"]: { name: "About Us" },
        ["/users"]: { name: "People" },
        [`/users/${currentAuthUser?.userId}/profile`]: { name: "My Profile" },
        [`/users/${currentAuthUser?.userId}/account`]: { name: "Account Settings" },

      }));
    } catch (error) {
      setIsActive(false);
      setDesktopHamburgerMenu(({
      }));
      setPhoneHamburgerMenu(({
        ["/about_us"]: { name: "About Us" },
        ["/users"]: { name: "People" },
      }));
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
    <>
      <nav className="hidden md:block col-span-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <DesktopNav
          dbUser={dbUser}
          isActive={isActive}
          desktopHamburgerMenu={desktopHamburgerMenu}
          handleClick={handleClick}
        />              </nav>

      {/* Mobile: PhoneNavbar stuck to bottom */}
      <nav className="md:hidden col-span-4 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
        <PhoneNav
          dbUser={dbUser}
          isActive={isActive}
          phoneHamburgerMenu={phoneHamburgerMenu}
          handleClick={handleClick}
        />
      </nav>
    </>
  );
}


