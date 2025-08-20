"use client";

import { useState, useEffect } from "react";

export default function ScreenSizeWarning() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setIsSmallScreen(window.innerWidth < 1024); // Tailwind lg breakpoint
  }

  if (!isSmallScreen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Unsupported Screen Size</h1>
      <p>
        This app isn’t built for mobile device screen sizes. Please use a
        computer or tablet for the best experience.
      </p>
    </div>
  );
}
