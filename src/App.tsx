/**
 * Velour app shell: ProfileGate entry (profile vs Generator).
 * Auth gate: no session -> AuthScreen; session -> Velour app below.
 */
import ProfileGate from './components/ProfileGate';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGate from './components/AuthGate';

function VelourApp() {
  return (
    <ErrorBoundary>
      <>
        <ProfileGate />
        <Toast />
      </>
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
