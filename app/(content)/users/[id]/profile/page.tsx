"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import Link from "next/link";

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
    <>
      <div className="my-4 flex-col justify-center justify-items-center content-center">
        <h2 className="my-4 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {user.name}
        </h2>
        <Link
          className="rounded-md bg-indigo-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href={`/users/${user.id}/profile/createTestimonial`}
        >
          Create Testimonial
        </Link>
      </div>

      <div className="flex flex-col space-y-1 mb-4">
        <div className="w-full">
          <p className="w-[100px] tabular-nums">{user.email}</p>
        </div>
      </div>

      <h3 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
        Testimonials
      </h3>
      <TestimonialsList subjectUserId={userId} />
    </>
  );
}
