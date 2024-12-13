import React, { useRef, useState } from "react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Hàm phát nhạc
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Error playing audio:", err);
          alert(
            "Nhạc không chạy được. Kiểm tra đường dẫn hoặc quyền trình duyệt."
          );
        });
    }
  };

  // Hàm tạm dừng nhạc
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="text-center">
      {/* Audio element */}
      <audio ref={audioRef} src="/music/music5.mp3" loop autoPlay />

      {/* Custom controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePlay}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </button>
        <button
          onClick={handlePause}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </button>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        onChange={(e) => {
          if (audioRef.current) {
            audioRef.current.volume = parseFloat(e.target.value);
          }
        }}
      />

      {/* Hiển thị trạng thái */}
      <div className="mt-2 text-pink-400">
        {isPlaying ? "Playing ... 🎵" : "Paused 🚫"}
      </div>
    </div>
  );
};

export default MusicPlayer;
