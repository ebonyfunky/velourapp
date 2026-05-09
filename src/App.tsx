/**
 * Velour app shell: homepage (ModeSelector) or 3-step Setup + Phase B placeholder.
 */
import { useState, useEffect } from 'react';
import { useCampaignStore } from './store/campaignStore';
import SetupFlow from './components/Setup/SetupFlow';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelector from './components/ModeSelector';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const creatorMode = useCampaignStore((s) => s.creatorMode);
  const showSetup = creatorMode === 'content-creator';
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('velour_welcomed');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);
  if (!showSetup) {
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
        <SetupFlow />
      </div>
      <Toast />
    </ErrorBoundary>
  );
}

export default App;
