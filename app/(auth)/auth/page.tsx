"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export default function AuthPage() {
  const router = useRouter(); // Next.js router for navigation

  // If a login occurs, redirect to "/"
  Hub.listen("auth", (data) => {
    console.log("Auth event has occured, so redirecting to root.");

    router.push("/");
  });

  // Check if a user is already logged in (before the login UI shows)...
  // So if authenticated user vists "/auth", this just redirects back to "/"
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          console.log(currentUser);
          // router.push("/"); // Redirect if already logged in
        }
      } catch (error) {
        console.log("No user logged in:");
      }
    };

    checkUser();
  }, [router]); // Runs once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-ourCream">
      <div className="w-full max-w-md">
        <Authenticator
          // socialProviders={["amazon", "apple", "facebook", "google"]}
          formFields={{
            signIn: {
              username: {
                // label: "Email Address or Phone Number", // Change the label of the username field
                // placeholder: "Enter your Email or Phone here",
                label: "Email Address", // Change the label of the username field
                placeholder: "Enter your Email here",
              },
            },
            signUp: {
              username: {
                // label: "Email Address or Phone Number", // Change the label of the username field
                // placeholder: "Enter your Email or Phone here",
                label: "Email Address", // Change the label of the username field
                placeholder: "Enter your Email here",
              },
            },
          }}
        >
          {({ signOut, user }) => {
            return <div>Loading...</div>;
          }}
        </Authenticator>

        {/* Powered by AWS Badge */}
        <div className="mt-6 flex flex-col items-center gap-2">
          {/* Tooltip Box */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center text-sm text-gray-600">
              <a
                href="https://aws.amazon.com/cognito/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://d1.awsstatic.com/logos/powered-by-aws.png"
                  alt="Powered by AWS"
                  className="w-36 opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            {/* Tooltip content */}
            <div className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg bg-white p-3 text-sm text-gray-700 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Authentication is handled securely by Amazon Cognito. All
              passwords are encrypted and stored on Amazon servers using
              industry-standard best practices.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
