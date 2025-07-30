"use client";

import { useRouter } from "next/navigation";
import TestimonialCard from "./components/testimonialCard";
import { Testimonial } from "app/types/testimonial";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import logo from "assets/rango3.svg";
import { getCurrentUser } from "aws-amplify/auth";
import sunny from "assets/sunny.jpeg";
import mitchPitching from "assets/mitch-pitching.jpg";
import beeDP from "assets/bee-dp.png";
import arrow from "assets/noun-right-drawn-arrow-250490-test-cropped.svg";
// *** This is the root / landing page ! ***
export default function rootPage() {
  const router = useRouter();

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
    workplace: "The Hive",
    image: beeDP,
    createdAt: new Date("2025-02-13T10:32:37.655Z"),
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
      <div className="w-screen relative h-[800px]">
        <Image
          alt="Gold yellow background"
          src={background}
          quality={100}
          fill
          style={{
            margin: 0,
            objectFit: "cover",
            padding: "0",
          }}
        />
        <div className="relative px-6 pt-12">
          <div className="grid gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-[500px_1fr] gap-12">
              <div className="relative flex justify-center items-end h-full">
                <div className="bg-ourCream p-4 rounded-lg shadow-lg text-lg text-ourBrown font-semibold ">
                  <p>Intead of your references</p>
                  <ul className="list-disc list-inside">
                    <li>not helping you get that next job</li>
                    <li>only being looked at as a final check</li>
                  </ul>
                </div>
              </div>
              <div className=" p-4">
                <p className="text-8xl text-ourBrown font-semibold mb-4 text-right">
                  Let employers hear your
                </p>
                <p className="text-8xl text-ourBrown font-semibold mb-4 text-right">
                  coworkers' praise
                </p>

                <p className="text-5xl text-ourBrown font-bold text-right">
                  from the start
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4">
                <div className="relative flex justify-end ">
                  <div className="px-4 mt-2">
                    <Image src={arrow} alt="Default Profile" width={200} />
                  </div>
                </div>
              </div>

              <div className="relative flex justify-start items-end h-full">
                <div className="bg-ourCream p-4 rounded-lg shadow-lg text-lg text-ourBrown font-semibold">
                  <p>You can put your refenernces in the spotlight</p>
                  <ul className="list-disc list-inside">
                    <li>
                      where your coworkers can explain why you're the best
                    </li>
                    <li>so you can get that amazing next job!</li>
                  </ul>
                </div>
              </div>

              <div className="p-4">
                <div className="relative flex justify-end items-end h-full">
                  <button
                    onClick={handleClick}
                    className="cursor-pointer rounded-full bg-ourPurple px-12 text-lg font-semibold transition h-16"
                  >
                    <span className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full">
                      Get started
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="relative flex justify-end pt-12 pb-6 text-right">
          <div className="p-6 ">
            <p className="text-8xl text-ourBrown font-semibold mb-4">
              Let employers hear your
            </p>
            <p className="text-8xl text-ourBrown font-semibold mb-4">
              coworkers' praise
            </p>

            <span className="text-5xl text-ourBrown font-bold">
              from the start
            </span>


          </div>
        </div>

         */}
      </div>

      <div className="relative grid grid-cols-3 justify-items-center gap-24 px-24 pt-16">
        <TestimonialCard testimonial={fakeTestimony} fakeUser={fakeUser} />
        <TestimonialCard testimonial={fakeTestimony3} fakeUser={fakeUser3} />
        <TestimonialCard testimonial={fakeTestimony2} fakeUser={fakeUser2} />
      </div>

      <div className="relative flex justify-center pt-12 text-center items-center">
        <div className="p-6">
          <p className="text-5xl text-ourBrown font-bold">
            Take the paperwork out of the references
          </p>
        </div>
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
