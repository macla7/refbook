"use client";

import Link from "next/link";
import { User } from "app/types";
import { DP } from "./dp";

export function Sidebar({ user }: { user: User }) {
  // const router = useRouter();

  console.log("user isss!!!!");
  console.log(user);
  return (
    <aside className="grid justify-items-center">
      <div className="mt-8 w-64 h-64 rounded-full overflow-hidden border-transparent">
        {/* <Image
          src={defaultImage}
          alt="Default Profile"
          width={256} // Adjust width/height as per your needs
          height={256}
          className="object-cover"
        /> */}
        <DP user={user} />
      </div>

      <h2 className="mt-8 text-2xl/7 font-bold text-gray-900 ">{user.name}</h2>

      <Link
        href={`/users/${user.id}/createTestimonial`}
        className="cursor-pointer rounded-full bg-purple-500 px-6 my-2 text-lg font-semibold transition h-12 flex items-center justify-center "
      >
        <span className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
          Make Testimonial
        </span>
      </Link>

      <div>
        <p className="p-14">
          {user.bio || "No bio available."}
        </p>
      </div>
    </aside>
  );
}
