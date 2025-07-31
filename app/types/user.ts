import type { StaticImageData } from "next/image";

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  name: string;
  position: string;
  workplace: string;
  bio: string;
  image: string | StaticImageData;
}
