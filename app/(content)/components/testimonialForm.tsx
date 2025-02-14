import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";

export function TestimonialForm(params: {
  subjectUserId: string;
  subjectUserEmail: string;
}) {
  const [message, setMessage] = useState("");

  async function putTestimonial() {
    try {
      // 🔥 Fetch the authentication session
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString();

      if (!jwtToken) {
        console.error("No authentication token found.");
        return;
      }

      // 🔥 Decode the JWT Token to extract the Cognito User ID (sub)
      const tokenPayload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT payload
      const userId = tokenPayload.sub; // Cognito User ID (Unique ID for the user)
      const authorName = tokenPayload.name;

      console.log("User ID:", userId);
      console.log("JWT Token:", jwtToken);

      // 🔥 Send PUT request with AuthorId set to the user's Cognito ID
      const response = await fetch(
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/testimonials",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            message: message,
            subjectUserId: params.subjectUserId, // Example: ID of the person the testimonial is about
            authorId: userId, // ✅ Automatically assign the user's Cognito ID
            authorName: authorName,
            subjectUserEmail: params.subjectUserEmail,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
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
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
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
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={putTestimonial}
        >
          Save
        </button>
      </div>
    </form>
  );
}
