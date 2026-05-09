/**
 * Velour app shell: ProfileGate entry (profile vs Generator), legacy 3-step Setup when BEGIN is used.
 * Auth gate: no session -> AuthScreen; session -> Velour app below.
 */
import { useCampaignStore } from './store/campaignStore';
import SetupFlow from './components/Setup/SetupFlow';
import ProfileGate from './components/ProfileGate';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGate from './components/AuthGate';

function VelourApp() {
  const creatorMode = useCampaignStore((s) => s.creatorMode);
  const showSetup = creatorMode === 'content-creator';

  if (!showSetup) {
    return (
      <ErrorBoundary>
        <>
          <ProfileGate />
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

function App() {
  return (
    <AuthGate>
      <VelourApp />
    </AuthGate>
  );
}

export default App;
