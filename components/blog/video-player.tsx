"use client"
import React, { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface CustomVideoPlayerProps {
  videoSrc: string;
}

export const VideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [currentVolume, setCurrentVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start muted for autoplay
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(Date.now());
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleVideoEnd);

    // Attempt autoplay
    video.muted = true; // Mute initially to allow autoplay
    video.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error("Autoplay failed:", error);
      // If autoplay fails, we keep the video paused and unmuted
      video.muted = false;
      setIsMuted(false);
    });

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      setLastMouseMoveTime(Date.now());
      setShowControls(true);
    };

    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };

    const checkMouseInactivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime > 3000 && isFullscreen) {
        setShowControls(false);
      }
    };

    if (playerRef.current) {
      playerRef.current.addEventListener("mousemove", handleMouseMove);
      playerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    const inactivityInterval = setInterval(checkMouseInactivity, 1000);

    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener("mousemove", handleMouseMove);
        playerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearInterval(inactivityInterval);
    };
  }, [isFullscreen, lastMouseMoveTime]);

  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => console.error("Play failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newTime = (Number(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);

    !isMuted ? setVolume(0) : setVolume(currentVolume);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newVolume = Number(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setCurrentVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={playerRef}
      className={`flex flex-col justify-center items-center w-full relative ${
        !isMounted ? 'h-0 pb-[56.25%]' : ''
      }`}
    >
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
          onClick={togglePlay}
          playsInline
          muted={isMuted}
          loop
        >
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
            <Play size={64} className="text-white opacity-50" />
          </div>
        )}
      </div>
      <div
        className={`
          text-white
          bg-black bg-opacity-50
          p-2 w-full absolute
          bottom-0
          left-0
          transition-opacity duration-300 ease-in-out
          ${showControls ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex items-center justify-between">
          <button aria-label="play button" onClick={togglePlay} className="p-1 bg-transparent border-none cursor-pointer flex items-center justify-center mr-0 text-inherit">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full mx-2 cursor-pointer"
          />
          <div className="flex items-center">
            <button aria-label="volume button" onClick={toggleMute} className="p-1">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 mx-2 hidden sm:block"
            />
            <button aria-label="fullscreen button" onClick={toggleFullscreen} className="p-1">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};