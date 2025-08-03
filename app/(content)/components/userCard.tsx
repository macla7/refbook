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
    <div className="flex flex-row items-center">
      {/* DP stays fixed */}
      <div className="w-20 h-20 m-10 flex-shrink-0">
        <DP user={user} />
      </div>

      {/* Text container can shrink */}
      <div className="flex flex-row p-2 leading-normal h-full gap-10 items-center flex-1 min-w-0">
        {/* Name + Position don’t shrink */}
        <div className="flex-shrink-0">
          <p className="text-xs font-medium text-gray-700 w-64">{user.name}</p>
          <p className="text-xs font-medium text-gray-700 w-64">
            {user.position} at {user.workplace}
          </p>
        </div>

        {/* Bio wraps, then clamps when too tall */}
        <p
          className="text-xs text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "8", // roughly how many lines before truncating
            maxHeight: "80%", // ensures it doesn’t overflow parent
          }}
        >
          {user.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
}
