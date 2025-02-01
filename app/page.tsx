"use client";

import { BlogPosts } from "app/components/posts";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function Page() {
  return (
    // <Authenticator>
    //   {({ signOut, user }) => (
    //     <div>
    //       <h1>Welcome {user?.username}</h1>
    //       <button onClick={signOut}>Sign out</button>
    //     </div>
    //   )}
    // </Authenticator>
    <section>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Just making some adjustments, WOOORK!!!!
      </h1>

      <div className="my-8">{/* <BlogPosts /> */}</div>
    </section>
  );
}
