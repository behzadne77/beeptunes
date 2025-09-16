import { usePlayerStore } from "@/store/player";
import { useEffect } from "react";

type HiddenAudioPlayerProps = {
  src: string;
  title?: string;
  artist?: string;
  album?: string;
  cover?: string;
  duration?: number;
};
export default function HiddenAudioPlayer ({src, title, artist, album, cover, duration}: HiddenAudioPlayerProps) {
  const {setIsPlaying, nowPlayingByChannel} = usePlayerStore()
  const song = nowPlayingByChannel?.now_playing.song
  useEffect(()=> {
    if (song) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.text,
          artist: song.artist,
          album: song.album,
          artwork: [
            { src: song.art,   sizes: "512x512", type: "image/jpeg" }
          ]
        });
      }
    }
  }, [song])
  const handlePlay = () => {
    setIsPlaying(true)
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
    return (
        <audio
          src={src}
          autoPlay
          controls={true}
          preload="none"
          className="sr-only"
          id="main-audio-player"
          onPlay={handlePlay}
          onPause={handlePause}
          data-title={song?.title}
          data-artist={song?.artist}
          data-album={song?.album}
          data-cover={song?.art}
          data-duration={song?.duration}
        >
        </audio>
    );   
}