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
    <div className="bg-ourCream">
      <div className="w-screen relative h-[450px]">
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
        <div className="relative flex justify-center pt-6 pb-6 ">
          <div className="w-full m-6">
            <p className="2xl:text-8xl text-7xl text-ourBrown font-bold mb-4">
              Mission Statement
            </p>
            <p className="2xl:text-6xl text-5xl text-ourBrown font-semibold mb-4">
              To help people showcase their amazing references
            </p>
          </div>

          <div className=" w-full m-6">
            <div className="bg-ourCream p-6 rounded-lg shadow-lg border-1 border-solid border-gray-300 ">
              <p className="text-4xl text-ourBrown font-bold mb-4">
                Founding Story
              </p>
              <p className="text-lg text-ourBrown font-bold mb-4">
                We started out simply seeking to learn more about Software
                Engineering whilst also trying to make a positive impact.
              </p>
              <p className="text-lg text-ourBrown font-bold mb-4">
                Our brain child? Rango. A platform that encourages coworkers,
                teammates and friends to sing each other's praises.
              </p>

              <p className="text-lg text-ourBrown font-bold mb-4">
                It’s early days. We’re having a blast and just getting started.
                Watch this space!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center pt-6 text-left items-center px-24">
        <div className="p-6">
          <p className="text-4xl text-ourBrown font-semibold">Meet the Team</p>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-24 px-24 pt-4 pb-6">
        <div className="w-full">
          <div className="max-w-[750px] mx-auto">
            <Image
              src={sunny}
              alt={"Sunny"}
              className="object-cover rounded-sm"
              style={{ height: "500px", width: "100%" }}
            />

            <p className="text-3xl text-ourBrown font-semibold mt-4 text-left">
              Sunny
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-[750px] mx-auto">
            <Image
              src={mitch}
              alt={"Mitch"}
              className="object-cover rounded-sm"
              style={{ height: "500px", width: "100%" }}
            />

            <p className="text-3xl text-ourBrown font-semibold mt-4 text-left">
              Mitch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
