import { useRef } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { FormData } from '../types';
import { badges } from '../data/badges';

interface RolIDCardProps {
  formData: FormData;
  onReset: () => void;
}

const phrases = [
  'Que tus replies fluyan y tu partner no ghostee 🎄',
  'Que Santa te traiga inspiración y respuestas a tiempo 🎁',
  'Que este diciembre venga con chats vivos ✨',
  'Que tus drafts se escriban solos y tu partner aparezca 🎄',
  'Que nunca falte inspiración ni replies pendientes (bueno, tal vez sí)',
  'Que el espíritu navideño desbloquee tu mejor reply'
]

export default function RolIDCard({ formData, onReset }: RolIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedBadgesData = badges.filter(badge =>
    formData.selectedBadges.includes(badge.id)
  );

  const getExperienceLabel = (value: string) => {
    const map: Record<string, string> = {
      'less-1': 'Menos de 1 año',
      '1-3': '1–3 años',
      'more-3': 'Más de 3 años',
      'mystery': 'Es un misterio'
    };
    return map[value] || value;
  };

  const getPronounsLabel = (value: string) => {
    const map: Record<string, string> = {
      'he/him': 'He/Him',
      'she/her': 'She/Her',
      'they/them': 'They/Them',
      'any': 'Any pronouns',
      'not-say': 'Prefer not to say'
    };
    return map[value] || value;
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `rol-id-${formData.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al descargar la imagen:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-red-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full flex items-center justify-center mb-6" style={{ perspective: '1000px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            aspectRatio: '16 / 9',
            transformOrigin: 'center',
            transform: 'scale(min(1, calc(100vw / 1100)))',
            marginBottom: 'calc(200px * (1 - min(1, calc(100vw / 1100))))'
          }}
        >
          <div ref={cardRef} className="bg-white rounded-2xl shadow-2xl h-full flex flex-col" id="rol-id">
            <div className="border-4 border-double border-emerald-600 rounded-xl p-6 h-full flex flex-col">
              <div className="text-center mb-3">
                <div className="inline-block bg-gradient-to-r from-emerald-600 to-red-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-1">
                  EDICIÓN NAVIDAD 2025
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Rolerx Oficial
                </h1>
                <div className="flex justify-center gap-1 mt-1">
                  <span className="text-lg">🎄</span>
                  <span className="text-lg">✨</span>
                  <span className="text-lg">🎭</span>
                </div>
              </div>

              <div className="flex gap-4 flex-1">
                <div className="flex-shrink-0">
                  {formData.photo && (
                    <img
                      src={formData.photo}
                      alt={formData.name}
                      className="h-32 w-32 object-cover rounded-lg border-3 border-gray-200"
                    />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Nombre</div>
                    <div className="text-xl font-bold text-gray-800 truncate">{formData.name}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Pronombres</div>
                      <div className="text-sm text-gray-700">{getPronounsLabel(formData.pronouns)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Experiencia</div>
                      <div className="text-sm text-gray-700">{getExperienceLabel(formData.experience)}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Insignias
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedBadgesData.map(badge => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-1 bg-gradient-to-r from-emerald-50 to-red-50 px-2 py-1 rounded border border-emerald-200 text-xs whitespace-nowrap"
                        >
                          <span className="text-sm">{badge.badge.emoji}</span>
                          <span className="font-medium text-gray-800 hidden sm:inline">{badge.badge.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-2 mt-3">
                <p className="text-center text-gray-600 italic text-xs leading-tight">
                  { phrases[Math.floor(Math.random() * phrases.length)] }
                </p>
                <p className="text-center text-xs text-gray-400 mt-1">
                  ID válida hasta que se acabe el drama • Secret Santa 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg shadow-lg"
        >
          <Download className="w-6 h-6" />
          Descargar mi ID
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-colors text-lg shadow-lg border-2 border-gray-300"
        >
          <RotateCcw className="w-6 h-6" />
          Crear otra ID
        </button>
      </div>
    </div>
  );
}
