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
    <div
      className=" w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      {/* <div className="flex flex-col w-screen h-screen justify-top p-24 bg-[conic-gradient(from_90deg,_var(--color-ourGold2),_var(--color-ourGold))]"> */}
      <div className="relative inset-y-0 right-0 z-10 flex flex-col p-12 text-right">
        <p className="text-6xl font-light mb-6">Wrangling with references?</p>
        <p className="text-6xl font-bold">Let Rango handle it</p>
      </div>
      <div className="relative grid grid-cols-3 gap-8 p-12">
        <TestimonialCard testimonial={fakeTestimony} />
        <TestimonialCard testimonial={fakeTestimony} />
        <TestimonialCard testimonial={fakeTestimony} />
      </div>
    </div>
  );
}
