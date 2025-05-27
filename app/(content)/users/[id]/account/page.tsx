"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser, patchUser, uploadProfileImage } from "app/api/users";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [bio, setBio] = useState("");
  const userId: string = params.id;
  const router = useRouter(); // Next.js router for navigation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, [router]); // Run once on mount

  async function checkUser() {
    try {
      const cognitoUser = await getCurrentUser();
      console.log(cognitoUser);
      setUser(await getUser(cognitoUser.userId));
      if (cognitoUser.userId !== userId && cognitoUser.userId !== "unknown") {
        console.log("User ID mismatch, redirecting... not right user");
        router.push("/"); // Redirect to authentication page
      }
    } catch (error) {
      console.log(
        "User not authenticated, redirecting back home... shouldn't be accessing this account page for sure!"
      );
      router.push("/"); // Redirect to authentication page
    }
  }

  useEffect(() => {
    fillFieldsOnLoad();
  }, [user]);

  async function fillFieldsOnLoad() {
    setName(user.name);
    setPosition(user.position);
    setWorkplace(user.workplace);
    setBio(user.bio);
  }

  async function handleClick() {
    const session = await fetchAuthSession();

    let uploadedImageUrl: string | null = null;

    if (selectedFile) {
      uploadedImageUrl = await uploadProfileImage(selectedFile, session);
    }

    let userParams: any = {
      ...params,
      name,
      workplace,
      position,
      bio,
    };

    if (uploadedImageUrl) {
      userParams.image = uploadedImageUrl;
    }

    await patchUser(session, userId, userParams);
    clearFields();
    checkUser();
  }

  function clearFields() {
    setName("");
    setPosition("");
    setWorkplace("");
    setBio("");
  }

  return user.id !== "unknown" ? (
    <div className="w-full p-8 bg-ourCream flex justify-center">
      {/* <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-10">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Position: {user.position}</p>
        <p>Workplace: {user.workplace}</p>
        <p>Bio: {user.bio}</p>
      </h2> */}

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
                    rows={1}
                    className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id="inputBox"
                    name="inputBox"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  ></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  What is your name?
                </p>
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
                    rows={1}
                    className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id="inputBox"
                    name="inputBox"
                    required
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
                    rows={1}
                    className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id="inputBox"
                    name="inputBox"
                    required
                    onChange={(e) => setWorkplace(e.target.value)}
                    value={workplace}
                  ></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Where are you currently working?
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    rows={1}
                    className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id="inputBox"
                    name="inputBox"
                    required
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  ></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Tell the world a bit about yourself.
                </p>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm text-gray-900"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <p className="mt-3 text-sm/6 text-gray-600">
                Upload a new profile picture.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            className="rounded-sm bg-ourGold px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={handleClick}
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>Redirecting...</div>
  );
}
