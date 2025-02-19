import { Testimonial } from "app/types";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <a
      href="#"
      className="flex flex-col md:flex-row items-center bg-white border border-white shadow-sm hover:bg-gray-100 h-[200px] w-[400px] overflow-hidden"
    >
      {/* SVG Container - Takes 1/3 width */}
      <div className="flex-[1] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-2 w-full">
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

      {/* Text Container - Takes 2/3 width */}
      <div className="flex-[2] flex flex-col justify-between p-2 leading-normal w-full">
        <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-10">
          {testimonial.message}
        </p>
      </div>
    </a>
  );
}
