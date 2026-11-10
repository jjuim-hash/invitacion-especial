import { useState } from 'react';
import { Copy, MessageSquare, Share2, ArrowLeft, Calendar, Clock, Sparkles, Link2, Link } from 'lucide-react';

interface InvitationResultProps {
  choices: {
    activity: string | null;
    day: string;
    time: string;
    reason: string;
  };
  onReset: () => void;
}

const POEMS_MAP: Record<string, string[]> = {
  'Hora Santa 🕊️': [
    "En el silencio y la paz, acompañarte en oración es un verdadero regalo.",
    "Poner nuestras vidas y anhelos en presencia de Dios, juntos.",
    "Un momento sagrado que ilumina el corazón cuando se comparte contigo."
  ],
  'Cena 🍽️': [
    "Bajo la luz suave de las velas.",
    "Las mejores conversaciones nacen alrededor de una mesa.",
    "Quizá la comida sea buena, pero tu compañía sería lo mejor de la noche."
  ],
  'Paseo 🚶‍♀️': [
    "Caminar contigo convertiría cualquier calle en una aventura.",
    "Hay lugares hermosos en el mundo, pero me gustaría descubrirlos contigo.",
    "A veces el mejor destino es simplemente caminar a tu lado."
  ],
  'Café ☕': [
    "Una taza de café siempre sabe mejor con buena compañía.",
    "Entre el aroma del café y una buena conversación podrían nacer recuerdos hermosos.",
    "Me gustaría compartir contigo una tarde sencilla pero inolvidable."
  ],
  'Helado 🍦': [
    "Los mejores momentos suelen empezar con algo sencillo.",
    "Un helado contigo suena como un recuerdo bonito esperando nacer.",
    "Quizá se derrita el helado, pero espero que el momento permanezca."
  ],
  'Ver el atardecer 🌅': [
    "Hay atardeceres hermosos, pero creo que serían mejores contigo.",
    "Los colores del cielo siempre lucen mejor cuando se comparten.",
    "Me gustaría guardar contigo uno de esos momentos que parecen eternos."
  ],
  'Ir por tacos 🌮': [
    "No sé si los tacos serán memorables, pero tu compañía sí.",
    "Entre risas y tacos podrían nacer recuerdos inolvidables.",
    "A veces los mejores planes son los más sencillos."
  ],
  'Viaje corto 🚗': [
    "No importa el destino cuando la compañía es la correcta.",
    "Las mejores historias suelen comenzar con un pequeño viaje.",
    "Me gustaría descubrir nuevos lugares contigo."
  ],
  'Desayuno juntos 🥐': [
    "Empezar el día contigo suena como una excelente idea.",
    "Entre café y conversación podría comenzar algo bonito.",
    "Hay mañanas que merecen compartirse."
  ],
  'Ver las estrellas ✨': [
    "Las estrellas brillan mucho, pero me interesa más la persona a mi lado.",
    "Una noche tranquila puede convertirse en un recuerdo inolvidable.",
    "Me gustaría perder la noción del tiempo mirando el cielo contigo."
  ],
  'Mirador 🌄': [
    "Las mejores vistas se disfrutan más cuando se comparten.",
    "Un paisaje hermoso merece una compañía especial.",
    "Quizá la vista sea increíble, pero no sería lo mejor de la tarde."
  ],
  'Ir a Misa ⛪': [
    "Agradecer por los momentos compartidos y poner nuestro camino en buenas manos.",
    "Un momento de paz y serenidad se vuelve aún más especial a tu lado.",
    "Compartir la fe y la gratitud contigo hace que cada instante tenga un sentido hermoso."
  ]
};

export default function InvitationResult({ choices, onReset }: InvitationResultProps) {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [genTo, setGenTo] = useState('');
  const [genFrom, setGenFrom] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleGeneratePersonalizedUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (genTo) params.set('to', genTo.trim());
    if (genFrom) params.set('from', genFrom.trim());
    
    const finalUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    navigator.clipboard.writeText(finalUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const activityKey = choices.activity || 'Café ☕';
  const lines = POEMS_MAP[activityKey] || POEMS_MAP['Café ☕'];
  const formattedPoem = lines.join('\n');

  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getShareText = () => {
    return `📱 ¡SÍ, ACEPTO TU INVITACIÓN! 💕\n\n✨ Actividad: ${choices.activity}\n📅 Día: ${formatDate(choices.day)}\n🕐 Hora: ${choices.time} hrs\n💬 Mensaje: "${choices.reason}"\n\n📝 Carta de promesa:\n${formattedPoem}\n\nFirmado con todo mi cariño ✍️💜`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText()).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    });
  };

  const handleWhatsApp = () => {
    const text = getShareText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Invitación Especial Aceptada 💜',
        text: getShareText(),
      }).catch(err => console.log('Share canceled or failed', err));
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full flex flex-col h-full justify-between items-center">
      <div className="w-full space-y-6">
        
        <div className="relative w-full bg-gradient-to-br from-[#fcfaf5] to-[#f5f1e8] border-[3px] border-[#d4a574] rounded-2xl p-6 text-center shadow-lg overflow-hidden">
          <div className="text-[#d4a574]/40 font-serif text-lg leading-none select-none mb-3">
            ✦ 💜 ✦
          </div>

          <h1 className="font-serif text-[#8b5a3c] text-xl sm:text-2xl font-bold tracking-wide mb-1">
            Nuestra Cita Especial
          </h1>
          <div className="text-[11px] text-[#a0826d] font-serif italic tracking-wide mb-6">
            Una promesa sellada con el corazón
          </div>

          <div className="bg-[#fcfcfc]/80 border border-[#d4a574]/20 rounded-xl p-5 mb-5 text-left shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] relative">
            <p className="font-serif italic text-[#5d4e37] text-sm sm:text-base leading-loose whitespace-pre-line tracking-wide">
              {formattedPoem}
            </p>
            <div className="mt-4 pt-4 border-t border-[#d4a574]/10 text-xs sm:text-sm text-[#8b5a3c] font-serif italic">
              " {choices.reason} "
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#d4a574]/10 to-[#c9945f]/5 rounded-xl p-4 text-left border-l-4 border-[#d4a574] space-y-2 mb-5">
            <div className="flex items-center gap-2 text-xs text-[#5d4e37]">
              <Sparkles className="w-4 h-4 text-[#d4a574]" />
              <span className="font-semibold text-[#8b5a3c]">Plan:</span> {choices.activity}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5d4e37]">
              <Calendar className="w-4 h-4 text-[#d4a574]" />
              <span className="font-semibold text-[#8b5a3c]">Día:</span> {formatDate(choices.day)}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5d4e37]">
              <Clock className="w-4 h-4 text-[#d4a574]" />
              <span className="font-semibold text-[#8b5a3c]">Hora:</span> {choices.time} hrs
            </div>
          </div>

          <div className="text-[10px] text-[#c9a87c] font-mono tracking-wider mt-5 uppercase">
            Sello de Promesa Activa
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-[#faf8f3] border-2 border-[#d4a574]/40 text-[#8b5a3c] hover:bg-white hover:border-[#8b5a3c] py-3 px-4 rounded-xl font-serif text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all duration-200"
            >
              <Copy className="w-4 h-4" />
              Copiar Texto
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59] border-2 border-[#128C7E] py-3 px-4 rounded-xl font-serif text-sm font-semibold shadow-md active:scale-95 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Enviar WhatsApp
            </button>
          </div>

          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 bg-[#5d4e37] text-[#fffcf5] border-2 border-[#3d2817] hover:bg-[#4a3a25] py-3 px-4 rounded-xl font-serif text-sm font-semibold shadow-md active:scale-95 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
            Compartir Invitación
          </button>
        </div>

        {copyFeedback && (
          <div className="bg-[#fffefb] border border-[#d4a574]/30 rounded-xl p-2.5 text-center text-xs sm:text-sm text-[#8b5a3c] font-serif tracking-wide shadow-sm animate-fade-in flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#d4a574] animate-spin" style={{ animationDuration: '3s' }} />
            ¡Respuesta copiada con éxito! Compártela con tu persona especial 💜
          </div>
        )}

        <div className="bg-[#fffdfa] border-2 border-dashed border-[#d4a574]/30 rounded-2xl p-4 sm:p-5 mt-6">
          <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8b5a3c] flex items-center gap-1.5 justify-center mb-1">
            <Link2 className="w-4 h-4 text-[#d4a574]" />
            ¿Quieres crear tu propio link personalizado? 🔗
          </h3>
          <p className="text-[10px] text-[#a0826d] text-center mb-4 leading-relaxed max-w-[340px] mx-auto">
            Escribe tu nombre y el de tu persona especial para generar un enlace único con el sobre ya personalizado para ellos.
          </p>
          <div className="space-y-3 max-w-[300px] mx-auto">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[8px] font-mono uppercase tracking-wider text-[#a0826d] mb-1">Para (Su Nombre)</label>
                <input
                  type="text"
                  value={genTo}
                  onChange={(e) => setGenTo(e.target.value)}
                  placeholder="Ej: Sofía"
                  className="w-full text-xs font-serif bg-white border border-[#d4a574]/30 rounded-lg px-2.5 py-1.5 text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#8b5a3c] focus:border-[#8b5a3c]"
                />
              </div>
              <div>
                <label className="block text-[8px] font-mono uppercase tracking-wider text-[#a0826d] mb-1">De (Tu Nombre)</label>
                <input
                  type="text"
                  value={genFrom}
                  onChange={(e) => setGenFrom(e.target.value)}
                  placeholder="Ej: Carlos"
                  className="w-full text-xs font-serif bg-white border border-[#d4a574]/30 rounded-lg px-2.5 py-1.5 text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#8b5a3c] focus:border-[#8b5a3c]"
                />
              </div>
            </div>
            <button
              onClick={handleGeneratePersonalizedUrl}
              className="w-full bg-[#8b5a3c] hover:bg-[#724a30] text-white py-2 px-3 rounded-xl font-serif text-xs font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Link className="w-3.5 h-3.5" />
              Copiar Link Personalizado ✨
            </button>
          </div>
          {copiedLink && (
            <div className="mt-2 text-center text-[10px] text-[#20ba59] font-serif animate-fade-in">
              ¡Enlace personalizado copiado! Envíaselo directamente 💖
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#a0826d] hover:text-[#8b5a3c] font-serif font-semibold tracking-wider uppercase transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  );
}