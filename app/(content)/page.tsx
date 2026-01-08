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
      <div className="relative 2xl:h-[700px] xl:h-[600px] lg:h-[500px] md:h-[400px] h-[500px]">
        <div className="relative lg:px-6 px-2 lg:pt-12 md:pt-6 pt-2">
          <div className="grid gap-x-4">
            {/* Row 1 */}
            <div className="grid grid-cols-[1fr] ">
              <div className="lg:py-4 md:py-2 py-1">
                <p className="2xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl text-5xl text-ourBrown font-semibold my-4 text-center">
                  Let employers hear your <br /> coworkers' praise
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 ">
              <div className="relative flex justify-center items-end h-full ">
                <div className="lg:p-4 p-2 rounded-lg 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-3xl text-2xl text-ourBrown font-semibold">
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
      </div>

      <div className="flex items-center justify-center py-12 bg-ourBone shadow-hover">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] 2xl:gap-18 xl:gap-12 gap-6 2xl:mx-24 xl:mx-12 mx-6 w-screen max-w-[1700px]">
         
         <div className="grid grid-cols-1 gap-x-2 gap-y-6 md:gap-y-8 items-center">
            <div className="grid grid-cols-1  md:grid-cols-[auto_1fr] items-center gap-x-2 gap-y-3 md:gap-y-0 ref-icon">
              <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center justify-center shadow rounded-full mx-auto md:mx-0">
                <Image src={test_icon} alt="Testimonial Icon" />
              </div>
              <div className=" bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px] justify-center text-center md:text-left">
                References left by your coworkers made accessible
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-[auto_1fr] items-center gap-x-2 gap-y-3 md:gap-y-0 search-icon">
              <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center shadow rounded-full mx-auto md:mx-0">
                <Image src={search_icon} alt="Search Icon" />
              </div>
              <div className="bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px] justify-center text-center md:text-left">
                Quickly find friends and coworkers, no log in required
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-[auto_1fr] items-center gap-x-2 gap-y-3 md:gap-y-0 profile-icon">
              <div className="2xl:h-16 2xl:w-16 xl:h-12 xl:w-12 h-10 w-10 flex items-center justify-center shadow rounded-full mx-auto md:mx-0">
                <Image src={profile_icon} alt="Profile Icon" />
              </div>
              <div className="bg-white xl:p-4 p-2 shadow rounded-lg flex items-center min-h-[64px] justify-center text-center md:text-left">
                Profile area for a summary of who you are
              </div>
            </div>
          </div>

          {/* Left Column (Flexible) */}
          <div className=" md:block hidden relative max-w-[1200px] min-w-[300px] aspect-[16/9] md:aspect-[238/100] border border-solid border-gray-200 overflow-hidden">
            <Image
              alt="Gold yellow background"
              src={sample}
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              className="pointer-events-none select-none explainer-image"
            />

            <div className="ref-icon-target absolute top-18.5/48 left-25.5/96 w-1.1/5 h-1.2/4"></div>
            <div className="search-icon-target absolute top-0 left-57/96 w-1.6/10 h-1.2/8"></div>
            <div className="profile-icon-target absolute top-0 right-0 w-1/4 h-1/1"></div>
            
          </div>

          {/* Right Column (features) */}
        </div>
      </div>

      <div className="lg:py-12 py-4 relative overflow-hidden">
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
        <div className="relative flex justify-center lg:pt-6 pt-4 text-center items-center ">
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
            <p className="text-2xl text-ourBrown font-bold max-w-5xl">
              3 steps to use
            </p>
            <Image src={logo} alt="Default Profile" width={150} />
            <p className="text-2xl text-ourBrown font-bold max-w-5xl">
              to help you get employed?
            </p>
          </div>
        </div>

        <div className="relative flex flex-col w-screen max-w-4xl mx-auto items-center my-10 z-0 gap-4 lg:gap-8 justify-center px-4 md:px-8 ">
          <div className="flex flex-col md:flex-row md:gap-6 w-full bg-ourBone rounded-lg shadow items-stretch">
            <div className="bg-white md:p-10 p-4 shadow rounded-lg md:w-1/3 w-full flex items-center justify-center">
              <p className="text-xl text-ourBrown font-bold max-w-5xl whitespace-nowrap text-center md:text-left">
                1. Create Profile
              </p>
            </div>
            <div className="xl:p-4 md:p-6 p-4 flex justify-center items-center text-center md:text-left md:w-2/3 w-full">
              <p className="text-lg text-ourBrown font-bold max-w-5xl">
                This creates a board for your basic info and where you can
                showcase your references
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-6 w-full bg-ourBone rounded-lg shadow items-stretch">
            <div className="bg-white md:p-10 p-4 shadow rounded-lg md:w-1/3 w-full flex items-center justify-center">
              <p className="text-xl text-ourBrown font-bold max-w-5xl whitespace-nowrap text-center md:text-left">
                2. Get References
              </p>
            </div>

            <div className="xl:p-4 md:p-6 p-4 flex justify-center items-center text-center md:text-left md:w-2/3 w-full">
              <p className="text-lg text-ourBrown font-bold max-w-5xl">
                Ask coworkers to leave you references that help you stand out
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-6 w-full bg-ourBone rounded-lg shadow items-stretch">
            <div className="bg-white md:p-10 p-4 shadow rounded-lg md:w-1/3 w-full flex items-center justify-center">
              <p className="text-xl text-ourBrown font-bold max-w-5xl whitespace-nowrap text-center md:text-left">
                3. Share Profile
              </p>
            </div>
            <div className="xl:p-4 md:p-6 p-4 flex justify-center items-center text-center md:text-left md:w-2/3 w-full">
              <p className="text-lg text-ourBrown font-bold max-w-5xl">
                Attach to your resume, linkedin or share the link directly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
