import { User } from "app/types";
import Image, { StaticImageData } from "next/image";

type DPProps = {
  user: { name: string; image: string | StaticImageData | null };
};

export function DP({ user }: DPProps) {
  const getInitials = (name: string): string => {
    const nameParts = name.trim().split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return initials || "U";
  };

  const initials = "SB";

  return (
    <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-r from-ourBrown via-ourBrown to-ourBrown">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="w-full h-full align-center object-cover rounded-full"
          />
        ) : (
          <span className="text-3xl font-semibold text-ourBrown">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
