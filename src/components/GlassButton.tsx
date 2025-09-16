"use client";

import React from "react";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asCircle?: boolean;
  inset?: boolean;
  isGlass?: boolean;
  showShadow?: boolean;
  hasBg?: boolean;
  hasBorder?: boolean;
};

export default function GlassButton({
  asCircle = false,
  inset = false,
  className = "",
  isGlass = true,
  showShadow = true,
  hasBg = true,
  hasBorder = true,
  children,
  ...rest
}: GlassButtonProps) {
  const base ="relative select-none active:scale-95 transition-transform text-neutral-800 dark:text-neutral-100";
  const glass = isGlass ? "backdrop-blur-xl": ''
  const border = hasBorder ? "border border-white/40 dark:border-white/10" : '';
  const shadow = showShadow ? "shadow-lg" : ''
  const Bg = hasBg ? "bg-white/30 dark:bg-neutral-800/60" : ''
  const shape = asCircle ? "rounded-full" : "rounded-xl";
  const padding = asCircle ? "h-16 w-16 flex items-center justify-center" : "px-4 py-3";
  const offset = inset ? "-mt-7 translate-y-[-6px]" : "";

  return (
    <button className={`${base} ${glass} ${Bg} ${shape} ${padding} ${offset} ${shadow} ${border} ${className}`} {...rest}>
      {children}
    </button>
  );
}



