"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { User } from "app/types";
import { AuthUser } from "aws-amplify/auth";

export default function AuthPage() {
  const [user, setUser] = useState<AuthUser>();

  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => {
        setUser(user);
        return (
          <div>
            <p>Welcome, {user?.username}!</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        );
      }}
    </Authenticator>
  );
}
