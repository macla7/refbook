import { fetchAuthSession } from "aws-amplify/auth";
import { useState } from "react";
import { putTestimonial } from "app/api/testimonials";

export function TestimonialForm(params: {
  subjectUserId: string;
  subjectUserEmail: string;
}) {
  const [message, setMessage] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [connection, setConnection] = useState("");
  const [workplace, setWorkplace] = useState("");

  async function formAction() {
    const session = await fetchAuthSession();

    let testimonialParams = {
      ...params,
      jobTitle: jobTitle,
      connection: connection,
      workplace: workplace,
      message: message,
    };
    console.log("bingo");
    console.log(testimonialParams);
    putTestimonial(session, params);
    setMessage("");
  }

  return (
    <form className="space-y-12 bg-white p-12 w-3xl rounded-sm">
      <div className="">
        <div className="border-b border-gray-900/10 p-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Testimonial
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  name="about"
                  id="about"
                  rows={4}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job Title
              </label>
              <div className="mt-2">
                <textarea
                  name="jobTitle"
                  id="jobTitle"
                  rows={1}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setJobTitle(e.target.value)}
                  value={jobTitle}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                What is your job title?
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Connection
              </label>
              <div className="mt-2">
                <textarea
                  name="connection"
                  id="connection"
                  rows={1}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setConnection(e.target.value)}
                  value={connection}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                What was your connection to x?
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Workplace
              </label>
              <div className="mt-2">
                <textarea
                  name="workplace"
                  id="workplace"
                  rows={1}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setWorkplace(e.target.value)}
                  value={workplace}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Where did you work with x?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>

        <button
          type="button"
          className="rounded-sm bg-our-pink px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => formAction()}
        >
          Save
        </button>
      </div>
    </form>
  );
}
