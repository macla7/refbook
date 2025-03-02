"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { User } from "app/types";
import Image from "next/image";
import defaultImage from "app/assets/default-image-2.png";
import { DP } from "./dp";

export function Sidebar({ user }: { user: User }) {
  // const router = useRouter();

  console.log("user isss!!!!");
  console.log(user);
  return (
    <aside className="grid justify-items-center">
      <div className="mt-8 w-64 h-64 rounded-full overflow-hidden border-transparent ">
        {/* <Image
          src={defaultImage}
          alt="Default Profile"
          width={256} // Adjust width/height as per your needs
          height={256}
          className="object-cover"
        /> */}
        <DP />
      </div>

      <h2 className="mt-8 text-2xl/7 font-bold text-gray-900 ">{user.name}</h2>
      <Link
        className="rounded-sm bg-ourGold px-3 py-2 my-2 text-sm font-semibold shadow-xs  
        hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        href={`/users/${user.id}/createTestimonial`}
      >
        Create Testimonial
      </Link>
      <div>
        <p className="p-14">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem."
        </p>
        <p className="px-14">
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?"
        </p>
      </div>
    </aside>
  );
}
