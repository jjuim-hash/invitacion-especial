import React, { useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface ScheduleFormProps {
  selectedActivity: string;
  onSubmit: (data: { day: string; time: string; reason: string }) => void;
  onBack: () => void;
}

export default function ScheduleForm({ selectedActivity, onSubmit, onBack }: ScheduleFormProps) {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !time || !reason.trim()) return;
    onSubmit({ day, time, reason: reason.trim() });
  };

  return (
    <div className="w-full flex flex-col h-full justify-between">
      <div className="text-center mb-5">
        <h1 className="font-serif text-[#8b5a3c] text-xl sm:text-2xl font-bold tracking-wide">
          Agendar nuestra cita 💕
        </h1>
        <div className="text-xs sm:text-sm text-[#a0826d] font-serif italic opacity-85 mt-1">
          Elige los detalles perfectos para nuestro encuentro...
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#d4a574]/10 to-[#c9945f]/5 border-l-4 border-[#d4a574] rounded-r-xl p-3 sm:p-4 mb-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.01)] animate-fade-in">
        <div className="text-[10px] uppercase font-mono tracking-wider text-[#a0826d] mb-0.5">Actividad Seleccionada</div>
        <div className="font-serif text-base font-semibold text-[#8b5a3c] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#d4a574]" />
          {selectedActivity}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="text-left">
          <label className="block text-xs sm:text-sm font-semibold text-[#8b5a3c] mb-1.5 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#d4a574]" />
            ¿Qué día prefieres?
          </label>
          <input
            type="date"
            min={todayDate}
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#fffefc] border-2 border-[#d4a574]/30 rounded-xl font-sans text-sm sm:text-base text-[#5d4e37] focus:outline-none focus:border-[#8b5a3c] focus:bg-white transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
          />
        </div>

        <div className="text-left">
          <label className="block text-xs sm:text-sm font-semibold text-[#8b5a3c] mb-1.5 flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#d4a574]" />
            ¿A qué hora?
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#fffefc] border-2 border-[#d4a574]/30 rounded-xl font-sans text-sm sm:text-base text-[#5d4e37] focus:outline-none focus:border-[#8b5a3c] focus:bg-white transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
          />
        </div>

        <div className="text-left">
          <label className="block text-xs sm:text-sm font-semibold text-[#8b5a3c] mb-1.5">
            ¿Por qué te gustaría salir conmigo?
          </label>
          <textarea
            rows={2}
            maxLength={180}
            placeholder="Escribe algo especial, tierno o gracioso..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#fffefc] border-2 border-[#d4a574]/30 rounded-xl font-serif text-sm sm:text-base text-[#5d4e37] focus:outline-none focus:border-[#8b5a3c] focus:bg-white transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] resize-none"
          />
          <div className="text-right text-[10px] text-[#a0826d] font-mono mt-0.5">
            {reason.length}/180 caracteres
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border-2 border-[#d4a574]/40 text-[#8b5a3c] py-3 rounded-xl hover:bg-[#d4a574]/5 hover:border-[#8b5a3c] transition-all duration-200 font-serif font-medium"
          >
            Atrás
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#d4a574] to-[#c9945f] text-white py-3 rounded-xl border-2 border-[#a0826d] hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 transition-all duration-200 font-serif font-medium"
          >
            Siguiente ✨
          </button>
        </div>
      </form>
    </div>
  );
}