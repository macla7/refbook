import React, { useState } from "react";

export default function ShareWithFriends(): JSX.Element {
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
      <button
        className="cursor-pointer rounded-md bg-ourPurple px-4 py-2 text-white text-sm sm:text-base md:text-lg font-medium transition"
        type="button"
        onClick={copyProfileLink}
      >
        {copied ? "Copied!" : "Copy profile link"}
      </button>
    </div>
  );
}
