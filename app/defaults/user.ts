import { User } from "app/types";

export const userDefault: User = {
  id: "unknown",
  email: "guest@example.com",
  createdAt: new Date(),
  name: "default user name",
  position: "default position",
  workplace: "default workplace",
  bio: "default bio",
  image: null,
};
