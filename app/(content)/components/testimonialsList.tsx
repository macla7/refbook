import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";
import { getTestimonials } from "app/api/testimonials";
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
    <>
      <ul className="relative grid lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] md:grid-cols-1 gap-10 p-20 w-full">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="flex justify-center items-center">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </>
  );
}
