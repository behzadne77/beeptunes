"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

type AppBootstrapProps = {
  children: React.ReactNode;
  minSplashMs?: number;
};

let splashShown = false;

export default function AppBootstrap({ children, minSplashMs = 4000 }: AppBootstrapProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (splashShown) {
      setShowSplash(false);
      return;
    }
    const enterFrame = requestAnimationFrame(() => setEntered(true));
    const visibleTimer = setTimeout(() => {
      setIsHiding(true);
      // wait for exit animation then unmount
      const exitTimer = setTimeout(() => {
        splashShown = true;
        setShowSplash(false);
      }, 320);
      return () => clearTimeout(exitTimer);
    }, Math.max(0, minSplashMs));
    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(visibleTimer);
    };
  }, [minSplashMs]);

  if (showSplash) {
    return (
      <div
        className={
          `fixed inset-0 z-50 transition-all duration-300 ease-out ` +
          `${entered ? "opacity-100 scale-100" : "opacity-0 scale-95"} ` +
          `${isHiding ? "opacity-0 scale-95" : ""}`
        }
        style={{ transformOrigin: "center" }}
      >
        <SplashScreen />
      </div>
    );
  }
  return <>{children}</>;
}


