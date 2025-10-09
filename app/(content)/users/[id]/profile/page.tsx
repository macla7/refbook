"use client";

import { useState, useEffect } from "react";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import { Sidebar } from "app/(content)/components/sidebar";
import background from "assets/rangobg4.svg";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const [activeTab, setActiveTab] = useState<"testimonials" | "sidebar">(
    "testimonials"
  );
  const userId: string = params.id;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setUser(await getUser(userId));
  }

  return (
    <div className="w-full max-w-full grow relative ">
      {/* Tabs for small screens */}
      <div className="sm:hidden w-full flex border-b border-gray-200 bg-white ">
        <button
          className={`flex-1 py-3 text-center font-semibold transition ${
            activeTab === "testimonials"
              ? "border-b-2 border-ourBrown text-ourBrown"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("testimonials")}
        >
          Testimonials
        </button>
        <button
          className={`flex-1 py-3 text-center font-semibold transition ${
            activeTab === "sidebar"
              ? "border-b-2 border-ourBrown text-ourBrown"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("sidebar")}
        >
          Profile
        </button>
      </div>

      {/* Tab content for small screens */}
      <div className="sm:hidden h-full pb-10">
        {activeTab === "testimonials" && (
          <div className="relative bg-white h-full">
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
            <TestimonialsList subjectUserId={userId} />
          </div>
        )}
        {activeTab === "sidebar" && (
          <div className="bg-white h-full">
            <Sidebar user={user} />
          </div>
        )}
      </div>

      {/* Grid layout for medium and up */}
      <div className="hidden sm:grid xl:grid-cols-7 grid-cols-5 grow mx-0 h-full">
        <div className="xl:col-span-5 col-span-3 justify-items-center rounded-sm bg-white relative">
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
          <TestimonialsList subjectUserId={userId} />
        </div>
        <div className="col-span-2 gbg-our-sidebar rounded-sm border-l-1 border-solid border-gray-200 h-full">
          <Sidebar user={user} />
        </div>
      </div>
    </div>
  );
}
