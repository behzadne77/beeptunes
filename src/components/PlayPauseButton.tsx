"use client";
import { PlayCircle, StopCircle } from "lucide-react";
import GlassButton from "./GlassButton";
import { useState } from "react";

export default function PlayPauseButton () {
    const audioElementId = "main-audio-player"
    const [isPlaying, setIsPlaying] = useState(false)

    const toggle = async () => {
        const el = document.getElementById(audioElementId) as HTMLAudioElement | null;
        if (!el) return;
        try {
            if (el.paused) {
                const prevSrc = el.src;
                if (!prevSrc || prevSrc === window.location.href) {
                    el.src = prevSrc;
                } else {
                    el.src = prevSrc;
                    el.load();
                }
                el.muted = false;
                await el.play();
                setIsPlaying(true);
            } else {
                el.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            console.log("error in toggle", error)
        }
    };
    return (
        <GlassButton onClick={toggle} aria-label="توقف پخش" asCircle inset className="mx-auto bg-white/80">
            {!isPlaying && (
                <PlayCircle className="h-8 w-8 text-green-500" />
            )}
            {isPlaying && (
                <StopCircle className="h-8 w-8 text-red-600" />
            )}
        </GlassButton>
    )
}