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
      <ul
        className="
    relative grid
    grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
    auto-rows-[200px]     /* 👈 sets baseline row size */
    grid-flow-dense gap-10
    2xl:p-20 xl:p-12 p-6 w-full
  "
      >
        {testimonials.map((t) => {
          const wide = (t.message?.length ?? 0) > 250; // tune threshold
          const high = (t.message?.length ?? 0) > 600; // tune threshold
          return (
            <li
              key={t.id}
              className="flex justify-center items-center"
              style={{
                gridColumnEnd: `span ${wide ? 2 : 1}`,
                gridRowEnd: `span ${high ? 2 : 1}`,
              }}
            >
              <TestimonialCard testimonial={t} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
