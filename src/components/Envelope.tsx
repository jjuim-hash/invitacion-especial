import { useState } from 'react';
import { MailOpen } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  to?: string;
  from?: string;
}

export default function Envelope({ onOpen, to, from }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 1800);
  };

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#3d2817] via-[#2d1b0f] to-[#1e1109] cursor-pointer transition-all duration-[800ms] ease-in-out ${
        isFading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,165,116,0.06)_0%,transparent_60%)]" />

      <div className="font-serif text-[#d4a574] text-lg sm:text-xl tracking-[3px] mb-10 animate-pulse text-center px-4">
        {to ? `¡Hola ${to}! Tienes una carta especial...` : 'Tienes una carta especial...'}
      </div>

      <div className="relative w-[280px] sm:w-[360px] h-[190px] sm:h-[240px] perspective-1000 group">
        <div
          className={`absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-[#dcc8a8] to-[#e8d5b8] clip-polygon-flap origin-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 shadow-md ${
            isOpen ? 'transform rotateX-180 -translate-y-[1px]' : 'rotateX-0'
          }`}
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d0] to-[#e8d5b8] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,165,116,0.1)] z-10 overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-br from-[#ecdcc4] to-[#e0ccb0]"
            style={{
              clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
            }}
          />
        </div>

        <div
          className={`absolute left-[8%] right-[8%] bottom-[5%] h-[75%] bg-gradient-to-br from-[#fffdfa] to-[#fdf7ee] rounded-md shadow-md z-15 flex flex-col items-center justify-center p-3 text-center transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpen ? '-translate-y-[110%] scale-[1.05]' : 'translate-y-0'
          }`}
        >
          <div className="font-serif text-[#8b5a3c] text-xs sm:text-sm font-semibold leading-relaxed tracking-wide flex flex-col items-center justify-center gap-1">
            {to && (
              <span className="text-[#a0826d] text-[9px] sm:text-[10px] uppercase font-mono tracking-widest border-b border-[#d4a574]/25 pb-0.5 mb-1">
                Para: {to}
              </span>
            )}
            <span className="text-sm sm:text-base">Una invitación <br /> especial para ti ✨</span>
            {from && (
              <span className="text-[#a0826d] text-[9px] sm:text-[10px] italic font-serif mt-1 font-normal">
                de parte de: {from}
              </span>
            )}
          </div>
          <MailOpen className="w-4 h-4 text-[#c9945f]/60 mt-2 animate-bounce" />
        </div>

        <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
          {!isOpen && (
            <>
              <div className="absolute w-20 h-20 rounded-full bg-[#d4a574]/20 animate-ping opacity-75" style={{ animationDuration: '2s' }} />
              <div className="absolute w-16 h-16 rounded-full bg-[#8b5a3c]/30 animate-pulse opacity-60" style={{ animationDuration: '1s' }} />
            </>
          )}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-radial from-[#c9945f] via-[#a0724a] to-[#8b5a3c] flex items-center justify-center text-2xl sm:text-3xl shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.25)] transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 active:scale-95 select-none ${
              isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
            }`}
          >
            💜
          </div>
        </div>
      </div>

      <div className="font-sans text-xs text-[#d4a574]/60 tracking-wider mt-12 animate-pulse text-center px-4">
        Toca el sobre o el sello para abrir
      </div>
    </div>
  );
}