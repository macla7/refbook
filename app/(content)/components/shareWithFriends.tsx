import React, { useState } from "react";
import ShareButton from "./shareButton";

export default function ShareWithFriends(params: {
  subjectUserId: string;
}): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyProfileLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex bg-white border-1 border-gray-200 rounded-sm flex-col items-center justify-center space-y-4 p-6 md:p-8 m-8">
      <p>
        Share your profile with colleagues, teammates or anybody else who can
        write a great reference for you!
      </p>
      <ShareButton
        url={`https://www.rango.com.au/users/${params.subjectUserId}/profile`}
        title="Rango reference"
        text="Hey, can you write me a reference on Rango?"
      />
    </div>
  );
}
