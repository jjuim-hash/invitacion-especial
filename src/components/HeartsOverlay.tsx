import React, { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

export default function HeartsOverlay() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const emojis = ['💜', '💖', '✨', '💕', '❤️', '🌸'];

  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      // Obtener posición del clic o toque
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Crear un nuevo corazón flotante con rotación y tamaño aleatorio
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 16 + Math.random() * 24, // Entre 16px y 40px
        rotation: (Math.random() - 0.5) * 40, // Entre -20deg y 20deg
      };

      // Limitar a máximo 25 corazones simultáneos para cuidar el rendimiento
      setHearts((prev) => [...prev, newHeart].slice(-25));
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Limpiar corazones que ya hayan terminado su animación (vida de 1.5s)
  useEffect(() => {
    if (hearts.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setHearts((prev) => prev.filter((h) => now - h.id < 1500));
    }, 300);

    return () => clearInterval(interval);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-center select-none"
          style={{
            left: h.x,
            top: h.y,
            fontSize: `${h.size}px`,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`,
            animation: 'driftUpAndFade 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}