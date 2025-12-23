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
          🎄 Secret Santa 🎄
        </h1>

        <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
          <p className="text-center text-lg">
            Hola Connor!
          </p>

          <p>
            No sabía tus gustos, pero sí que eres parte de este caos creativo llamado rolplay. Así que te dejo algo para usar, reírte o molestar a otros.
          </p>

          <p>
            Feliz Navidad
          </p>

          <p className="text-center font-medium text-emerald-700">
            — Tu Secret Santa 🎁
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
