"use client";

import { usePlayerStore } from "@/store/player";

type EqualizerProps = {
  barCount?: number;
  width?: number;
  height?: number;
  colorClassName?: string;
  className?: string;
};

export default function Equalizer({
  barCount = 20,
  width = 2,
  height = 20,
  colorClassName = "bg-neutral-800",
  className,
}: EqualizerProps) {
  const {isPlaying} = usePlayerStore()
  const bars = Array.from({ length: barCount });
  return (
    <div className={`flex items-end gap-1 ${className ?? ""}`} role="img" aria-label="Equalizer animation">
      {bars.map((_, i) => {
        const delay = (i % 6) * 120; // ms
        const barHeight = height + ((i % 5) - 2) * 3; // variety
        return (
          <span
            key={i}
            className={`${colorClassName} inline-block rounded-sm`}
            style={{
              width,
              height: isPlaying ? barHeight : '30px',
              transform: !isPlaying ? 'scaleY(0.6)' : '',
              opacity: !isPlaying ? Math.random() : '',
              animation: isPlaying ? `eq-bounce 1.2s ${delay}ms ease-in-out infinite` as unknown as string : '',
              transformOrigin: "center bottom",
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes eq-bounce {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          25% { transform: scaleY(1.0); opacity: 1; }
          50% { transform: scaleY(0.6); opacity: 0.8; }
          75% { transform: scaleY(0.9); opacity: 0.9; }
          100% { transform: scaleY(0.4); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}


