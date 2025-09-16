"use client";
import { PlayCircle, StopCircle } from "lucide-react";
import GlassButton from "./GlassButton";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/player";

export default function PlayPauseButton () {
    const {isPlaying} = usePlayerStore()
    const audioElementId = "main-audio-player"
    const [isPlayingState, setIsPlayingState] = useState(false)
    useEffect(() => {
        setIsPlayingState(isPlaying)
    }, [isPlaying])
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
                setIsPlayingState(true);
            } else {
                el.pause();
                setIsPlayingState(false);
            }
        } catch (error) {
            console.log("error in toggle", error)
        }
    };
    return (
        <GlassButton onClick={toggle} aria-label="توقف پخش" asCircle inset className="mx-auto bg-white/80">
            {!isPlayingState && (
                <PlayCircle className="h-8 w-8 text-green-500" />
            )}
            {isPlayingState && (
                <StopCircle className="h-8 w-8 text-red-600" />
            )}
        </GlassButton>
    )
}