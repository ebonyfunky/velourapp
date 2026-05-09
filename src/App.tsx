/**
 * Velour app shell: homepage with BEGIN (ModeSelector), then 3-step Setup + Phase B placeholder.
 */
import { useCampaignStore } from './store/campaignStore';
import SetupFlow from './components/Setup/SetupFlow';
import ModeSelector from './components/ModeSelector';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const creatorMode = useCampaignStore((s) => s.creatorMode);
  const showSetup = creatorMode === 'content-creator';

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
        <SetupFlow />
      </div>
      <Toast />
    </ErrorBoundary>
  );
}

export default App;
