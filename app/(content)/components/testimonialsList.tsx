import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";

export function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/testimonials",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      setTestimonials(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteTestimonial(id) {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
        `https://khgvbo341f.execute-api.ap-southeast-2.amazonaws.com/testimonials/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);
      fetchData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
              <p className=" tracking-tight">
                About: {testimonal.subjectUserId}
              </p>
              <p className=" tracking-tight">{testimonal.message}</p>
            </div>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => deleteTestimonial(testimonal.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
