"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { User } from "app/types";
import Image from "next/image";
import defaultImage from "app/assets/default-image.jpeg";

export function Sidebar({ user }: { user: User }) {
  // const router = useRouter();
  return (
    <aside className="grid justify-items-center">
      <div className="mt-8 w-32 h-32 rounded-full overflow-hidden border border-gray-300">
        <Image
          src={defaultImage}
          alt="Default Profile"
          width={128} // Adjust width/height as per your needs
          height={128}
          className="object-cover"
        />
      </div>

      <h2 className="mt-8 text-2xl/7 font-bold text-gray-900 ">{user.name}</h2>
      <Link
        className="rounded-md bg-indigo-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        href={`/users/${user.id}/createTestimonial`}
      >
        Create Testimonial
      </Link>
    </aside>
  );
}
