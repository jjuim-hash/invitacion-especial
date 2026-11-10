import React from 'react';
import * as Icons from 'lucide-react';

interface ActivitySelectorProps {
  onSelect: (activityName: string) => void;
}

const ACTIVITIES_LIST: { name: string; icon: keyof typeof Icons; description: string; tag: string }[] = [
  {
    name: 'Hora Santa 🕊️',
    icon: 'Flame',
    description: 'Un espacio sagrado de silencio, oración y agradecimiento a tu lado.',
    tag: 'Espiritual'
  },
  {
    name: 'Cena 🍽️',
    icon: 'Utensils',
    description: 'Una velada exquisita con velas, risas y platos deliciosos.',
    tag: 'Clásico'
  },
  {
    name: 'Paseo 🚶‍♀️',
    icon: 'Footprints',
    description: 'Caminar sin rumbo fijo por calles pintorescas conversando de la vida.',
    tag: 'Tranquilo'
  },
  {
    name: 'Café ☕',
    icon: 'Coffee',
    description: 'Una taza aromática, una tarde lluviosa y confesiones dulces.',
    tag: 'Cálido'
  },
  {
    name: 'Helado 🍦',
    icon: 'IceCream',
    description: 'Compartir sabores frescos y disfrutar de un momento dulce y sencillo.',
    tag: 'Casual'
  },
  {
    name: 'Ver el atardecer 🌅',
    icon: 'Sunset',
    description: 'Contemplar cómo el sol pinta el cielo de matices dorados.',
    tag: 'Mágico'
  },
  {
    name: 'Ir por tacos 🌮',
    icon: 'FlameKindling',
    description: 'El plan definitivo: sabor, autenticidad, risas y limón.',
    tag: 'Delicioso'
  },
  {
    name: 'Viaje corto 🚗',
    icon: 'Car',
    description: 'Música en la carretera, ventanas abajo y un destino sorpresa.',
    tag: 'Aventurero'
  },
  {
    name: 'Desayuno juntos 🥐',
    icon: 'Croissant',
    description: 'Comenzar el día con pan recién horneado y la mejor energía.',
    tag: 'Dulce'
  },
  {
    name: 'Ver las estrellas ✨',
    icon: 'Sparkles',
    description: 'Una manta en el pasto, el cielo nocturno y sueños compartidos.',
    tag: 'Romántico'
  },
  {
    name: 'Mirador 🌄',
    icon: 'Mountain',
    description: 'Contemplar las luces de la ciudad desde la cima del mundo.',
    tag: 'Espectacular'
  },
  {
    name: 'Ir a Misa ⛪',
    icon: 'Church',
    description: 'Compartir un momento de paz, fe y agradecimiento juntos.',
    tag: 'Especial'
  }
];

export default function ActivitySelector({ onSelect }: ActivitySelectorProps) {
  return (
    <div className="w-full flex flex-col h-full justify-between">
      <div className="text-center mb-6">
        <h1 className="font-serif text-[#8b5a3c] text-xl sm:text-2xl font-bold tracking-wide">
          ¿Qué te gustaría hacer?
        </h1>
        <div className="text-xs sm:text-sm text-[#a0826d] font-serif italic opacity-85 mt-1">
          Elige tu actividad favorita conmigo para nuestra gran cita...
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1 py-1 scrollbar-thin">
        {ACTIVITIES_LIST.map((act) => {
          const IconComponent = Icons[act.icon] as React.ComponentType<{ className?: string }>;

          return (
            <button
              key={act.name}
              onClick={() => onSelect(act.name)}
              className="group relative flex flex-col items-start p-4 text-left rounded-xl border-2 border-[#d4a574]/20 bg-[#faf8f3] hover:bg-[#fffdf9] hover:border-[#d4a574]/80 active:scale-[0.98] transition-all duration-300 shadow-[0_3px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(212,165,116,0.15)] focus:outline-none"
            >
              <span className="absolute top-3 right-3 text-[9px] font-mono tracking-wider uppercase bg-[#d4a574]/10 text-[#8b5a3c] px-2 py-0.5 rounded-full">
                {act.tag}
              </span>

              <div className="w-10 h-10 rounded-lg bg-[#d4a574]/10 text-[#8b5a3c] flex items-center justify-center mb-3 group-hover:bg-[#d4a574] group-hover:text-white transition-all duration-300">
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </div>

              <h3 className="font-serif text-[#5d4e37] font-semibold text-base mb-1 group-hover:text-[#8b5a3c] transition-colors duration-200">
                {act.name}
              </h3>
              <p className="text-xs text-[#a0826d] leading-relaxed line-clamp-2">
                {act.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}