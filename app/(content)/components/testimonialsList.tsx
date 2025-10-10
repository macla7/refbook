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
    console.log("these are the testimonials:", testimonials);
  }

  return (
    <>
      <ul
        className="
          relative grid
          grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
          auto-rows-[200px] grid-flow-dense gap-6
          2xl:p-20 xl:p-12 p-4 w-full
        "
      >
        {testimonials.map((t) => {
          const wide = (t.message?.length ?? 0) > 150;
          const high = (t.message?.length ?? 0) > 600;
          return (
            <li
              key={t.id}
              className="flex justify-center items-center overflow-hidden"
              style={{
                gridColumnEnd: `span ${wide ? 2 : 1}`,
                gridRowEnd: `span ${high ? 2 : 1}`,
              }}
            >
              <div className="w-full h-full overflow-hidden flex">
                <TestimonialCard testimonial={t} tall={high} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
