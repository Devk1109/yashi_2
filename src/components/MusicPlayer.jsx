import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    },
    pause: () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
    },
    toggle: () => {
      toggleMusic();
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.55;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        className={`music-toggle ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause festive music" : "Play festive music"}
      >
        <span className="music-disc" aria-hidden="true">
          {isPlaying ? "💿" : "🎵"}
        </span>
        <span className="music-text">
          {isPlaying ? "Pause Music" : "Play Music"}
        </span>
        {isPlaying && (
          <span className="equalizer" aria-hidden="true">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </span>
        )}
      </button>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;

