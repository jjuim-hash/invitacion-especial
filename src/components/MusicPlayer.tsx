import { useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioUrl = "https://dl.dropboxusercontent.com/scl/fi/juso4l3n9v0az3kbb29hl/the-most-inspirational-romantic-music.mp3?rlkey=3l7a2luixwtjhrbd3r7n22ep3&raw=1";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const targetVolume = 0.4;
    const fadeDuration = 3000;
    const intervalTime = 100;
    const volumeStep = targetVolume / (fadeDuration / intervalTime);

    let fadeInterval: NodeJS.Timeout | null = null;

    const startFadeIn = () => {
      if (fadeInterval) clearInterval(fadeInterval);
      
      fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
          audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
        } else {
          if (fadeInterval) clearInterval(fadeInterval);
        }
      }, intervalTime);
    };

    const tryPlay = () => {
      audio.play()
        .then(() => {
          startFadeIn();
          cleanListeners();
        })
        .catch((err) => {
          console.log("Autoplay bloqueado, esperando interacción del usuario:", err);
        });
    };

    const cleanListeners = () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    };

    tryPlay();

    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
    document.addEventListener('keydown', tryPlay);

    return () => {
      cleanListeners();
      if (fadeInterval) clearInterval(fadeInterval);
      audio.pause();
    };
  }, []);

  return null;
}