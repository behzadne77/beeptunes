"use client";

import React from "react";
import { History, ListMusic, StopCircle } from "lucide-react";
import GlassButton from "./GlassButton";
import PlayPauseButton from "./PlayPauseButton";

type BottomNavProps = {
  onShowChannels?: () => void;
  onStop?: () => void;
  onShowHistory?: () => void;
};

export default function BottomNav({
  onShowChannels,
  onStop,
  onShowHistory,
}: BottomNavProps) {
  const handleShowChannels = () => (onShowChannels ? onShowChannels() : console.log("show channels"));  
  const handleShowHistory = () => (onShowHistory ? onShowHistory() : console.log("show history"));
  // -------- stations -------
  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]"
      aria-label="bottom navigation"
    >
      <div className="mx-auto max-w-screen-sm px-4 pb-4">
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-neutral-900/30 border border-white/30 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl">
          <div className="grid grid-cols-3 items-center">
            <GlassButton
              onClick={handleShowChannels}
              aria-label="نمایش لیست چنل ها"
              showShadow={false}
              hasBg={false}
              hasBorder={false}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <ListMusic className="h-6 w-6" />
                <span className="text-[11px]">چنل‌ها</span>
              </div>
            </GlassButton>
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
                <span className="text-[11px]">هیستوری</span>
              </div>
            </GlassButton>
          </div>
        </div>
      </div>
    </nav>
  );
}


