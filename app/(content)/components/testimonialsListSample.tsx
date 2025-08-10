import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Testimonial } from "app/types";
import { getTestimonials, deleteTestimonial } from "app/api/testimonials";
import TestimonialCard from "./testimonialCard";
import test from "node:test";
import sunny from "assets/sunny.jpeg";
import mitchPitching from "assets/mitch-pitching.jpg";
import beeDP from "assets/bee-dp.png";
import p1 from "assets/fake-people/p1.jpg";
import p2 from "assets/fake-people/p2.jpg";
import p3 from "assets/fake-people/p3.jpg";
import p4 from "assets/fake-people/p4.jpg";
import p6 from "assets/fake-people/p6.jpg";
import p7 from "assets/fake-people/p7.jpg";
import p9 from "assets/fake-people/p9.jpg";

const fakeUser = {
  workplace: "Rango Satellite Office",
  image: sunny,
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "bingobongomongo@outlook.com",
  id: "298e1488-0031-709e-2e92-81344e476912",
  name: "Sunny",
  position: "Co-Founder",
  bio: "hi",
};

const fakeUser2 = {
  workplace: "Rango HQ",
  image: mitchPitching,
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "bingobongomongo@outlook.com",
  id: "298e1488-0031-709e-2e92-81344e476912",
  name: "Mitch",
  position: "Co-Founder",
  bio: "hi",
};

const fakeUser3 = {
  workplace: "Rango",
  image: p9,
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "bingobongomongo@outlook.com",
  id: "298e1488-0031-709e-2e92-81344e476912",
  name: "Jordan",
  position: "Dev",
  bio: "hi",
};

const fakeUser4 = {
  workplace: "Rango Research Lab",
  image: p1, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "cloudrider@skymail.com",
  id: "182bd773-ae77-42c8-b1f0-72a7ac2039c1",
  name: "Jordan",
  position: "Data Wrangler",
  bio: "Trained in clouds, fluent in code.",
};

const fakeUser5 = {
  workplace: "Rango Creative",
  image: p2, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "drawnofficial@paint.net",
  id: "7e34f041-2299-4df7-b6c0-0e9c59f9e1d5",
  name: "Taylor",
  position: "Visual Architect",
  bio: "Building worlds one pixel at a time.",
};

const fakeUser6 = {
  workplace: "The Hollow Tree",
  image: p3, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "leavesoftime@tree.fm",
  id: "54cd22ac-d1b2-42b8-b6c6-60d5fdcf94c6",
  name: "Rowan",
  position: "Chief Forager",
  bio: "Sourcing knowledge from the roots to the canopy.",
};

const fakeUser7 = {
  workplace: "Rango Innovation Den",
  image: p4, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "neonpulse@brainmail.com",
  id: "8f20e13a-8a84-469b-8180-d1f663e7e8ff",
  name: "Alex",
  position: "Idea Generator",
  bio: "Powered by midnight snacks and whiteboards.",
};

const fakeUser8 = {
  workplace: "Rango Wellness Bay",
  image: p6, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "peacekeeper@calm.io",
  id: "3d7fa2b0-f18a-4e30-8090-f47c8404b292",
  name: "Casey",
  position: "Culture Alchemist",
  bio: "Turns tension into teamwork, vibes into velocity.",
};

const fakeUser9 = {
  workplace: "Rango Timeforge",
  image: p7, // replace with your image import
  createdAt: new Date("2025-02-13T10:32:37.655Z"),
  email: "timestacker@clockwork.dev",
  id: "0b6c8d7f-957f-478d-9eaa-b92e21d623bc",
  name: "Morgan",
  position: "Temporal Engineer",
  bio: "Always on time. Except when inventing new ones.",
};

const fakeTestimony: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess consistently ships clean, scalable code and somehow keeps the whole team laughing. Tech lead energy with zero ego.",
};

const fakeTestimony2: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess brings full-stack magic and serious versatility. One minute they're debugging complex state issues, the next they’re mentoring juniors like a pro.",
};

const fakeTestimony3: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess jumped on a high-pressure sprint and just delivered. Fast thinker, clean coder, and a genuinely supportive teammate.",
};
const fakeTestimony4: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess is the glue that holds it all together. Merge conflicts? Resolved. Deadlines? Crushed. Morale? Sky-high.",
};

const fakeTestimony5: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess doesn’t just fix bugs — they see the whole matrix. Debugs with style, builds with purpose. Invaluable teammate.",
};

const fakeTestimony6: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess is a walking cheat code. Whether it’s front-end finesse or back-end wizardry, they always deliver — and somehow never miss snack o’clock.",
};

const fakeTestimony7: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess turned our chaos into clarity. Give them spaghetti code, and they’ll serve you a 3-course software solution. Seriously impressive.",
};

const fakeTestimony8: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess has that calm brilliance. They listen deeply, speak wisely, and always guide the team toward the right architectural move. Quiet powerhouse.",
};

const fakeTestimony9: Testimonial = {
  id: "null",
  authorId: "null",
  subjectUserId: "null",
  message:
    "Jess rolls into stand-up with purpose. Clarity, solutions, and just the right memes. Absolute weapon.",
};

export function TestimonialsList(params: { subjectUserId: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setTestimonials(await getTestimonials(session, params.subjectUserId));
  }

  return (
    <ul className="relative grid lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] md:grid-cols-1 gap-10 p-20 w-full">
      <li key={1} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony} fakeUser={fakeUser} />
      </li>
      <li key={2} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony3} fakeUser={fakeUser3} />
      </li>
      <li key={3} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony2} fakeUser={fakeUser2} />
      </li>
      <li key={4} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony4} fakeUser={fakeUser4} />
      </li>
      <li key={5} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony5} fakeUser={fakeUser5} />
      </li>
      <li key={6} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony6} fakeUser={fakeUser6} />
      </li>
      <li key={7} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony7} fakeUser={fakeUser7} />
      </li>
      <li key={8} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony8} fakeUser={fakeUser8} />
      </li>
      <li key={9} className="flex justify-center items-center ">
        <TestimonialCard testimonial={fakeTestimony9} fakeUser={fakeUser9} />
      </li>
    </ul>
  );
}
