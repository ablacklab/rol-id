import { useState } from 'react';
import { FormData, Step } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import FormSteps from './components/FormSteps';
import RolIDCard from './components/RolIDCard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Step>('welcome');
  const [formData, setFormData] = useState<FormData>({
    name: 'Connor',
    pronouns: '',
    experience: '',
    photo: null,
    selectedBadges: []
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleStart = () => {
    setCurrentScreen('name');
  };

  const handleComplete = () => {
    setCurrentScreen('result');
  };

  const handleReset = () => {
    setFormData({
      name: 'Connor',
      pronouns: '',
      experience: '',
      photo: null,
      selectedBadges: []
    });
    setCurrentScreen('welcome');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentScreen === 'name' && (
        <FormSteps
          formData={formData}
          onUpdate={updateFormData}
          onComplete={handleComplete}
          onBack={handleBackToWelcome}
        />
      )}

      {currentScreen === 'result' && (
        <RolIDCard
          formData={formData}
          onReset={handleReset}
        />
      )}
    </>
  );
}

export default App;
