import { Testimonial } from "app/types";
import { useState } from "react";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col md:flex-row items-center bg-white border border-white shadow-sm hover:bg-gray-100 lg:h-[200px] lg:w-[400px] overflow-hidden"
      >
        {/* SVG Container - 1/3 width */}
        <div className="flex-[1] flex flex-col items-center justify-center bg-gray-100 p-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p className="text-xs font-medium text-gray-700 w-full text-center">
            {testimonial.authorName}
          </p>
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
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 ">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg">
            {/* Modal Body */}
            <div className="flex-[1] flex flex-col items-center justify-center bg-gray-100 p-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="text-xs font-medium text-gray-700 w-full text-center">
                {testimonial.authorName}
              </p>
            </div>

            {/* Text Container - 2/3 width */}
            <div className="flex-[2] flex flex-col justify-between p-2 leading-normal w-full">
              <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-10">
                {testimonial.message}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
