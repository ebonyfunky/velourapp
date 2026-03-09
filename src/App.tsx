// SAFE VERSION - Mode Selector and UGC Hub working - March 2026
import { useState, useEffect } from 'react';
import { useCampaignStore } from './store/campaignStore';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/Layout/ProgressBar';
import Step1 from './components/Steps/Step1';
import Step2 from './components/Steps/Step2';
import CreatorIdentity from './components/Steps/CreatorIdentity';
import CreatorPlatform from './components/Steps/CreatorPlatform';
import Step3 from './components/Steps/Step3';
import Step4 from './components/Steps/Step4';
import Step6 from './components/Steps/Step6';
import Step8 from './components/Steps/Step8';
import Step9 from './components/Steps/Step9';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelector from './components/ModeSelector';
import UGCHub from './components/UGCHub';
import Toast from './components/Toast';

function App() {
  const { creatorMode } = useCampaignStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('velour_welcomed');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleStepClick = (step: number) => {
    if (completedSteps.includes(step) || step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!creatorMode) {
    return <ModeSelector />;
  }

  if (creatorMode === 'ugc-creator') {
    return (
      <>
        <UGCHub />
        <Toast />
      </>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        minHeight: '100vh',
        width: '100%',
        background: '#12102a',
      }}
    >
      {showWelcome && <WelcomeScreen onDismiss={() => setShowWelcome(false)} />}
      <Sidebar currentStep={currentStep} onStepClick={handleStepClick} completedSteps={completedSteps} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <ProgressBar currentStep={currentStep} totalSteps={7} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minHeight: '100vh',
            padding: '40px',
            background: 'transparent',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              background: '#1c1a35',
              border: '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '20px',
              padding: '44px 48px',
              position: 'relative',
              overflow: 'visible',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
              display: 'block',
              visibility: 'visible',
              opacity: 1,
            }}
          >
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <CreatorIdentity onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
              <CreatorPlatform onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
              <Step3 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
              <Step4 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 5 ? 'block' : 'none' }}>
              <Step6 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 6 ? 'block' : 'none' }}>
              <Step8 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 7 ? 'block' : 'none' }}>
              <Step9
                onNext={() => {
                  setCurrentStep(1);
                  setCompletedSteps([]);
                }}
                onBack={handleBack}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
