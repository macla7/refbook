"use client";

import { useState, useEffect } from "react";
import { AuthUser, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser, patchUser, uploadProfileImage } from "app/api/users";
import { useRouter } from "next/navigation";
import { DP } from "app/(content)/components/dp";
import background from "assets/rangobg4.svg";
import Image from "next/image";
import { useSearch } from "app/context/SearchContext";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [bio, setBio] = useState("");
  const userId: string = params.id;
  const router = useRouter(); // Next.js router for navigation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { search, setSearch } = useSearch();

  useEffect(() => {
    checkUser();
  }, [router]); // Run once on mount

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user is: ", currentUser);
        setAuthUser(currentUser);
      } catch (error) {
        console.log("User not authenticated");
        setUser(userDefault);
        // router.push("/"); // Redirect to authentication page
      }
    }

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
    setImageUrl(user.image as string);
  }

  async function handleClick() {
    const session = await fetchAuthSession();

    let uploadedImageUrl: string | null = null;

    if (selectedFile) {
      uploadedImageUrl = await uploadProfileImage(selectedFile, session);
    }

    let userParams: any = {
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
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("user-updated"));
    }
    router.push(`/users/${userId}/profile`);
  }

  function clearFields() {
    setName("");
    setPosition("");
    setWorkplace("");
    setBio("");
  }

  return user.id !== "unknown" ? (
    <div className="w-full ">
      <div className="col-span-3 justify-items-center rounded-sm bg-white relative h-full p-12">
        <Image
          alt="Mountains"
          src={background}
          quality={100}
          fill
          style={{
            margin: 0,
            objectFit: "cover",
            padding: "0",
          }}
        />

        <form className="relative space-y-2 bg-white w-3xl rounded-sm border border-gray-900/10 ">
          <div className="p-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              User Details
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-4 w-64 h-64 rounded-full overflow-hidden border-transparent">
              <DP
                user={{
                  name: "placeholder",
                  image: imageUrl,
                  id: "no-id-to-be-seen-here",
                }}
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">
                Profile Picture
              </label>

              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-ourPurple px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Upload Image
                </label>

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      setImageUrl(URL.createObjectURL(file)); // ✅ instantly shows preview
                    }
                  }}
                />

                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-700">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <p className="mt-1 text-sm/6 text-gray-600">
                Profile pictures help people recognise you
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <p className="mt-1 text-sm/6 text-gray-600">
                  What is your name?
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <p className="mt-1 text-sm/6 text-gray-600">
                  What is your position?
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <p className="mt-1 text-sm/6 text-gray-600">
                  Where are you currently working?
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <p className="mt-1 text-sm/6 text-gray-600">
                  Tell the world a bit about yourself.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 mr-12 mb-4 mt-0">
            <button
              className="cursor-pointer rounded-md bg-ourPurple px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition"
              type="button"
              onClick={handleClick}
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>Redirecting...</div>
  );
}
