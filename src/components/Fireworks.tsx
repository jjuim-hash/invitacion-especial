import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface FireworksRef {
  launch: () => void;
}

const Fireworks = forwardRef<FireworksRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<any[]>([]);
  const rockets = useRef<any[]>([]);
  const isRunning = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    launch() {
      isRunning.current = true;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const colors = [
        ['#d4a574', '#e8c4a0', '#f5deb3'],
        ['#ffb6c1', '#ff69b4', '#ff1493'],
        ['#ffd700', '#ffec8b', '#fff8dc'],
        ['#dda0dd', '#da70d6', '#ba55d3'],
        ['#b0e0e6', '#87cefa', '#00bfff']
      ];

      const launchTimes = [0, 500, 1000, 1600, 2200, 2800];
      launchTimes.forEach((delay, i) => {
        setTimeout(() => {
          if (!canvasRef.current) return;
          const targetX = width * (0.2 + Math.random() * 0.6);
          const targetY = height * (0.15 + Math.random() * 0.35);
          createRocket(targetX, targetY, colors[i % colors.length]);
        }, delay);
      });

      if (animationFrameId.current === null) {
        animate();
      }

      setTimeout(() => {
        isRunning.current = false;
      }, 6000);
    }
  }));

  const createRocket = (targetX: number, targetY: number, colors: string[]) => {
    if (!canvasRef.current) return;
    const startX = targetX + (Math.random() - 0.5) * 100;
    rockets.current.push({
      x: startX,
      y: canvasRef.current.height,
      targetX,
      targetY,
      speed: 5 + Math.random() * 3,
      colors,
      trail: []
    });
  };

  const explode = (x: number, y: number, colors: string[]) => {
    const count = 70 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25;
      const speed = 2 + Math.random() * 4.5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.01 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 2,
        gravity: 0.04 + Math.random() * 0.03
      });
    }

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        color: '#ffffff',
        size: 1.2,
        gravity: 0.015
      });
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isRunning.current && particles.current.length === 0 && rockets.current.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationFrameId.current = null;
      return;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = rockets.current.length - 1; i >= 0; i--) {
      const r = rockets.current[i];
      const dx = r.targetX - r.x;
      const dy = r.targetY - r.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 12) {
        explode(r.x, r.y, r.colors);
        rockets.current.splice(i, 1);
        continue;
      }

      r.x += (dx / dist) * r.speed;
      r.y += (dy / dist) * r.speed;

      r.trail.push({ x: r.x, y: r.y, life: 1 });
      if (r.trail.length > 15) r.trail.shift();

      r.trail.forEach((t: any) => {
        t.life -= 0.06;
        if (t.life > 0) {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1.4 * t.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 165, 116, ${t.life * 0.7})`;
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff0dc';
      ctx.fill();
    }

    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.current.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      id="fireworksCanvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
});

Fireworks.displayName = 'Fireworks';
export default Fireworks;