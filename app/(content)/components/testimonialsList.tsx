import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";
import { getTestimonials, deleteTestimonial } from "app/api/testimonials";

export function TestimonialsList(params: { subjectUserId: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setTestimonials(await getTestimonials(session, params.subjectUserId));
  }

  async function deleteAction(id) {
    const session = await fetchAuthSession();
    await deleteTestimonial(session, id);
    fetchData();
  }

  return (
    <ul>
      {testimonials.map((testimonal) => (
        <li key={testimonal.id}>
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/testimonial/}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="w-[50px] tabular-nums">
                By: {testimonal.authorName}
              </p>
              <p className=" tracking-tight">{testimonal.message}</p>
            </div>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => deleteAction(testimonal.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
