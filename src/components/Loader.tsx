import { useEffect, useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${3 + Math.random() * 3}s`
    }));
    setParticles(generated);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 6;
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-radial from-[#3a2012] via-[#24140b] to-[#120a05] text-white select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,165,116,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,90,60,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-[-10px] w-[3px] h-[3px] bg-[#d4a574] rounded-full animate-float-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#d4a574] border-r-[rgba(212,165,116,0.25)] animate-spin" style={{ animationDuration: '1.2s' }} />
        <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-[#c9945f] border-l-[rgba(201,148,95,0.25)] animate-reverse-spin" style={{ animationDuration: '1.6s' }} />
        
        <div className="animate-pulse duration-1000 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(212,165,116,0.6)]">
          <Heart className="w-12 h-12 text-[#d4a574] fill-[#d4a574]/40" strokeWidth={1.5} />
        </div>
      </div>

      <div className="font-serif text-[#d4a574] text-lg sm:text-xl tracking-[4px] uppercase animate-pulse mb-6 px-4 text-center">
        Preparando algo especial
      </div>

      <div className="w-[200px] sm:w-[280px] h-1 bg-[rgba(212,165,116,0.12)] rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
        <div
          className="h-full bg-gradient-to-r from-[#d4a574] via-[#e8c4a0] to-[#d4a574] rounded-full transition-all duration-200 ease-out shadow-[0_0_8px_rgba(212,165,116,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-[10px] font-mono text-[#d4a574]/50 tracking-[1px] mt-2">
        {Math.round(progress)}%
      </div>
    </div>
  );
}