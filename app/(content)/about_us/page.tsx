"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import { getCurrentUser } from "aws-amplify/auth";
import mitch from "assets/mitch-pitching.jpg";
import sunny from "assets/sunny.jpeg";

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
    <div className="w-screen relative">
      <div className="relative flex flex-col md:flex-row justify-center 2xl:pt-14 xl:pt-10 pt-8 pb-6 px-4 xl:gap-24 lg:gap-16 md:gap-6">
        <div className="m-2">
          <p className="2xl:text-7xl xl:text-6xl lg:text-7xl md:text-6xl text-5xl text-ourBrown font-bold mb-4">
            Mission
          </p>
          <p className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl text-xl text-ourBrown font-semibold mb-4">
            To help people showcase their amazing references
          </p>
        </div>

        <div className="bg-ourCream p-6 rounded-lg shadow-lg border-1 border-solid border-gray-300 ">
          <p className="md:text-4xl text-3xl text-ourBrown font-bold mb-4">
            Founding Story
          </p>
          <p className="md:text-lg text-md text-ourBrown mb-4">
            We started out simply seeking to learn more about Software
            Engineering whilst also trying to make a positive impact.
          </p>
          <p className="md:text-lg text-md text-ourBrown mb-4">
            Our brain child? Rango. A platform that encourages coworkers,
            teammates and friends to sing each other's praises.
          </p>

          <p className="md:text-lg text-md text-ourBrown mb-4">
            It’s early days. We’re having a blast and just getting started.
            Watch this space!
          </p>
        </div>
      </div>

      <div className="bg-ourCream">
        <div className="relative md:flex justify-center text-left items-center p-6">
          <p className="text-4xl text-ourBrown font-semibold">Meet the Team</p>
        </div>

        <div className="relative grid md:grid-cols-2 grid-col-1 gap-24 pt-4 pb-6 place-items-center mx-4">
            <div className="max-w-[750px] w-full">
              <div className="relative w-full h-[500px]">
                <Image
                  src={sunny}
                  alt="Sunny"
                  fill
                  className="object-cover rounded-sm"
                  sizes="(max-width: 750px) 100vw, 750px"
                />
              </div>
              <p className="text-3xl text-ourBrown font-semibold mt-4 text-left">
                Sunny
              </p>
            </div>

            <div className="max-w-[750px] w-full">
              <div className="relative w-full h-[500px]">
                <Image
                  src={mitch}
                  alt="Mitch"
                  fill
                  className="object-cover rounded-sm"
                  sizes="(max-width: 750px) 100vw, 750px"
                />
              </div>
              <p className="text-3xl text-ourBrown font-semibold mt-4 text-left">
                Mitch
              </p>
            </div>
        </div>

      </div>
    </div>
  );
}
