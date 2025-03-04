"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { TestimonialForm } from "app/(content)/components/testimonialForm";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";

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
    <div className="w-full p-8 bg-white">
      <div className="">
        <TestimonialForm subjectUserId={userId} subjectUserEmail={user.email} />
      </div>
    </div>
  );
}
