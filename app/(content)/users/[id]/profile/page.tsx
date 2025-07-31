"use client";

import { useState, useEffect } from "react";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import { Sidebar } from "app/(content)/components/sidebar";
import background from "assets/rangobg4.svg";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const userId: string = params.id;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setUser(await getUser(userId));
  }

  return (
    <div className="grid grid-cols-4 grow mx-0 ">
      <div className="col-span-3 justify-items-center rounded-sm bg-white relative">
        <Image
          alt="Mountains"
          src={background}
          quality={100}
          fill
          style={{
            margin: 0,
            objectFit: "cover",
            padding: "0",
          }}
        />

        <TestimonialsList subjectUserId={userId} />
      </div>

      <div className="col-span-1 bg-our-sidebar rounded-sm border-l-1 border-solid border-gray-200">
        <Sidebar user={user} />
      </div>
    </div>
  );
}
