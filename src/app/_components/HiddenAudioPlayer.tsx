type HiddenAudioPlayerProps = {
  src: string;
};
export default function HiddenAudioPlayer ({src}: HiddenAudioPlayerProps) {
    return (
        <audio
          src={src}
          autoPlay
          controls={false}
          preload="none"
          className="sr-only hidden"
          hidden
          id="main-audio-player"
        />
    );   
}