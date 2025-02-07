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
        "https://qf3cucadwb.execute-api.ap-southeast-2.amazonaws.com/testimonials",
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

  return (
    <ul>
      {testimonials.map((testimonal) => (
        <li key={testimonal.id}>
          <Link className="flex flex-col space-y-1 mb-4" href={`/blog/}`}>
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="w-[100px] tabular-nums">
                Author is: {testimonal.authorId}
              </p>
              <p className=" tracking-tight">
                About: {testimonal.subjectUserId}
              </p>
              <p className=" tracking-tight">{testimonal.message}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
