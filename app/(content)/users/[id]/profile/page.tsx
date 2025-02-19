"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import Link from "next/link";
import { Sidebar } from "app/(content)/components/sidebar";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const userId: string = params.id;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setUser(await getUser(session, userId));
  }

  return (
    <div className="grid grid-cols-4 gap-4 grow ">
      <div className="col-span-3 justify-items-center bg-our-bone">
        <h3 className="my-4 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Testimonials
        </h3>

        <TestimonialsList subjectUserId={userId} />
      </div>

      <div className="col-span-1 bg-our-blue">
        <Sidebar user={user} />
      </div>
    </div>
  );
}
