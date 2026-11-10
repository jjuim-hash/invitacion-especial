import { useState, useRef, useEffect } from 'react';
import Loader from './components/Loader';
import Envelope from './components/Envelope';
import MusicPlayer from './components/MusicPlayer';
import Fireworks, { FireworksRef } from './components/Fireworks';
import IntroChat from './components/IntroChat';
import ActivitySelector from './components/ActivitySelector';
import ScheduleForm from './components/ScheduleForm';
import InvitationResult from './components/InvitationResult';
import HeartsOverlay from './components/HeartsOverlay';
import { InvitationState } from './types';

export default function App() {
  const [phase, setPhase] = useState<InvitationState['currentPhase']>('loading');
  
  const [personalizedTo, setPersonalizedTo] = useState('');
  const [personalizedFrom, setPersonalizedFrom] = useState('');
  
  const [choices, setChoices] = useState<{
    activity: string | null;
    day: string;
    time: string;
    reason: string;
  }>({
    activity: null,
    day: '',
    time: '',
    reason: '',
  });

  const [bgStars, setBgStars] = useState<{ id: number; left: string; top: string; delay: string }[]>([]);
  const [bgParticles, setBgParticles] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([]);

  const fireworksRef = useRef<FireworksRef | null>(null);

  // Generar estrellas y partículas flotantes al montar
  useEffect(() => {
    const stars = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));

    const particles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${6 + Math.random() * 5}s`,
    }));

    setBgStars(stars);
    setBgParticles(particles);

    // Leer parámetros de URL si viene personalizado (?to=Nombre&from=TuNombre)
    const params = new URLSearchParams(window.location.search);
    const toVal = params.get('to') || params.get('para') || '';
    const fromVal = params.get('from') || params.get('de') || '';
    if (toVal) setPersonalizedTo(toVal.trim());
    if (fromVal) setPersonalizedFrom(fromVal.trim());
  }, []);

  const handleLoaderComplete = () => {
    setPhase('envelope');
  };

  const handleEnvelopeOpen = () => {
    setPhase('chat');
  };

  const handleChatComplete = () => {
    setPhase('activities');
  };

  const handleActivitySelect = (actName: string) => {
    setChoices((prev) => ({ ...prev, activity: actName }));
    setPhase('schedule');
  };

  const handleScheduleSubmit = (data: { day: string; time: string; reason: string }) => {
    setChoices((prev) => ({ ...prev, ...data }));
    setPhase('certificate');
    
    // Lanzar fuegos artificiales al aceptar
    setTimeout(() => {
      fireworksRef.current?.launch();
    }, 200);
  };

  const handleReset = () => {
    setChoices({
      activity: null,
      day: '',
      time: '',
      reason: '',
    });
    setPhase('chat');
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#3d2817] via-[#5c4033] to-[#3d2817] text-stone-800 flex items-center justify-center p-4 overflow-x-hidden md:p-6 select-none font-sans">
      
      {/* Efecto interactivo de corazones flotantes al hacer click o tap */}
      <HeartsOverlay />

      {/* Resplandor cálido de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(255,215,0,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,192,203,0.06)_0%,transparent_50%)] pointer-events-none" />

      {/* Cielo estrellado animado */}
      {phase !== 'loading' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Estrellas titilantes */}
          {bgStars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full animate-twinkle"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Partículas de polvo de estrellas */}
          {bgParticles.map((p) => (
            <div
              key={`particle-${p.id}`}
              className="absolute w-1 h-1 bg-[#ffdfad]/35 rounded-full animate-float-particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Canvas de fuegos artificiales */}
      <Fireworks ref={fireworksRef} />

      {/* Reproductor de música romántica */}
      {phase !== 'loading' && <MusicPlayer />}

      {/* 1. Fase de Carga Inicial */}
      {phase === 'loading' && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* 2. Fase de Sobre Interactivo 3D con Sello */}
      {phase === 'envelope' && (
        <Envelope
          to={personalizedTo}
          from={personalizedFrom}
          onOpen={handleEnvelopeOpen}
        />
      )}

      {/* Contenedor Principal estilo pergamino / tarjeta elegante */}
      {phase !== 'loading' && phase !== 'envelope' && (
        <div
          className="relative w-full max-w-[620px] bg-[#faf8f3] border-[4px] border-[#d4a574] rounded-[24px] px-5 py-8 sm:px-10 sm:py-10 shadow-[0_30px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.7),0_0_120px_rgba(212,165,116,0.15)] z-10 transition-all duration-500 animate-slide-in overflow-y-auto max-h-[92vh]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,165,116,0.03) 2px, rgba(212,165,116,0.03) 4px)'
          }}
        >
          {/* Estrella dorada decorativa superior */}
          <div className="text-center text-[#d4a574] text-xl select-none leading-none mb-3 opacity-80">
            ✦
          </div>

          {/* 3. Fase de Chat Narrativo con botón evasivo */}
          {phase === 'chat' && (
            <IntroChat onComplete={handleChatComplete} />
          )}

          {/* 4. Selector de Actividades */}
          {phase === 'activities' && (
            <ActivitySelector onSelect={handleActivitySelect} />
          )}

          {/* 5. Formulario de Fecha, Hora y Motivo */}
          {phase === 'schedule' && (
            <ScheduleForm
              selectedActivity={choices.activity || ''}
              onSubmit={handleScheduleSubmit}
              onBack={() => setPhase('activities')}
            />
          )}

          {/* 6. Certificado Final, Poema y Compartir por WhatsApp */}
          {phase === 'certificate' && (
            <InvitationResult choices={choices} onReset={handleReset} />
          )}
        </div>
      )}
    </div>
  );
}