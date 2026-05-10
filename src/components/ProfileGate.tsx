import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { VelourProfileRow } from '../lib/profile';
import { fetchCurrentUserProfile } from '../lib/profile';
import ProfileFlow from './ProfileFlow';
import GeneratorScreen from './GeneratorScreen';
import HomeHeader from './HomeHeader';

const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_BOTTOM = '#151A40';
const GOLD = '#D4A93C';
const GATE_GOLD_BTN_SHADOW_IDLE = '0 8px 32px rgba(212,169,60,0.4)';
const GATE_GOLD_BTN_SHADOW_HOVER = '0 12px 40px rgba(212,169,60,0.55)';
const GATE_GOLD_BTN_TEXT = '#1A1F4A';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; profile: VelourProfileRow | null };

function isProfileComplete(profile: VelourProfileRow | null): boolean {
  return Boolean(profile?.profile_completed_at);
}

interface GateGoldChoiceButtonProps {
  children: ReactNode;
  onClick: () => void;
}

function GateGoldChoiceButton({ children, onClick }: GateGoldChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full flex-1 basis-0 shrink-0 items-center justify-center rounded-full border-0 px-4 py-[14px] text-[13px] font-semibold uppercase tracking-[0.12em] transition-[box-shadow,transform] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C96A]/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1F4A]"
      style={{
        fontFamily: 'Inter, sans-serif',
        background: GOLD,
        color: GATE_GOLD_BTN_TEXT,
        boxShadow: GATE_GOLD_BTN_SHADOW_IDLE,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = GATE_GOLD_BTN_SHADOW_HOVER;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = GATE_GOLD_BTN_SHADOW_IDLE;
      }}
    >
      {children}
    </button>
  );
}

export default function ProfileGate() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [userChoice, setUserChoice] = useState<'flow' | 'generator' | null>(null);

  const loadProfile = useCallback(async () => {
    setLoad({ status: 'loading' });
    try {
      const profile = await fetchCurrentUserProfile();
      setLoad({ status: 'ready', profile });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong loading your profile.';
      setLoad({ status: 'error', message });
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('velour-gate-choice');
      if (stored === 'flow' || stored === 'generator') {
        setUserChoice(stored);
        localStorage.removeItem('velour-gate-choice');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  if (load.status === 'loading') {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-5 px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <div
          className="h-11 w-11 shrink-0 rounded-full border-[3px] border-transparent border-t-[rgba(212,169,60,0.95)] border-r-[rgba(212,169,60,0.35)]"
          style={{ animation: 'profileGateSpin 0.85s linear infinite' }}
          role="status"
          aria-label="Loading"
        />
        <p
          className="text-center text-sm tracking-[0.02em]"
          style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(240,235,255,0.65)' }}
        >
          Loading your profile...
        </p>
        <style>{`
          @keyframes profileGateSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (load.status === 'error') {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <img
          src="/velour-logo.png"
          alt="Velour by Charlen Maison"
          className="block h-auto w-full max-w-[180px]"
          style={{ filter: 'drop-shadow(0 0 28px rgba(212, 169, 60, 0.28))' }}
        />
        <p className="max-w-md text-center text-sm leading-relaxed text-white/72" style={{ fontFamily: 'Inter, sans-serif' }}>
          {load.message}
        </p>
        <button
          type="button"
          onClick={() => void loadProfile()}
          className="rounded-lg border-0 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: GOLD,
            color: '#1A1F4A',
            boxShadow: '0 8px 32px rgba(212,169,60,0.35)',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (isProfileComplete(load.profile)) {
    return <GeneratorScreen />;
  }

  if (userChoice === 'flow') {
    return <ProfileFlow onExitToGate={() => setUserChoice(null)} />;
  }

  if (userChoice === 'generator') {
    return <GeneratorScreen />;
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-6 pb-[40px] pt-[96px] md:px-12"
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
      }}
    >
      <HomeHeader />
      <img
        src="/velour-logo.png"
        alt="Velour by Charlen Maison"
        className="relative mx-auto mb-12 block h-auto w-full max-w-[220px] md:max-w-[260px]"
        style={{ filter: 'drop-shadow(0 0 40px rgba(212, 169, 60, 0.3))' }}
      />

      <h1
        className="mb-4 max-w-xl text-center text-[clamp(24px,3.8vw,34px)] font-normal tracking-[-0.02em]"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
      >
        Welcome in
      </h1>

      <p
        className="mb-12 max-w-md text-center text-sm leading-relaxed text-white/72"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Set up your Perfect Audience Profile or head to the Content Generator.
      </p>

      <div className="flex w-full max-w-[min(560px,100%)] flex-col gap-4 sm:flex-row">
        <GateGoldChoiceButton onClick={() => setUserChoice('flow')}>AUDIENCE PROFILE</GateGoldChoiceButton>
        <GateGoldChoiceButton onClick={() => setUserChoice('generator')}>GENERATE CONTENT</GateGoldChoiceButton>
      </div>
    </div>
  );
}
