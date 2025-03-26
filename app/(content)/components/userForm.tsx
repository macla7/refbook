import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { patchUser } from "app/api/users";

export function UserForm(params: { id: string }) {
  const [userName, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [workplace, setWorkplace] = useState("");

  async function formAction() {
    const session = await fetchAuthSession();

    let userParams = {
      ...params,
      position: position,
      workplace: workplace,
      name: userName,
    };

    console.log("bingo");
    console.log(userParams);

    patchUser(session, params.id, userParams);
  }

  return (
    <form className="space-y-12 bg-white p-12 w-3xl rounded-sm">
      <div className="">
        <div className="border-b border-gray-900/10 p-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            User Details
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
                Name
              </label>
              <div className="mt-2">
                <textarea
                  name="userName"
                  id="userName"
                  rows={1}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">What is your name?</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Position
              </label>
              <div className="mt-2">
                <textarea
                  name="position"
                  id="position"
                  rows={1}
                  className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setPosition(e.target.value)}
                  value={position}
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                What is your position?
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
                Where are you currently working?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-sm bg-our-pink px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => formAction()}
        >
          Finish
        </button>
      </div>
    </form>
  );
}
