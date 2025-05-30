import { Testimonial } from "app/types";
import { useState } from "react";
import { DP } from "./dp";
import { fetchAuthSession } from "aws-amplify/auth";
import { deleteTestimonial } from "app/api/testimonials";
import Image from "next/image";
import InBug from "assets/in-logo/LI-In-Bug.png";
import { userDefault } from "app/defaults/user";
export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function deleteAction(id) {
    const session = await fetchAuthSession();
    await deleteTestimonial(session, id);
    setIsOpen(true);
  }

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col md:flex-row items-center border bg-white border-gray-100 rounded-sm hover:bg-gray-100 lg:h-[200px] lg:w-[400px] overflow-hidden shadow-lg"
      >
        {/* SVG Container - 1/3 width */}
        <div className="flex-[1] flex flex-col items-center justify-center p-2 w-full">
          <div className="w-20 h-20">
            <DP user={userDefault} />
          </div>
          <p className="text-xs font-medium text-gray-700 w-full text-center">
            {testimonial.authorName}, {testimonial.authorConnection}
          </p>
          <p className="text-xs font-medium text-gray-700 w-full text-center">
            {testimonial.authorPostion} at {testimonial.authorWorkplace}
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
          <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-10">
            {testimonial.message}
          </p>
        </div>
      </button>

      {/* Modal Component */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30 ">
          <div className="p-4 w-full max-w-2xl lg:h-[200px] lg:w-[400px] bg-white rounded-sm">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <button
                type="button"
                className="rounded-sm bg-our-pink px-3 py-2 text-sm font-semibold shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => deleteAction(testimonial.id)}
              >
                delete
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center ">
              <div className="flex-[1] flex flex-col w-20 h-20 items-center justify-center">
                <DP user={userDefault} />
                <p className="text-xs font-medium text-gray-700 w-full text-center">
                  {testimonial.authorName}, {testimonial.authorConnection}
                </p>
                <p className="text-xs font-medium text-gray-700 w-full text-center">
                  {testimonial.authorPostion} at {testimonial.authorWorkplace}
                </p>
                {/* <div className="flex items-center p-4 md:p-5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close
                </button>
              </div> */}
              </div>
              <p className=" flex-[2] flex flex-col justify-between p-2 leading-normal w-full text-xs text-gray-700 dark:text-gray-400">
                {testimonial.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
