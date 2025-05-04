import { User } from "app/types";
import Image from "next/image";

type DPProps = {
  user: User;
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

  const initials = getInitials(user.name);

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-r from-ourBrown via-ourGold to-ourBrown">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-3xl font-semibold text-gray-700">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
