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
    authorWorkplace: "Champ Stamp",
  };


  return (
    <>
      <div className="relative w-full h-screen">
        <Image
          src={heroImage}
          alt="Hero page"
          className="absolute inset-0 z-0 h-screen"
        />

        <div className="relative z-10 flex flex-col p-12">
          <div className="h-1/2">
            <p className="text-6xl font-light">Wrangling with references?</p>
            <p className="text-6xl font-bold">Let Rango handle it</p>
          </div>
          <div className="mt-20">
            <TestimonialCard testimonial={fakeTestimony} />
          </div>
        </div>
      </div>
    </>
  );
}
