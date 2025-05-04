"use client";

import { useState, useEffect } from "react";
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
    setUser(await getUser(userId));
  }

  return (
    <div className="w-full p-8 bg-ourCream flex justify-center">
      <TestimonialForm subjectUserId={userId} />
    </div>
  );
}
