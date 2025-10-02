import { User } from "app/types";
import Image, { StaticImageData } from "next/image";
import dp1 from "assets/default-dps/default-dp-1.svg";
import dp2 from "assets/default-dps/default-dp-2.svg";
import dp3 from "assets/default-dps/default-dp-3.svg";
import dp4 from "assets/default-dps/default-dp-4.svg";

type DPProps = {
  user: { name: string; image: string | StaticImageData | null; id: string };
};

export function DP({ user }: DPProps) {
  const getInitials = (name: string): string => {
    const nameSub = name == undefined ? "DU" : name;

    const nameParts = nameSub.trim().split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return initials || "DU";
  };
  
  const initials = getInitials(user.name);

  // Import all images from assets/default-dps
  const defaultDPs = [dp1, dp2, dp3, dp4];

  // Pick a default image based on createdAt
  const numbers = user.id.match(/\d+/g)
    ? user.id.match(/\d+/g)!.map(Number)
    : [1, 2, 3];
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0);
  const dpNumber =
    ((sum % defaultDPs.length) + defaultDPs.length) % defaultDPs.length;
  const defaultDP = defaultDPs[dpNumber];
  // console.log(dpNumber);

  return (
    <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-r from-ourBrown via-ourBrown to-ourBrown">
      <div className="relative text-center w-full h-full rounded-full bg-white flex items-center justify-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={"user profile picture"}
            width={80}
            height={80}
            className="w-full h-full align-center object-cover rounded-full"
          />
        ) : (
          <div className="image-container">
            <Image
              src={defaultDP}
              alt="default profile pic"
              width={80}
              height={80}
              className= "w-full h-full align-center object-cover rounded-full z-1"

            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <p className="text-3xl text-white text-shadow-10xl shadow-black">{initials}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
