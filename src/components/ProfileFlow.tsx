/**
 * Audience Avatar profile shell: Step 1 profession form, Steps 2-5 placeholders.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { fetchCurrentUserProfile, saveStep1Profession, updateProfileStep } from '../lib/profile';
import { useCampaignStore } from '../store/campaignStore';
import HomeHeader from './HomeHeader';

const GOLD = '#D4A93C';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT_BOTTOM = '#151A40';

const OFFER_MAX = 500;

/** Dropdown order: 10 defaults then Other. */
const PROFESSION_OPTIONS = [
  'Coach',
  'Consultant',
  'Course Creator',
  'Educator',
  'Service Provider',
  'Content Creator',
  'Author',
  'Speaker',
  'Affiliate Marketer',
  'Product Seller',
  'Other',
] as const;

const STANDARD_PROFESSIONS = PROFESSION_OPTIONS.slice(0, -1);
const OTHER_OPTION = 'Other' as const;

const STEPS = [
  { id: 1, short: 'Your Profession' },
  { id: 2, short: 'Their Demographics' },
  { id: 3, short: 'Their Goals & Fears' },
  { id: 4, short: 'Their Interests' },
  { id: 5, short: 'Their Wants' },
] as const;

const STEP_BODY: Record<number, { title: string; body: string }> = {
  1: {
    title: 'Your Profession',
    body: "Let's start with you. What you do shapes who you can serve and how you talk to them.",
  },
  2: {
    title: 'Their Demographics',
    body: "Now we map your audience. Age, life stage, career, income - the foundation everything else sits on.",
  },
  3: {
    title: 'Their Goals & Fears',
    body: "What are they moving toward? What keeps them up at night? This is where content stops being generic.",
  },
  4: {
    title: 'Their Interests',
    body: "What do they engage with online? What content do they consume? Where do they spend their attention?",
  },
  5: {
    title: 'Their Wants',
    body: 'What do they crave - and just as important, what repels them? This protects your voice.',
  },
};

function isStandardProfession(value: string): boolean {
  return (STANDARD_PROFESSIONS as readonly string[]).includes(value);
}

function hydrateProfessionFields(stored: string | null): { select: string; other: string } {
  const trimmed = stored?.trim() ?? '';
  if (!trimmed) return { select: '', other: '' };
  if (isStandardProfession(trimmed)) return { select: trimmed, other: '' };
  return { select: OTHER_OPTION, other: trimmed };
}

export interface ProfileFlowProps {
  onExitToGate?: () => void;
}

export default function ProfileFlow({ onExitToGate }: ProfileFlowProps) {
  const setCreatorProfession = useCampaignStore((s) => s.setCreatorProfession);
  const setCreatorOfferDescription = useCampaignStore((s) => s.setCreatorOfferDescription);

  const [hydrated, setHydrated] = useState(false);
  const [hydrateError, setHydrateError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [professionSelect, setProfessionSelect] = useState('');
  const [otherProfession, setOtherProfession] = useState('');
  const [offerDescription, setOfferDescription] = useState('');

  const [step1SaveError, setStep1SaveError] = useState<string | null>(null);
  const [step1Saving, setStep1Saving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const p = await fetchCurrentUserProfile();
        if (cancelled) return;
        const raw = p?.profile_last_step;
        const n = typeof raw === 'number' && raw >= 1 && raw <= 5 ? raw : 1;
        setCurrentStep(n);
        if (p) {
          const { select, other } = hydrateProfessionFields(p.creator_profession);
          setProfessionSelect(select);
          setOtherProfession(other);
          setOfferDescription(p.creator_offer_description ?? '');
        }
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

  const professionToSave = useMemo(() => {
    if (professionSelect === OTHER_OPTION) return otherProfession.trim();
    if (professionSelect) return professionSelect;
    return '';
  }, [professionSelect, otherProfession]);

  const step1FormValid = useMemo(() => {
    if (!professionSelect) return false;
    if (professionSelect === OTHER_OPTION && otherProfession.trim().length < 1) return false;
    if (offerDescription.trim().length < 1) return false;
    return true;
  }, [professionSelect, otherProfession, offerDescription]);

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

  const handleStep1Continue = useCallback(async () => {
    if (!step1FormValid || step1Saving) return;
    const prof = professionToSave;
    const offer = offerDescription.slice(0, OFFER_MAX).trim();
    if (!prof || offer.length < 1) return;

    setStep1SaveError(null);
    setStep1Saving(true);
    try {
      setCreatorProfession(prof);
      setCreatorOfferDescription(offer);
      await saveStep1Profession(prof, offer);
      await updateProfileStep(2);
      setCurrentStep(2);
    } catch {
      setStep1SaveError("Couldn't save. Please try again.");
    } finally {
      setStep1Saving(false);
    }
  }, [
    step1FormValid,
    step1Saving,
    professionToSave,
    offerDescription,
    setCreatorProfession,
    setCreatorOfferDescription,
  ]);

  const continueDisabled =
    currentStep >= 5 || (currentStep === 1 && (!step1FormValid || step1Saving));

  const handleContinueClick = useCallback(() => {
    if (currentStep === 1) {
      void handleStep1Continue();
      return;
    }
    goNext();
  }, [currentStep, handleStep1Continue, goNext]);

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
  const offerLen = offerDescription.length;

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
              {currentStep === 1 ? (
                <div className="flex max-w-xl flex-col gap-8">
                  <div>
                    <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="profession-select">
                      What do you do?
                    </label>
                    <select
                      id="profession-select"
                      value={professionSelect}
                      onChange={(e) => {
                        setProfessionSelect(e.target.value);
                        if (e.target.value !== OTHER_OPTION) setOtherProfession('');
                      }}
                      className="w-full rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition focus:border-[rgba(212,169,60,0.65)] focus:ring-1 focus:ring-[rgba(212,169,60,0.35)]"
                    >
                      <option value="" disabled>
                        Select your profession
                      </option>
                      {PROFESSION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1A1F4A] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {professionSelect === OTHER_OPTION ? (
                      <div className="mt-4">
                        <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="profession-other">
                          Describe your profession
                        </label>
                        <input
                          id="profession-other"
                          type="text"
                          value={otherProfession}
                          onChange={(e) => setOtherProfession(e.target.value)}
                          autoComplete="off"
                          className="w-full rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-[rgba(212,169,60,0.65)] focus:ring-1 focus:ring-[rgba(212,169,60,0.35)]"
                          placeholder="Describe your profession"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="offer-desc">
                      What do you sell or offer?
                    </label>
                    <p className="mb-2 text-[13px] text-white/45">Describe what your audience gets from you. One or two sentences is enough.</p>
                    <div className="relative">
                      <textarea
                        id="offer-desc"
                        rows={3}
                        maxLength={OFFER_MAX}
                        value={offerDescription}
                        onChange={(e) => setOfferDescription(e.target.value.slice(0, OFFER_MAX))}
                        className="w-full resize-y rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.06] px-4 py-3 pb-9 text-base leading-relaxed text-white outline-none transition placeholder:text-white/35 focus:border-[rgba(212,169,60,0.65)] focus:ring-1 focus:ring-[rgba(212,169,60,0.35)]"
                        placeholder="Tell us what you offer"
                      />
                      <div className="pointer-events-none absolute bottom-3 right-3 text-[11px] text-white/35">
                        {offerLen} / {OFFER_MAX}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/50">Form arrives in A4. For now, use Continue to explore the shell.</p>
              )}
            </div>
          </main>
        </div>
      </div>

      <footer
        className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-stretch border-t border-[rgba(212,169,60,0.12)] px-5 py-4 md:px-10"
        style={{ background: 'rgba(26,31,74,0.96)' }}
      >
        <div className="flex w-full items-center justify-between gap-4">
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
            onClick={handleContinueClick}
            className="rounded-lg border-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: GOLD,
              color: MIDNIGHT,
              cursor: continueDisabled ? 'default' : 'pointer',
              opacity: continueDisabled ? 0.45 : 1,
              boxShadow: continueDisabled ? 'none' : '0 8px 28px rgba(212,169,60,0.35)',
            }}
            disabled={continueDisabled}
          >
            {'Continue ->'}
          </button>
        </div>
        {currentStep === 1 && step1SaveError ? (
          <p className="mt-3 text-center text-[13px] text-red-300/90" style={{ fontFamily: 'Inter, sans-serif' }}>
            {step1SaveError}
          </p>
        ) : null}
      </footer>
    </div>
  );
}
