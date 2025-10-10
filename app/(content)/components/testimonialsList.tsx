import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";
import { getTestimonials } from "app/api/testimonials";
import TestimonialCard from "./testimonialCard";
import ShareWithFriends from "./shareWithFriends";
import { AuthUser, getCurrentUser } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";

export function TestimonialsList(params: { subjectUserId: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<AuthUser>();
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user is: ", currentUser);
        setLoggedInUser(currentUser);
      } catch (error) {
        // console.log("User not authenticated");
        // router.push("/"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]);

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
      {testimonials.length === 0 ? (
        loggedInUser?.userId == params.subjectUserId ? (
          <div className="relative flex justify-center items-center h-full w-full ">
            <ShareWithFriends />
          </div>
        ) : (
          <div className="relative flex justify-center items-center h-full w-full ">
            <div className="flex bg-white border-1 border-gray-200 rounded-sm flex-col items-center justify-center space-y-4 p-6 md:p-8 m-8">
              <p className="text-center">
                Have you worked with this person? Consider leaving them their
                first reference!
              </p>
              <div className="relative flex justify-center items-center h-full w-full ">
                <Link
                  href={`/users/${params.subjectUserId}/createTestimonial`}
                  className="cursor-pointer rounded-full bg-ourPurple px-6 text-lg font-semibold transition h-12 flex items-center justify-center "
                >
                  <span className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
                    Write Reference
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
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
                  className={`flex justify-center items-center overflow-hidden ${
                    wide ? "lg:col-span-2" : "lg:col-span-1"
                  } ${
                    high ? "lg:row-span-2" : "lg:row-span-1"
                  } col-span-1 row-span-1`}
                >
                  <div className="w-full h-full overflow-hidden flex">
                    <TestimonialCard testimonial={t} tall={high} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
