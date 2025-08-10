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
import arrow from "assets/brown arrow.svg";
import sample from "assets/sample.png";
// *** This is the root / landing page ! ***
export default function rootPage() {
  const router = useRouter();

  async function handleClick() {
    try {
      const currentUser = await getCurrentUser();
      router.push("/users/" + currentUser.userId + "/profile");
    } catch (error) {
      router.push("/auth");
    }
  }

  return (
    <div className="bg-ourLightBrown">
      <div className="w-screen relative h-[700px]">
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
          <div className="grid gap-x-4">
            {/* Row 1 */}
            <div className="grid grid-cols-[1fr] gap-12 ">
              <div className="p-4">
                <p className="text-9xl text-ourBrown font-semibold my-4 text-center">
                  Let employers hear your
                </p>
                <p className="text-9xl text-ourBrown font-semibold mb-4 text-center">
                  coworkers' praise
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 ">
              <div className="relative flex justify-center items-end h-full ">
                <div className="p-4 rounded-lg text-5xl text-ourBrown font-semibold">
                  <p className="text-center">
                    Put your refenernces in the spotlight where your
                  </p>
                  <p className="text-center">
                    coworkers can explain why you're the best
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="relative flex justify-center items-end h-full">
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

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-[minmax(0,1fr)_500px] gap-16 mt-8 mx-24 w-full max-w-[1700px]">
          {/* Left Column (Flexible) */}
          <div className="relative w-full max-w-[1200px] min-w-[300px] aspect-[218/100] border border-solid border-gray-200">
            <Image
              alt="Gold yellow background"
              src={sample}
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Column (Fixed 500px) */}
          <div className="grid grid-cols-[80px_1fr] grid-rows-2 items-center justify-start">
            <div className="h-16 w-16 flex items-center justify-center p-2 shadow rounded-full bg-ourPink text-3xl text-ourBrown font-semibold">
              <p>1</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              Here the references left by your coworkers are displayed for the
              world to see, helping you stand out!
            </div>
            <div className="h-16 w-16 flex items-center justify-center p-2 shadow rounded-full bg-ourPink text-3xl text-ourBrown font-semibold">
              <p>2</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              Profile section where you can add some details about yourself,
              including your position and where you are currently working.
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center pt-12 text-center items-center ">
        <div className="p-6">
          <p className="text-2xl text-ourBrown font-bold max-w-5xl">
            Here to help you transform your references from an afterthought into
            an asset. We will do this by increasing accessibility and making it
            easier to:
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-24 px-24 pt-12 pb-6">
        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center ">
              To store references
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center ">
              To get coworkers to write references
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 rounded-sm shadow-lg border border-solid border-gray-300 h-full">
            <p className="text-2xl text-ourBrown font-semibold mb-6 text-center ">
              To showcase your references to the world
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
