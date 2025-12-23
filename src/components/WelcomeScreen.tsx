import { Gift } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-red-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Gift className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          🎄 Secret Santa Rolero 🎄
        </h1>

        <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
          <p className="text-center text-lg">
            ¡Hola, rolero/a!
          </p>

          <p>
            Este año, tu Secret Santa ha preparado algo especial para ti:
            <strong> tu propio carnet de roleplay oficial</strong>.
            Porque después de tantas replies, dramas y personajes inolvidables,
            te mereces un reconocimiento en toda regla.
          </p>

          <p>
            Completa este formulario rápido y genera tu ID personalizada
            con las insignias que mejor te representen como rolero/a.
            Podrás descargarla y presumirla donde quieras.
          </p>

          <p className="text-center font-medium text-emerald-700">
            Que tus replies fluyan y tus partners no ghosteen este 2025. 🎁
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
}
