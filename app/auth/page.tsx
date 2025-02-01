"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function AuthPage() {
  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
