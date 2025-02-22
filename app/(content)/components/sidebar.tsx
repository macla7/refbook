"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { User } from "app/types";
import Image from "next/image";
import defaultImage from "app/assets/default-image-2.png";

export function Sidebar({ user }: { user: User }) {
  // const router = useRouter();
  return (
    <aside className="grid justify-items-center">
      <div className="mt-8 w-64 h-64 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-our-pink via-our-gold to-our-pink ">
        <Image
          src={defaultImage}
          alt="Default Profile"
          width={256} // Adjust width/height as per your needs
          height={256}
          className="object-cover"
        />
      </div>

      <h2 className="mt-8 text-2xl/7 font-bold text-gray-900 ">{user.name}</h2>
      <Link
        className="rounded-md bg-our-gold px-3 py-2 my-2 text-sm font-semibold shadow-xs hover:bg-our-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        href={`/users/${user.id}/createTestimonial`}
      >
        Create Testimonial
      </Link>
    </aside>
  );
}
