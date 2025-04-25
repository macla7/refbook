"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import Image from "next/image";
import { UsersList } from "./components/usersList";
import { AuthUser } from "aws-amplify/auth";
import { TestimonialsList } from "./components/testimonialsList";
import Link from "next/link";
import TestimonialCard from "./components/testimonialCard";
import { Testimonial } from "app/types/testimonial";
import heroImage from "assets/heropage.jpg";
import background from "assets/iStock-2163734002-2.svg";
import logo from "assets/rango3.svg";

// *** This is the root / landing page ! ***
export default function rootPage() {
  const [user, setUser] = useState<AuthUser>();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const fakeTestimony: Testimonial = {
    id: "null",
    authorId: "null",
    authorName: "Sandro Saran",
    subjectUserId: "null",
    subjectUserName: "Mitch Clark",
    message:
      " Mitch Clark has got the sauce, day in day out producing bangers and procuring swag. Straight steeze.",
    authorPostion: "CEO and Founder",
    authorConnection: "Colleague",
    authorWorkplace: "Champ Stamps R Us",
  };

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
        <div className="relative flex justify-center p-12 text-center">
          <div className="bg-ourCream p-6 rounded-sm shadow-lg border-1 border-solid border-gray-300">
            <p className="text-6xl text-ourBrown font-semibold mb-6">
              Wrangling with references?
            </p>
            <div className="relative flex justify-center text-center">
              <span className="text-7xl text-ourBrown font-extrabold">Let</span>
              <div className="px-6 mt-3">
                <Image src={logo} alt="Default Profile" width={200} />
              </div>
              <span className="text-7xl text-ourBrown font-extrabold">
                handle it
              </span>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 justify-items-center gap-24 px-24 py-6">
          <TestimonialCard testimonial={fakeTestimony} />
          <TestimonialCard testimonial={fakeTestimony} />
          <TestimonialCard testimonial={fakeTestimony} />
        </div>
      </div>

      <div className="relative flex justify-center pt-12 text-center">
        <div className="p-6">
          <p className="text-5xl text-ourBrown font-bold mb-6">
            Say nice things...
          </p>
          <p className="text-3xl text-ourBrown font-bold mb-6">
            about colleagues, teammates and friends
          </p>
          <div className="relative flex justify-end text-right"></div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-24 px-24 py-6">
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
