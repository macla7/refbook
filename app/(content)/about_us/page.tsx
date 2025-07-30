"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "assets/rangobg3.svg";
import { getCurrentUser } from "aws-amplify/auth";
import mitch from "assets/mitch-pitching.jpg";
import sunny from "assets/default-image-1.jpeg";

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
        <div className="relative flex justify-center pt-12 pb-6 ">
          <div className="bg-ourCream p-6 rounded-sm shadow-lg border-1 border-solid border-gray-300 w-full m-12">
            <p className="text-6xl text-ourBrown font-bold mb-4">
              Mission Statement
            </p>
            <p className="text-4xl text-ourBrown font-semibold mb-4">
              To enocurage people to say nice things about each other
            </p>
          </div>

          <div className="bg-ourCream p-6 rounded-sm shadow-lg border-1 border-solid border-gray-300 w-full m-12">
            <p className="text-3xl text-ourBrown font-bold mb-4">
              Founding Story
            </p>
            <p className="text-lg text-ourBrown font-bold mb-4">
              We started out just wanting to learn more about Software
              Engineering whilst also making a positive impact.
            </p>
            <p className="text-lg text-ourBrown font-bold mb-4">
              Our brain child? Rango. A platform that encourages coworkers,
              teammates and friends to say nice things about each other.
            </p>

            <p className="text-lg text-ourBrown font-bold mb-4">
              It’s early days. We’re having a blast and just getting started.
              Watch this space!
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center pt-6 text-center items-center">
        <div className="p-6">
          <p className="text-4xl text-ourBrown font-semibold">Meet the Team</p>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-24 px-24 pt-4 pb-6">
        <div className="w-full">
          <div className="p-6 rounded-sm shadow-lg border border-solid border-gray-100 max-w-[750px] mx-auto">
            <p className="text-3xl text-ourBrown font-semibold mb-6 text-center">
              Sunny
            </p>
            <Image
              src={sunny}
              alt={"Sunny"}
              className="object-cover"
              style={{ height: "500px", width: "100%" }}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="p-6 rounded-sm shadow-lg border border-solid border-gray-100 max-w-[750px] mx-auto">
            <p className="text-3xl text-ourBrown font-semibold mb-6 text-center">
              Mitch
            </p>
            <Image
              src={mitch}
              alt={"Mitch"}
              className="object-cover"
              style={{ height: "500px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
