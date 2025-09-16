"use client";

import { useEffect } from "react";
import { useNowPlaying } from "@/queries/nowPlaying";
import { NowPlayingResponse } from "@/types/play";
import Image from "next/image";
import Equalizer from "./Equalizer";
import HiddenAudioPlayer from "./HiddenAudioPlayer";

export default function NowPlayingComponent() {
    const {data, isLoading, error, refetch } = useNowPlaying()

    // Always register the timer hook to satisfy hooks rules
    useEffect(() => {
        const list = (data as NowPlayingResponse) || [];
        const current = list[0];
        if (!current) return;
        const remainingSec = current.now_playing?.remaining ?? 0;
        const safeRemainingMs = Math.max(remainingSec * 1000 - 250, 500);
        const timer = setTimeout(() => {
            refetch();
        }, safeRemainingMs);
        return () => clearTimeout(timer);
    }, [data, refetch]);
    if (isLoading) {
        return (
            <section>در حال بارگذاری ...</section>
        )
    }
    if (error) {
        return (
            <section>مشکل در دریافت اطلاعات. دوباره تلاش نمایید.</section>
        )
    }
    const nowPlaying = (data as NowPlayingResponse) || []
    const mainPlay = nowPlaying[0] || null
    if (!mainPlay) {
        return <section>موردی برای پخش وجود ندارد.</section>
    }

    const cover = mainPlay.now_playing.song.art;
    const title = mainPlay.now_playing.song.title;
    const artist = mainPlay.now_playing.song.artist;
    const streamUrl = mainPlay.station.listen_url;

    // (timer effect moved above to avoid conditional hooks)

    return (
        <section className="relative min-h-dvh w-full overflow-hidden">
            {/* Blurred full-screen background */}
            <div className="absolute inset-0 -z-10">
                {cover ? (
                    <Image
                        src={cover}
                        alt={title}
                        fill
                        priority
                        className="object-cover blur-[2px] grayscale scale-110 opacity-40"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-400" />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/10" />
            </div>

            {/* Foreground content */}
            <div className="relative mx-auto max-w-3xl px-4 py-10 flex flex-col items-center gap-6 text-center">
                {cover && (
                    <div className="relative w-60 h-60 rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
                        <Image
                            src={cover}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="240px"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="text-neutral-600">{artist}</p>
                </div>

                <Equalizer className="mt-2" colorClassName="bg-neutral-700" width={3} height={24} />

                {/* Hidden audio player */}
                <HiddenAudioPlayer src={streamUrl}/>

            </div>
        </section>
    )
}