/**
 * SIDEBAR ROUTING - DO NOT CHANGE:
 * - Velour ships a single creator experience: creatorMode === 'content-creator' uses ContentCreatorSidebar (7 steps).
 * - Content Creator = ContentCreatorSidebar from ./components/ContentCreator/ContentCreatorSidebar
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCampaignStore } from './store/campaignStore';
import ContentCreatorSidebar from './components/ContentCreator/ContentCreatorSidebar';
import ProgressBar from './components/Layout/ProgressBar';
import ContentCreatorFlow from './components/ContentCreator/ContentCreatorFlow';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelector from './components/ModeSelector';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { creatorMode, setField } = useCampaignStore();
  const showContentCreatorFlow = creatorMode === 'content-creator';
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [subProgress, setSubProgress] = useState(0);
  /** Step 2 Audience Avatar sub-question index (0-7), synced from ContentCreatorFlow while on Step 2. */
  const [audienceAvatarQuestionIndex, setAudienceAvatarQuestionIndex] = useState<number | null>(null);
  const prevCreatorModeRef = useRef<string>(creatorMode || '');

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('velour_welcomed');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    if (creatorMode === 'content-creator' && prevCreatorModeRef.current !== 'content-creator') {
      setCurrentStep(1);
      setCompletedSteps([]);
      setSubProgress(0);
      setAudienceAvatarQuestionIndex(null);
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

  if (!showContentCreatorFlow) {
    return (
      <ErrorBoundary>
        <>
          <ModeSelector />
          <Toast />
        </>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(180deg, #222A58 0%, #1A1F4A 48%, #151A40 100%)',
        }}
      >
        {showWelcome && <WelcomeScreen onDismiss={() => setShowWelcome(false)} />}
        <ContentCreatorSidebar
          currentStep={currentStep}
          onStepClick={handleStepClick}
          completedSteps={completedSteps}
          subProgress={subProgress}
          audienceAvatarQuestionIndex={audienceAvatarQuestionIndex}
          onResetContentCreator={() => {
            setCurrentStep(1);
            setCompletedSteps([]);
            setSubProgress(0);
            setAudienceAvatarQuestionIndex(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
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
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-0"
            style={{
              height: 'min(380px, 48vh)',
              background:
                'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(212, 169, 60, 0.10) 0%, transparent 72%)',
            }}
            aria-hidden
          />

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
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                background: '#252B5F',
                border: '1px solid rgba(212, 169, 60, 0.25)',
                borderRadius: '20px',
                padding: '44px 48px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
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
                  onAudienceAvatarQuestionIndex={setAudienceAvatarQuestionIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </ErrorBoundary>
  );
}

export default App;
