"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";

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
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        User Profile
      </h2>
      <div className="flex flex-col space-y-1 mb-4">
        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
          <p className="w-[100px] tabular-nums">{user.email}</p>
          <p className=" tracking-tight">{user.id}</p>
        </div>
      </div>

      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Testimonials Form here
      </h2>
      <TestimonialForm subjectUserId={userId} subjectUserEmail={user.email} />
    </>
  );
}
