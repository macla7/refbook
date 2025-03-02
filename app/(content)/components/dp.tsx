"use client";

import Image from "next/image";
import defaultImage1 from "assets/default-image-1.jpeg";
import defaultImage2 from "assets/default-image-2.jpeg";
import defaultImage3 from "assets/default-image-3.jpeg";
import defaultImage4 from "assets/default-image-4.jpeg";
import defaultImage5 from "assets/default-image-5.jpeg";
import defaultImage6 from "assets/default-image-6.jpeg";
import defaultImage7 from "assets/default-image-7.jpeg";
import defaultImage8 from "assets/default-image-8.jpeg";
import defaultImage9 from "assets/default-image-9.jpeg";
import defaultImage10 from "assets/default-image-10.jpeg";
import defaultImage11 from "assets/default-image-11.jpeg";

export function DP() {
  // Store all imported images in an array
  const images = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
    defaultImage5,
    defaultImage6,
    defaultImage7,
    defaultImage8,
    defaultImage9,
    defaultImage10,
    defaultImage11,
  ];

  // Function to pick a random image
  const getRandomImage = () =>
    images[Math.floor(Math.random() * images.length)];

  return (
    <div className="w-full h-full rounded-full overflow-hidden border-transparent bg-gradient-to-r from-our-pink via-our-sec to-our-pink">
      <div className="w-full h-full rounded-full bg-white">
        <Image
          src={getRandomImage()}
          alt="Default Profile"
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}
