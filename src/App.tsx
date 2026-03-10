// Content Creator flow: Step 1 (Who Are You), Step 2 (Audience Avatar), Step 3 (Content Project), then Creator Identity, etc.
import { useState, useEffect, useCallback } from 'react';
import { useCampaignStore } from './store/campaignStore';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/Layout/ProgressBar';
import ContentCreatorStep1 from './components/Steps/ContentCreatorStep1';
import ContentCreatorStep2 from './components/Steps/ContentCreatorStep2';
import ContentCreatorStep3 from './components/Steps/ContentCreatorStep3';
import CreatorPlatform from './components/Steps/CreatorPlatform';
import Step3 from './components/Steps/Step3';
import Step9 from './components/Steps/Step9';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelector from './components/ModeSelector';
import UGCHub from './components/UGCHub';
import Toast from './components/Toast';

function App() {
  const { creatorMode, setField } = useCampaignStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [subProgress, setSubProgress] = useState(0);

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

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      setField('creatorMode', '');
      setCurrentStep(1);
      setSubProgress(0);
    } else {
      setCurrentStep((prev) => prev - 1);
      setSubProgress(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, setField]);

  const handleNext = useCallback(() => {
    setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
    setCurrentStep((prev) => prev + 1);
    setSubProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

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
        <ProgressBar currentStep={currentStep} totalSteps={6} subProgress={subProgress} />

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
              <ContentCreatorStep1 onNext={handleNext} onBack={handleBack} onSubProgress={setSubProgress} />
            </div>
            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
              <ContentCreatorStep2 onNext={handleNext} onBack={handleBack} onSubProgress={setSubProgress} />
            </div>
            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
              <ContentCreatorStep3 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
              <CreatorPlatform onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 5 ? 'block' : 'none' }}>
              <Step3 onNext={handleNext} onBack={handleBack} />
            </div>
            <div style={{ display: currentStep === 6 ? 'block' : 'none' }}>
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
