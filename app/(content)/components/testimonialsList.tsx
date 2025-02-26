import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";
import { getTestimonials, deleteTestimonial } from "app/api/testimonials";
import TestimonialCard from "./testimonialCard";

export function TestimonialsList(params: { subjectUserId: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setTestimonials(await getTestimonials(session, params.subjectUserId));
  }

  return (
    <ul className="grid lg:grid-cols-2 md:grid-cols-1 gap-10 p-20 place-content-center">
      {testimonials.map((testimonial) => (
        <li key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </li>
      ))}
    </ul>
  );
}
