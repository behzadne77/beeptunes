"use client";

import React from "react";
import { History } from "lucide-react";
import GlassButton from "./GlassButton";
import PlayPauseButton from "./PlayPauseButton";
import ChanellsComponent from "./Chanells";

type BottomNavProps = {
  onShowHistory?: () => void;
};

export default function BottomNav({
  onShowHistory,
}: BottomNavProps) {
  const handleShowHistory = () => (onShowHistory ? onShowHistory() : console.log("show history"));
  // -------- stations -------
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]"
      aria-label="bottom navigation"
    >
      <div className="mx-auto max-w-screen-sm px-4 pb-4">
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-neutral-900/30 border border-white/30 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl">
          <div className="grid grid-cols-3 items-center">
            <ChanellsComponent />
            <PlayPauseButton />
            <GlassButton
              onClick={handleShowHistory}
              aria-label="نمایش هیستوری"
              showShadow={false}
              hasBg={false}
              hasBorder={false}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <History className="h-6 w-6" />
                <span className="text-[11px]">تاریخچه</span>
              </div>
            </GlassButton>
          </div>
        </div>
      </div>
    </nav>
  );
}


