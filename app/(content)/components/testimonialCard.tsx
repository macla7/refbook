import { Testimonial, User } from "app/types";
import { useEffect, useState } from "react";
import { DP } from "./dp";
import { fetchAuthSession } from "aws-amplify/auth";
import { deleteTestimonial } from "app/api/testimonials";
import Image from "next/image";
import InBug from "assets/in-logo/LI-In-Bug.png";
import { userDefault } from "app/defaults/user";
import Link from "next/link";
import { getUser } from "app/api/users";
import { useRouter } from "next/navigation";
import { Default } from "@aws-amplify/ui-react/dist/types/primitives/DropZone/DropZoneChildren";
export default function TestimonialCard({
  testimonial,
  fakeUser,
}: {
  testimonial: Testimonial;
  fakeUser?: User;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authorUser, setAuthorUser] = useState<User | any>(userDefault);
  const router = useRouter(); // Next.js router for navigation

  async function deleteAction(id) {
    const session = await fetchAuthSession();
    await deleteTestimonial(session, id);
    setIsOpen(true);
  }

  async function getAuthorUser() {
    try {
      setAuthorUser(await getUser(testimonial.authorId));
    } catch (error) {
      console.log("Could not get author user:", error);
    }
  }

  useEffect(() => {
    if (fakeUser === undefined) {
      getAuthorUser();
    } else {
      setAuthorUser(fakeUser);
    }
  }, [router]); // Run once on mount

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col md:flex-row items-center border bg-white border-1 border-gray-200 rounded-sm lg:h-[200px] lg:w-[400px] overflow-hidden shadow-lg hover:bg-ourLightBrown transition-all duration-300 ease-in-out cursor-pointer"
      >
        {/* SVG Container - 1/3 width */}
        <div className="flex-[1] flex flex-col items-center justify-center w-full h-full ">
          <div className="w-20 h-20">
            <DP user={authorUser} />
          </div>
          <p className="text-xs font-medium text-ourBrown w-full text-center padding-2">
            {authorUser.name},
          </p>
          <p className="text-xs font-medium text-ourBrown w-full text-center padding-2">
            {authorUser.position} at {authorUser.workplace}
          </p>
          {/* <a
            href="https://www.linkedin.com/in/mitchel-clark-b26a02229/"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start pl-2"
          >
            <Image
              src={InBug}
              alt="Background Image"
              priority
              style={{
                width: 32,
                height: "auto", // Auto for maintaining aspect ratio
              }}
            />
          </a> */}
        </div>

        {/* Text Container - 2/3 width */}
        <div className="flex-[2] flex flex-col justify-between p-2 leading-normal w-full">
          <p className="text-xs text-black dark:text-gray-400 line-clamp-10">
            {testimonial.message}
          </p>
        </div>
      </button>

      {/* Modal Component */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-ourBrown/30">
          {/* Modal card */}
          <div className="relative w-full p-2 rounded-lg max-w-2xl h-[50vh] bg-white flex flex-col overflow-hidden">
            {/* Floating Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute top-3 left-3 p-2 rounded-full bg-gray-50 hover:bg-gray-200 transition"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex-[1] flex flex-col items-center justify-center w-full h-full ">
                  <div className="w-20 h-20">
                    <DP user={authorUser} />
                  </div>
                  <p className="text-xs font-medium text-ourBrown w-full text-center padding-2">
                    {authorUser.name},
                  </p>
                  <p className="text-xs font-medium text-ourBrown w-full text-center padding-2">
                    {authorUser.position} at {authorUser.workplace}
                  </p>
                </div>

                <div className="flex-[2] w-full">
                  <p className="text-sm text-black dark:text-gray-400 whitespace-pre-line break-words">
                    {testimonial.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
