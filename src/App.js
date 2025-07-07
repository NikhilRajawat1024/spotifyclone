import { useState, useRef, useEffect } from "react";
import "./App.css";

const songsData = [
  {
    id: 1,
    title: "Radha Krishna",
    artist: "Mr. Mohit Lalwani",
    src: "/songs/radhakrishna.mp3",
    cover: "/covers/spotifyclone.png",
  },
];

function App() {
  const [songs] = useState(songsData);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);
  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };
  const playPrev = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <div className="player-container">
        <div className="player-left">
          <img
            src={songs[currentSongIndex].cover}
            alt="cover"
            className="cover-art"
          />
          <div className="song-info">
            <h2 className="song-title">{songs[currentSongIndex].title}</h2>
            <h4 className="song-artist">{songs[currentSongIndex].artist}</h4>
          </div>
        </div>

        <div className="player-center">
          <div className="controls">
            <button className="btn" onClick={playPrev} aria-label="Previous">
              ⏮️
            </button>
            <button className="btn play-pause" onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button className="btn" onClick={playNext} aria-label="Next">
              ⏭️
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="progress-bar"
            // You can add progress handling here later
            readOnly
          />
        </div>

        <div className="player-right">
          {/* Optional: Add volume or other controls here */}
        </div>

        <audio
          src={songs[currentSongIndex].src}
          ref={audioRef}
          onEnded={playNext}
        />
      </div>
    </div>
  );
}

export default App;
