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
      <div className="flex-[1] flex flex-col items-center justify-center p-2 w-full">
        <div className="w-20 h-20">
          <DP />
        </div>
        <p className="text-xs font-medium text-gray-700 w-full text-center">
          {user.name}
        </p>
        <p className="text-xs font-medium text-gray-700 w-full text-center">
          {user.postion} at workplace
        </p>
      </div>

      <div className="flex-[2] flex flex-col justify-between p-2 leading-normal w-full">
        <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-10">
          bio goes here blah blah blah
        </p>
      </div>
    </>
  );
}
