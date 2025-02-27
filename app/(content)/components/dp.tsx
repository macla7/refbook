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
    <div className={"w-full h-full rounded-full overflow-hidden border-transparent bg-egBlue"}>
      {/* <Image
          src={defaultImage}
          alt="Default Profile"
          width={80}
          height={80}
          className="object-cover rounded-full"
        /> */}

      <div className=" w-full h-full bg-[radial-gradient(circle_farthest-corner_at_center,var(--tw-gradient-from),var(--tw-gradient-to))] from-blue-500 to-purple-500 animate-pulse"></div>
    </div>
  );
}
