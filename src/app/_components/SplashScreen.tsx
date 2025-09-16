"use client";

import Image from "next/image";

type SplashScreenProps = {
  logoSrc?: string;
  appName?: string;
  poweredByText?: string;
  className?: string;
};

export default function SplashScreen({
  appName = "خوش آمدید",
  poweredByText = "برگرفته شده از ای پی آی های بیپ‌تونز",
  className,
}: SplashScreenProps) {
  return (
    <section className={`flex items-center justify-center min-h-dvh bg-white ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-sm text-neutral-500">{poweredByText}</div>
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-200" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neutral-400 animate-spin [animation-duration:1.2s]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-neutral-300 animate-spin [animation-duration:2s]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/beeptunes.svg"
                alt="Beeptunes Logo"
                className="h-10 w-auto drop-shadow-sm"
                loading="eager"
                decoding="sync"
                width={80}
                height={80}
              />
            </div>
          </div>
          <h1 className="text-lg font-semibold mt-1">{appName}</h1>
        </div>
      </div>
    </section>
  );
}


