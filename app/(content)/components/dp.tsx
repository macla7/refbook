"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { User } from "app/types";
import Image from "next/image";
import defaultImage from "app/assets/default-image-2.png";

export function DP() {
  // const router = useRouter();
  return (
    <div className="w-20 h-20 rounded-full overflow-hidden  border-transparent bg-gradient-to-r from-our-pink via-our-sec to-our-pink ">
      <div className="w-full h-full rounded-full bg-white">
        <Image
          src={defaultImage}
          alt="Default Profile"
          width={80}
          height={80}
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
}
