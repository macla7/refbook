import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { putTestimonial } from "app/api/testimonials";
import { getUser } from "app/api/users";
import { User } from "app/types";
import { useRouter } from "next/navigation";
import { userDefault } from "app/defaults/user";

export function TestimonialForm(params: { subjectUserId: string }) {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState("");
  const [connection, setConnection] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | any>();
  const [subjectUser, setSubjectUser] = useState<User | any>(userDefault);

  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    async function checkUser() {
      try {
        const cognitoUser = await getCurrentUser();
        console.log(cognitoUser);
        setLoggedInUser(await getUser(cognitoUser.userId));
        setSubjectUser(await getUser(params.subjectUserId));
      } catch (error) {
        console.log("User not authenticated, redirecting...");
        router.push("/auth"); // Redirect to authentication page
      }
    }

    checkUser();
  }, [router]); // Run once on mount

  async function formAction() {
    const session = await fetchAuthSession();

    let testimonialParams = {
      ...params,
      message: message,
      subjectUserId: params.subjectUserId,
    };

    console.log("bingo");
    console.log(testimonialParams);
    putTestimonial(session, testimonialParams);
    setMessage("");
    router.replace(`/users/${params.subjectUserId}/profile`);
  }

  return loggedInUser ? (
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
                htmlFor="testimonial"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Testimonal
              </label>
              <div className="mt-2">
                <textarea
                  name="testimonial"
                  id="testimonial"
                  rows={4}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Where did you work with {subjectUser.name}? What was your
                connection to {subjectUser.name}? What would you like to say?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.push(`/users/${params.subjectUserId}/profile`)}
          className="rounded-sm bg-ourGold2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>

        <button
          type="button"
          className="rounded-sm bg-ourPurple px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => formAction()}
        >
          Submit
        </button>
      </div>
    </form>
  ) : (
    <div>Redirecting...</div>
  );
}
