"use client";

import { useState, useEffect } from "react";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { getUser } from "app/api/users";
import { TestimonialsList } from "app/(content)/components/testimonialsList";
import { Sidebar } from "app/(content)/components/sidebar";
import background from "assets/rangobg4.svg";
import Image from "next/image";
import { DP } from "app/(content)/components/dp";
import test_icon from "assets/testimonial-icon.svg";

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
          className={`flex flex-col flex-1 py-3 text-center justify-center items-center font-semibold transition ${
            activeTab === "testimonials"
              ? "border-b-2 border-ourBrown text-ourBrown"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("testimonials")}
        >
          {/* <div className="h-7 w-7 flex items-center justify-center rounded-full ml-2">
            <Image src={test_icon} alt="Testimonial Icon" />
          </div> */}
          References
        </button>
        <button
          className={`flex flex-col flex-1 py-3 text-center justify-center items-center font-semibold transition ${
            activeTab === "sidebar"
              ? "border-b-2 border-ourBrown text-ourBrown"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("sidebar")}
        >
          {/* <div className="w-7 h-7 ml-2">
            <DP user={user} />
          </div> */}
          Profile
        </button>
      </div>

      {/* Tab content for small screens */}
      <div className="sm:hidden h-full mb-12">
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
      <div className="hidden sm:grid lg:grid-cols-7 grid-cols-5 grow mx-0 h-full">
        <div className="lg:col-span-5 col-span-3 justify-items-center rounded-sm bg-white relative">
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
        <div className="col-span-2 rounded-sm border-l-0 border-solid border-gray-200 h-full">
          <Sidebar user={user} />
        </div>
      </div>
    </div>
  );
}
