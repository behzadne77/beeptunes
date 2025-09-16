import { usePlayerStore } from "@/store/player";

type HiddenAudioPlayerProps = {
  src: string;
};
export default function HiddenAudioPlayer ({src}: HiddenAudioPlayerProps) {
  const {setIsPlaying} = usePlayerStore()
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
        >
        </audio>
    );   
}