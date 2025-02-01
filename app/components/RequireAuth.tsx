"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.accessToken) {
          setIsAuthenticated(true);
        } else {
          router.push("/auth");
        }
      } catch (error) {
        console.error("User not authenticated:", error);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <>{children}</> : null;
}
