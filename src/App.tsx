// Content Creator flow: 7 steps (Creator Identity, Audience Avatar, Niche, Content Type, Faceless/Face, Script Generator, 30 Day Calendar).
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCampaignStore } from './store/campaignStore';
import Sidebar from './components/Layout/Sidebar';
import ProgressBar from './components/Layout/ProgressBar';
import ContentCreatorFlow from './components/ContentCreator/ContentCreatorFlow';
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
  const prevCreatorModeRef = useRef<string>(creatorMode || '');

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('velour_welcomed');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  // When user clicks "Start Creating", always start at Step 1.
  useEffect(() => {
    if (creatorMode === 'content-creator' && prevCreatorModeRef.current !== 'content-creator') {
      setCurrentStep(1);
      setCompletedSteps([]);
      setSubProgress(0);
    }
    prevCreatorModeRef.current = creatorMode || '';
  }, [creatorMode]);

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
        <ProgressBar currentStep={currentStep} totalSteps={7} subProgress={subProgress} />

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
            <div style={{ display: 'block' }}>
              <ContentCreatorFlow
                currentStep={currentStep}
                onNext={handleNext}
                onBack={handleBack}
                onSubProgress={setSubProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
