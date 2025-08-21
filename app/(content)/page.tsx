"use client";

import { useRouter } from "next/navigation";
import TestimonialCard from "./components/testimonialCard";
import { Testimonial } from "app/types/testimonial";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import purpleBackground from "assets/rangobg4-purple.svg";
import logo from "assets/rango3.svg";
import { getCurrentUser } from "aws-amplify/auth";
import sunny from "assets/sunny.jpeg";
import mitchPitching from "assets/mitch-pitching.jpg";
import beeDP from "assets/bee-dp.png";
import arrow from "assets/brown arrow.svg";
import sample from "assets/sample.png";
import search_icon from "assets/search-icon.svg";
import test_icon from "assets/testimonial-icon.svg";
import profile_icon from "assets/profile-icon.svg";
import pipeline from "assets/pipeline.svg";
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
    <div>
      <div className="w-screen relative 2xl:h-[700px] xl:h-[600px] h-[500px]">
        <div className="relative px-6 pt-12">
          <div className="grid gap-x-4">
            {/* Row 1 */}
            <div className="grid grid-cols-[1fr] gap-12 ">
              <div className="py-4">
                <p className="2xl:text-9xl xl:text-8xl text-7xl text-ourBrown font-semibold my-4 text-center">
                  Let employers hear your
                </p>
                <p className="2xl:text-9xl xl:text-8xl text-7xl text-ourBrown font-semibold mb-4 text-center">
                  coworkers' praise
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 ">
              <div className="relative flex justify-center items-end h-full ">
                <div className="p-4 rounded-lg 2xl:text-5xl xl:text-4xl text-3xl text-ourBrown font-semibold">
                  <p className="text-center">
                    Put your references in the spotlight where your
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

      <div className="flex items-center justify-center mb-10 py-12 bg-ourBone shadow-hover">
        <div className="grid grid-cols-[3fr_1fr] 2xl:gap-18 xl:gap-12 gap-6 2xl:mx-24 xl:mx-12 mx-6 w-full max-w-[1700px]">
          {/* Left Column (Flexible) */}
          <div className="relative w-full max-w-[1200px] min-w-[300px] aspect-[238/100] border border-solid border-gray-200">
            <Image
              alt="Gold yellow background"
              src={sample}
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Column (Fixed 500px) */}
          <div className="grid grid-rows-3 grid-cols-[auto_1fr] 2xl:gap-x-6 xl:gap-x-4 gap-x-2 gap-y-8 items-center">
            <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center justify-center shadow rounded-full mx-auto">
              <Image src={test_icon} alt="Testimonial Icon" />
            </div>
            <div className="bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px]">
              References left by your coworkers made accessible
            </div>
            <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center justify-center shadow rounded-full mx-auto">
              <Image src={search_icon} alt="Search Icon" />
            </div>
            <div className="bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px]">
              Quickly find friends and coworkers, no log in required
            </div>
            <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center justify-center shadow rounded-full mx-auto">
              <Image src={profile_icon} alt="Profile Icon" />
            </div>
            <div className="bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px]">
              Profile area for a summary of who you are
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 relative overflow-hidden">
        {/* <Image      
          src={purpleBackground}
          alt="purple swirl background"
          quality={100}
          fill
          style={{
        objectFit: "cover",
        zIndex: 0,
          }}
          className="pointer-events-none select-none"
        /> */}
        {/* Your content goes here */}
        <div className="relative flex justify-center pt-12 text-center items-center ">
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
            <p className="text-2xl text-ourBrown font-bold max-w-5xl">
              How can
            </p>
            <Image src={logo} alt="Default Profile" width={150} />
            <p className="text-2xl text-ourBrown font-bold max-w-5xl">
              help you get employed?
            </p>
          </div>
        </div>

        <div className="relative flex w-2/3 items-center my-10 z-0 gap-20 mx-auto justify-center">
          <div className="w-1/3 h-32 flex items-center justify-center shadow rounded-xl mx-0 bg-ourBone font-bold group relative cursor-pointer transition overflow-hidden">
            <span className="flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0 ">
              Reach Out
            </span>
            <span className="absolute inset-10 flex items-center justify-center text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Makes it easy for coworkers to leave you a great reference
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full animate-shimmer opacity-100 group-hover:opacity-0"></div>
          </div>

          <div className="w-1/3 h-32 flex items-center justify-center shadow rounded-xl mx-0 bg-ourBone font-bold group relative cursor-pointer transition overflow-hidden">
            <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
              Store
            </span>
            <span className="absolute inset-10 flex items-center justify-center text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Keep all your references in one place, no more lost emails
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full animate-shimmer opacity-100 group-hover:opacity-0"></div>
          </div>

          <div className="w-1/3 h-32 flex items-center justify-center shadow rounded-xl mx-0 bg-ourBone font-bold group relative cursor-pointer transition overflow-hidden">
            <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
              Display
            </span>

            <span className="absolute inset-10 flex items-center justify-center text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Showcase your references on an accessible and shareable profile
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full animate-shimmer opacity-100 group-hover:opacity-0"></div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center pt-12 text-center items-center mb-10">
        FOOTER
      </div>
    </div>
  );
}

{
  /* <div className="w-full">
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
        </div> */
}
