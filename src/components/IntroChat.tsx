import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

interface IntroChatProps {
  onComplete: () => void;
}

const NARRATIVE_SCREENS = [
  [
    "Hay alguien especial en mi vida...",
    "Alguien que me hace sonreír sin razón.",
    "Alguien cuya presencia ilumina mis días."
  ],
  [
    "Y he estado esperando el momento perfecto...",
    "Un momento único para abrir mi corazón.",
    "Donde las palabras dejen de ser solo pensamientos."
  ],
  [
    "Porque cada conversación contigo se siente diferente.",
    "Como si el tiempo pasara demasiado rápido.",
    "Como si nunca quisiera que terminara."
  ],
  [
    "Y después de pensarlo mucho...",
    "Me di cuenta de algo.",
    "Prefiero intentarlo que quedarme con la duda."
  ],
  [
    "Así que quiero preguntarte algo...",
    "¿Te gustaría salir conmigo? 💜"
  ]
];

const SCREEN_TITLES = [
  "Tengo algo que decirte...",
  "He estado pensando...",
  "Hay algo diferente...",
  "Quiero ser sincero...",
  "Una última pregunta..."
];

export default function IntroChat({ onComplete }: IntroChatProps) {
  const [currentScreenIdx, setCurrentScreenIdx] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [isScreenFading, setIsScreenFading] = useState(false);
  
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  const handleNoInteraction = (e: React.MouseEvent) => {
    e.preventDefault();
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    
    setNoPosition({ x: randomX, y: randomY });
    setNoScale((prev) => Math.max(0, prev - 0.18));
    setYesScale((prev) => Math.min(2.0, prev + 0.15));
  };
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let active = true;
    const currentLines = NARRATIVE_SCREENS[currentScreenIdx];

    const displayLines = async () => {
      setMessages([]);
      setShowContinueBtn(false);

      for (let i = 0; i < currentLines.length; i++) {
        if (!active) return;

        setIsTyping(true);
        const typingDelay = 1000 + Math.random() * 800;
        await new Promise((resolve) => setTimeout(resolve, typingDelay));

        if (!active) return;
        setIsTyping(false);

        const now = new Date();
        const timestamp = now.toLocaleTimeString('es', {
          hour: '2-digit',
          minute: '2-digit'
        });

        const newMessage: ChatMessage = {
          id: `${currentScreenIdx}-${i}-${now.getTime()}`,
          text: currentLines[i],
          sender: 'them',
          timestamp
        };

        setMessages((prev) => [...prev, newMessage]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      if (currentScreenIdx < NARRATIVE_SCREENS.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3200));
        if (!active) return;
        
        setIsScreenFading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!active) return;

        setIsScreenFading(false);
        setCurrentScreenIdx((prev) => prev + 1);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (active) {
          setShowContinueBtn(true);
        }
      }
    };

    displayLines();

    return () => {
      active = false;
    };
  }, [currentScreenIdx]);

  return (
    <div className="w-full flex flex-col h-full min-h-[380px] justify-between">
      <div className="text-center mb-6">
        <h1 className="font-serif text-[#8b5a3c] text-xl sm:text-2xl font-bold tracking-wide transition-all duration-500">
          {SCREEN_TITLES[currentScreenIdx]}
        </h1>
        <div className="text-xs sm:text-sm text-[#a0826d] font-serif italic tracking-wide opacity-80 mt-1 animate-pulse">
          {isTyping ? 'Alguien te está escribiendo...' : 'Mensajes especiales recibidos'}
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto px-1 py-4 flex flex-col gap-4 max-h-[280px] sm:max-h-[320px] transition-all duration-500 ${
          isScreenFading ? 'opacity-0 translate-y-[-10px]' : 'opacity-100 translate-y-0'
        }`}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="flex justify-start w-full"
            >
              <div className="relative max-w-[85%] bg-gradient-to-br from-[#ede5d8] to-[#e8ddd0] border border-[#d4a574]/20 rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <p className="font-serif italic text-[#5d4e37] text-sm sm:text-base leading-relaxed tracking-wide">
                  {msg.text}
                </p>
                <div className="text-[9px] text-[#b0a090] font-mono text-right mt-1.5 leading-none">
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
            <div className="bg-gradient-to-br from-[#ede5d8] to-[#e8ddd0] rounded-2xl rounded-tl-sm px-5 py-3 shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#b0a090] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#b0a090] rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <span className="w-2 h-2 bg-[#b0a090] rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 min-h-[90px] w-full px-4 overflow-visible">
        {showContinueBtn && (
          <>
            <button
              onClick={onComplete}
              style={{
                transform: `scale(${yesScale})`,
                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              className="z-20 bg-gradient-to-r from-[#8b5a3c] to-[#d4a574] text-stone-50 font-semibold border-2 border-[#8b5a3c] py-3 px-6 rounded-xl shadow-lg hover:shadow-[0_8px_25px_rgba(139,90,60,0.45)] active:scale-95 transition-all duration-300 font-serif whitespace-nowrap text-xs sm:text-sm"
            >
              ¡Sí quiero salir contigo! 💖
            </button>

            {noScale > 0.15 && (
              <button
                onClick={handleNoInteraction}
                onMouseEnter={handleNoInteraction}
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="z-10 bg-stone-100 hover:bg-stone-200 text-[#a0826d] font-semibold border border-stone-300/60 py-2.5 px-5 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all duration-300 font-serif whitespace-nowrap text-xs sm:text-sm"
              >
                No quiero salir contigo 💔
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}