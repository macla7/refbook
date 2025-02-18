"use client";

import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";

export function Sidebar() {
  // const router = useRouter();
  return (
    <aside className="">
      <div className="">This is the sidebar baby</div>
    </aside>
  );
}
