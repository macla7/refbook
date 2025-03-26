import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { User } from "app/types";
import { deleteUser, getUsers } from "app/api/users";
import Image from "next/image";
import { DP } from "./dp";
import InBug from "assets/in-logo/LI-In-Bug.png";

export default function UserCard({ user }: { user: User }) {
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-20 h-20 m-10">
          <DP />
        </div>

        <div className="flex flex-row p-2 leading-normal h-full gap-10 items-center">
          <div>
            <p className="text-xs font-medium text-gray-700 w-full text-center">
              {user.name}
            </p>
            <p className="text-xs font-medium text-gray-700 w-full text-center">
              {user.position} at {user.workplace}
            </p>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-10">
            bio goes here blah blah blah
          </p>
        </div>
      </div>
    </>
  );
}
