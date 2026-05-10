/**
 * Customer-clarity profile: 5-step shell (Phase A: placeholders + navigation).
 */
import { useCallback, useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { fetchCurrentUserProfile, updateProfileStep } from '../lib/profile';
import HomeHeader from './HomeHeader';

const GOLD = '#D4A93C';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT_BOTTOM = '#151A40';

const STEPS = [
  { id: 1, short: 'Who' },
  { id: 2, short: 'Before & After' },
  { id: 3, short: 'Real Problem' },
  { id: 4, short: 'Their Language' },
  { id: 5, short: 'Awareness' },
] as const;

const STEP_BODY: Record<number, { title: string; body: string }> = {
  1: {
    title: 'Who',
    body: "We'll work together to pinpoint exactly who your customer is — past the demographics, into the real human.",
  },
  2: {
    title: 'Before & After',
    body: "We'll explore the gap between where your customer is now and where they want to be.",
  },
  3: {
    title: 'Real Problem',
    body: "We'll dig past the surface complaint to find what's actually driving them.",
  },
  4: {
    title: 'Their Language',
    body: "We'll capture the exact words your customer uses — and the words they don't.",
  },
  5: {
    title: 'Awareness',
    body: "We'll pinpoint where your customer is on the journey from unaware to ready to buy.",
  },
};

export interface ProfileFlowProps {
  onExitToGate?: () => void;
}

export default function ProfileFlow({ onExitToGate }: ProfileFlowProps) {
  const [hydrated, setHydrated] = useState(false);
  const [hydrateError, setHydrateError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const p = await fetchCurrentUserProfile();
        if (cancelled) return;
        const raw = p?.profile_last_step;
        const n = typeof raw === 'number' && raw >= 1 && raw <= 5 ? raw : 1;
        setCurrentStep(n);
      } catch (e) {
        if (!cancelled) setHydrateError(e instanceof Error ? e.message : 'Could not load profile.');
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistStep = useCallback(async (step: number) => {
    try {
      await updateProfileStep(step);
    } catch (err) {
      console.error('updateProfileStep failed:', err);
    }
  }, []);

  const goNext = useCallback(() => {
    if (currentStep >= 5) return;
    const next = currentStep + 1;
    setCurrentStep(next);
    void persistStep(next);
  }, [currentStep, persistStep]);

  const goBack = useCallback(() => {
    if (currentStep <= 1) {
      onExitToGate?.();
      return;
    }
    const prev = currentStep - 1;
    setCurrentStep(prev);
    void persistStep(prev);
  }, [currentStep, onExitToGate, persistStep]);

  if (!hydrated) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <p className="text-sm text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
          Loading profile...
        </p>
      </div>
    );
  }

  if (hydrateError) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <p className="max-w-md text-center text-sm text-white/75" style={{ fontFamily: 'Inter, sans-serif' }}>
          {hydrateError}
        </p>
      </div>
    );
  }

  const copy = STEP_BODY[currentStep];

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
      }}
    >
      <HomeHeader />

      <div className="flex flex-1 flex-col pt-[72px] md:pt-20">
        <div className="border-b border-[rgba(212,169,60,0.12)] px-4 py-3 text-center md:hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span className="text-[13px] tracking-wide text-white/55">
            Step {currentStep} of 5
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <aside
            className="hidden w-[280px] shrink-0 flex-col border-[rgba(212,169,60,0.12)] py-8 pl-6 pr-4 md:flex md:border-r"
            style={{ paddingTop: '28px' }}
          >
            <p
              className="mb-6 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(212,169,60,0.45)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Steps
            </p>
            <nav className="flex flex-col gap-1">
              {STEPS.map((s) => {
                const done = currentStep > s.id;
                const active = currentStep === s.id;
                const upcoming = currentStep < s.id;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                    style={{
                      background: active ? 'rgba(212,169,60,0.08)' : 'transparent',
                      opacity: upcoming ? 0.38 : 1,
                    }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: done ? GOLD : 'transparent',
                        border: done ? 'none' : '1px solid rgba(212,169,60,0.35)',
                        color: done ? MIDNIGHT : active ? GOLD : 'rgba(212,169,60,0.45)',
                      }}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> : s.id}
                    </div>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: active ? 600 : 400,
                        color: active ? GOLD : 'rgba(240,235,255,0.82)',
                      }}
                    >
                      {s.short}
                    </span>
                  </div>
                );
              })}
            </nav>
          </aside>

          <main className="flex min-h-0 flex-1 flex-col px-5 pb-32 pt-8 md:px-10 md:pb-36 md:pt-10">
            <h1
              className="mb-3 text-[clamp(26px,4vw,34px)] font-normal tracking-[-0.02em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
            >
              {copy.title}
            </h1>

            {currentStep >= 2 ? (
              <span
                className="mb-4 inline-block self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  borderColor: 'rgba(212,169,60,0.35)',
                  color: 'rgba(212,169,60,0.85)',
                }}
              >
                Coming in A4
              </span>
            ) : null}

            <p className="max-w-2xl text-[15px] leading-relaxed text-white/75" style={{ fontFamily: 'Inter, sans-serif' }}>
              {copy.body}
            </p>

            <div
              className="mt-10 min-h-[120px] flex-1 rounded-xl border border-[rgba(212,169,60,0.15)] bg-[rgba(20,25,61,0.45)] p-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <p className="text-sm text-white/50">
                {currentStep === 1
                  ? 'Conversation UI arrives in Phase B. For now, use Continue to explore the shell.'
                  : 'Placeholder. Full experience in Phase A4.'}
              </p>
            </div>
          </main>
        </div>
      </div>

      <footer
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[rgba(212,169,60,0.12)] px-5 py-4 md:px-10"
        style={{ background: 'rgba(26,31,74,0.96)' }}
      >
        <button
          type="button"
          onClick={goBack}
          className="border-0 bg-transparent text-[12px] font-medium uppercase tracking-[0.1em]"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(212, 169, 60, 0.85)',
            cursor: 'pointer',
            opacity: 0.92,
          }}
        >
          {'<- Back'}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="rounded-lg border-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: GOLD,
            color: MIDNIGHT,
            cursor: currentStep >= 5 ? 'default' : 'pointer',
            opacity: currentStep >= 5 ? 0.45 : 1,
            boxShadow: currentStep >= 5 ? 'none' : '0 8px 28px rgba(212,169,60,0.35)',
          }}
          disabled={currentStep >= 5}
        >
          {'Continue ->'}
        </button>
      </footer>
    </div>
  );
}
