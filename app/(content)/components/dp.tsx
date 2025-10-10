import { User } from "app/types";
import Image, { StaticImageData } from "next/image";
import dp1 from "assets/default-dps/default-dp-1.svg";
import dp2 from "assets/default-dps/default-dp-2.svg";
import dp3 from "assets/default-dps/default-dp-3.svg";
import dp4 from "assets/default-dps/default-dp-4.svg";
import dp5 from "assets/default-dps/default-dp-5.svg";
import dp6 from "assets/default-dps/default-dp-6.svg";
import dp7 from "assets/default-dps/default-dp-7.svg";
import dp8 from "assets/default-dps/default-dp-8.svg";

type DPProps = {
  user: { name: string; image: string | StaticImageData | null; id: string };
};

export function DP({ user }: DPProps) {
  // Safe initials (optional)
  const getInitials = (name?: string | null): string => {
    const parts = (name ?? "DU").trim().split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] ?? "D") + (parts[1]?.[0] ?? "U");
  };

  // Stable hash instead of digits-only match
  const idStr = String(user?.id ?? "");
  let hash = 0;
  for (let i = 0; i < idStr.length; i++)
    hash = (hash * 31 + idStr.charCodeAt(i)) >>> 0;

  const defaultDPs = [dp1, dp2, dp3, dp4, dp5, dp6, dp7, dp8];
  const dpIndex = defaultDPs.length ? hash % defaultDPs.length : 0;
  const defaultDP = defaultDPs[dpIndex];

  const hasImage = Boolean(user?.image);

  return (
    <div className="w-full h-full rounded-full overflow-hidden ">
      <div className="relative text-center w-full h-full rounded-full bg-white flex items-center justify-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={"user profile picture"}
            width={400}
            height={400}
            className="w-full h-full align-center object-cover rounded-full"
          />
        ) : (
          <div className="image-container">
            <Image
              src={defaultDP}
              alt="default profile pic"
              width={1000}
              height={1000}
              className="w-full h-full align-center object-cover rounded-full z-1"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {/* <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                <p className="text-3xl text-ourBrown text-shadow-10xl shadow-black">
                  {initials}
                </p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
