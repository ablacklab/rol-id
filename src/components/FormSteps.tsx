import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { FormData } from '../types';
import { badges } from '../data/badges';
import ProgressBar from './ProgressBar';

interface FormStepsProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export default function FormSteps({ formData, onUpdate, onComplete, onBack }: FormStepsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const pronounOptions = [
    { value: 'he/him', label: 'He / Him' },
    { value: 'she/her', label: 'She / Her' },
    { value: 'they/them', label: 'They / Them' },
    { value: 'any', label: 'Any pronouns' },
    { value: 'not-say', label: 'Prefiero no decirlo' },
  ];

  const experienceOptions = [
    { value: 'less-1', label: 'Menos de 1 año' },
    { value: '1-3', label: '1–3 años' },
    { value: 'more-3', label: 'Más de 3 años' },
    { value: 'mystery', label: 'Es un misterio' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onUpdate({ photo: null });
  };

  const toggleBadge = (badgeId: string) => {
    const isSelected = formData.selectedBadges.includes(badgeId);

    if (isSelected) {
      onUpdate({
        selectedBadges: formData.selectedBadges.filter(id => id !== badgeId)
      });
    } else {
      if (formData.selectedBadges.length < 3) {
        onUpdate({
          selectedBadges: [...formData.selectedBadges, badgeId]
        });
      }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.pronouns.length > 0;
      case 3:
        return formData.experience.length > 0;
      case 4:
        return formData.photo !== null;
      case 5:
        return formData.selectedBadges.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-red-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Cuál es tu nombre?</h2>
              <p className="text-gray-600 mb-6">El nombre que usas como uss</p>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Connor"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none text-lg"
                autoFocus
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Cuáles son tus pronombres?</h2>
              <p className="text-gray-600 mb-6">Selecciona la opción que prefieras</p>
              <div className="space-y-3">
                {pronounOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.pronouns === option.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pronouns"
                      value={option.value}
                      checked={formData.pronouns === option.value}
                      onChange={(e) => onUpdate({ pronouns: e.target.value })}
                      className="mr-3 w-5 h-5 text-emerald-600"
                    />
                    <span className="text-lg">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Cuánto tiempo llevas roleando?</h2>
              <p className="text-gray-600 mb-6">Acá no juzgamos, todos empezamos en algún momento</p>
              <div className="space-y-3">
                {experienceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.experience === option.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={option.value}
                      checked={formData.experience === option.value}
                      onChange={(e) => onUpdate({ experience: e.target.value })}
                      className="mr-3 w-5 h-5 text-emerald-600"
                    />
                    <span className="text-lg">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Foto para tu carnet</h2>
              <p className="text-gray-600 mb-6">Puede ser tu OC, un meme, lo que quieras</p>

              {!formData.photo ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-gray-600 font-medium">Click para subir imagen</span>
                  <span className="text-gray-400 text-sm mt-1">PNG, JPG, GIF hasta 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Me identifico con...</h2>
              <p className="text-gray-600 mb-2">Selecciona hasta 3 frases que te representen</p>
              <p className="text-sm text-emerald-600 mb-6">
                {formData.selectedBadges.length}/3 seleccionadas
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {badges.map((badge) => {
                  const isSelected = formData.selectedBadges.includes(badge.id);
                  const isDisabled = !isSelected && formData.selectedBadges.length >= 3;

                  return (
                    <label
                      key={badge.id}
                      className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleBadge(badge.id)}
                        disabled={isDisabled}
                        className="mt-1 mr-3 w-5 h-5 text-emerald-600"
                      />
                      <div>
                        <div className="text-lg font-medium">{badge.label}</div>
                        {/*<div className="text-sm text-gray-500 mt-1">
                          {badge.badge.emoji} {badge.badge.title}
                        </div>*/}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              canProceed()
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps ? 'Ver mi ID' : 'Siguiente'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
