"use client";

import { useRouter } from "next/navigation";
import TestimonialCard from "./components/testimonialCard";
import { Testimonial } from "app/types/testimonial";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import logo from "assets/rango3.svg";
import { getCurrentUser } from "aws-amplify/auth";
import userImage1 from "assets/default-image-1.jpeg";
import mitchPitching from "assets/mitch-pitching.jpg";
import beeDP from "assets/bee-dp.png";
// *** This is the root / landing page ! ***
export default function rootPage() {
  const router = useRouter();

  const fakeUser = {
    workplace: "Rango Satellite Office",
    image: userImage1,
    createdAt: "2025-02-13T10:32:37.655Z",
    email: "bingobongomongo@outlook.com",
    id: "298e1488-0031-709e-2e92-81344e476912",
    name: "Sunny",
    position: "Co-Founder",
    bio: "hi",
  };

  const fakeUser2 = {
    workplace: "Rango HQ",
    image: mitchPitching,
    createdAt: "2025-02-13T10:32:37.655Z",
    email: "bingobongomongo@outlook.com",
    id: "298e1488-0031-709e-2e92-81344e476912",
    name: "Mitch",
    position: "Co-Founder",
    bio: "hi",
  };

  const fakeUser3 = {
    workplace: "The Hive",
    image: beeDP,
    createdAt: "2025-02-13T10:32:37.655Z",
    email: "bingobongomongo@outlook.com",
    id: "298e1488-0031-709e-2e92-81344e476912",
    name: "Bob the Bee",
    position: "Worker",
    bio: "hi",
  };

  const fakeTestimony: Testimonial = {
    id: "null",
    authorId: "null",
    subjectUserId: "null",
    message:
      "Mitch Clark has got the sauce, day in day out producing bangers and procuring swag. Straight steeze.",
  };

  const fakeTestimony2: Testimonial = {
    id: "null",
    authorId: "null",
    subjectUserId: "null",
    message:
      "Sandro Saran is a man of many talents. He can write you a song, code you a Java masterpiece, cut your hair or climb your boulders. Dedicated team player.",
  };

  const fakeTestimony3: Testimonial = {
    id: "null",
    authorId: "null",
    subjectUserId: "null",
    message:
      "I worked with Bill for 3 whole days, last week. He get's the polen, he makes the honey, and he can bring the sting. Great Guy.",
  };

  async function handleClick() {
    try {
      const currentUser = await getCurrentUser();
      router.push("/users/" + currentUser.userId + "/profile");
    } catch (error) {
      router.push("/auth");
    }
  }

  return (
    <div className="bg-ourCream">
      <div className="w-screen relative h-[600px]">
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
        {/* <div className="flex flex-col w-screen h-screen justify-top p-24 bg-[conic-gradient(from_90deg,_var(--color-ourGold2),_var(--color-ourGold))]"> */}
        <div className="relative flex justify-center pt-12 pb-6 text-center">
          <div className="bg-ourCream p-6 rounded-sm shadow-lg border-1 border-solid border-gray-300">
            <p className="text-7xl text-ourBrown font-semibold mb-4">
              Say nice things
            </p>

            <span className="text-3xl text-ourBrown font-bold">
              About coworkers, teammates and friends
            </span>

            <div className="relative flex justify-center text-center items-center mt-2">
              <span className="text-3xl text-ourBrown font-bold">with</span>
              <div className="px-4 mt-2">
                <Image src={logo} alt="Default Profile" width={200} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-3 justify-items-center gap-24 px-24 py-6">
          <TestimonialCard testimonial={fakeTestimony} fakeUser={fakeUser} />
          <TestimonialCard testimonial={fakeTestimony2} fakeUser={fakeUser2} />
          <TestimonialCard testimonial={fakeTestimony3} fakeUser={fakeUser3} />
        </div>
      </div>

      <div className="relative flex justify-center pt-12 text-center items-center">
        <div className="p-6">
          <p className="text-5xl text-ourBrown font-bold">
            Wrangling with References?
          </p>
        </div>

        <button
          onClick={handleClick}
          className="cursor-pointer rounded-full bg-purple-500 mx-24 px-12 text-lg font-semibold transition h-16"
        >
          <span className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
            Get started
          </span>
        </button>
      </div>

      <div className="relative grid grid-cols-3 gap-24 px-24 pt-12 pb-6">
        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center">
              Talk up their technical skills or expertise
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center">
              Praise their ability to work in a team or independently
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center">
              Admire their work ethic, determination or adaptability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
