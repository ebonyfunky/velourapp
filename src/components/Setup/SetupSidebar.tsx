/**
 * Velour Setup sidebar (3-step setup + Phase B teaser when complete).
 */
import { ArrowLeft, Check } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';

const WARM_GOLD = '#D4A93C';
const MIDNIGHT_BLUE = '#1A1F4A';
const SIDEBAR_BG = '#14193D';

export const SETUP_STEPS = [
  { number: 1, title: 'Profession' },
  { number: 2, title: 'Audience' },
  { number: 3, title: 'Voice' },
] as const;

interface SetupSidebarProps {
  phase: 'steps' | 'placeholder';
  setupStep: number;
  furthestStep: number;
  onStepClick: (step: number) => void;
}

export default function SetupSidebar({ phase, setupStep, furthestStep, onStepClick }: SetupSidebarProps) {
  const resetMode = useCampaignStore((s) => s.resetMode);
  const signOut = useCampaignStore((s) => s.signOut);

  const sidebarProgressPct =
    phase === 'placeholder' ? 100 : Math.min(100, Math.max(0, ((setupStep - 1) / 3) * 100));

  const handleBackToHome = () => {
    resetMode();
  };

  return (
    <div
      className="relative z-20 flex w-[240px] flex-shrink-0 flex-col self-stretch"
      style={{
        background: SIDEBAR_BG,
        borderRight: '1px solid rgba(212, 169, 60, 0.15)',
        alignSelf: 'stretch',
        minHeight: '100%',
        height: 'auto',
      }}
    >
      <div className="pointer-events-none absolute left-0 top-0 z-[25] flex h-full w-[3px] flex-col" aria-hidden>
        <div className="relative h-full w-full bg-[rgba(212,169,60,0.15)]">
          <div className="absolute left-0 right-0 top-0" style={{ height: `${sidebarProgressPct}%`, background: WARM_GOLD }} />
        </div>
      </div>

      <div
        className="relative z-10 overflow-hidden border-b border-[rgba(212,169,60,0.12)] px-5"
        style={{ background: SIDEBAR_BG, width: '100%', paddingTop: '24px', paddingBottom: '20px' }}
      >
        <div className="relative mx-auto flex w-full justify-center px-2" style={{ minHeight: '72px' }}>
          <div
            className="pointer-events-none absolute left-1/2 top-[45%] h-[clamp(112px,32vw,160px)] w-[min(200px,94%)] max-w-none -translate-x-1/2 -translate-y-1/2"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 65% 80% at 50% 50%, rgba(212, 169, 60, 0.08) 0%, transparent 72%)',
            }}
          />
          <img
            src="/velour-logo.png"
            alt="Velour by Charlen Maison"
            className="relative mx-auto block h-auto w-full max-w-[150px]"
            style={{ filter: 'drop-shadow(0 0 24px rgba(212, 169, 60, 0.4))' }}
          />
        </div>
        <button
          type="button"
          onClick={handleBackToHome}
          className="mt-4 flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 transition-opacity hover:opacity-100"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: WARM_GOLD,
            opacity: 0.92,
          }}
        >
          <ArrowLeft size={14} strokeWidth={2} style={{ color: WARM_GOLD, flexShrink: 0, opacity: 0.95 }} aria-hidden />
          Back to Home
        </button>
      </div>

      <div
        className="relative z-10 flex flex-1 flex-col justify-between px-6 py-6"
        style={{ background: SIDEBAR_BG, display: 'flex', flexDirection: 'column' }}
      >
        <div className="flex flex-col gap-0">
          {SETUP_STEPS.map((step) => {
            const isPlaceholderAllDone = phase === 'placeholder';
            const isCompleted = isPlaceholderAllDone || step.number < setupStep;
            const isActive = phase === 'steps' && setupStep === step.number;
            const isClickable = phase === 'steps' && step.number <= furthestStep && step.number !== setupStep;

            return (
              <div key={step.number}>
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`group relative flex w-full items-start gap-3 rounded-lg text-left transition-all duration-200 ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  style={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    background: isActive ? 'rgba(212,169,60,0.06)' : 'transparent',
                  }}
                >
                  <div
                    className="flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300"
                    style={
                      isActive
                        ? {
                            width: '32px',
                            height: '32px',
                            background: WARM_GOLD,
                            color: MIDNIGHT_BLUE,
                            fontSize: '13px',
                            fontWeight: 700,
                          }
                        : isCompleted
                          ? {
                              width: '32px',
                              height: '32px',
                              background: WARM_GOLD,
                              color: MIDNIGHT_BLUE,
                              fontSize: '13px',
                              fontWeight: 700,
                            }
                          : {
                              width: '32px',
                              height: '32px',
                              background: 'transparent',
                              border: '1px solid rgba(212,169,60,0.3)',
                              color: 'rgba(212,169,60,0.5)',
                              fontSize: '12px',
                              fontWeight: 600,
                            }
                    }
                  >
                    {isActive ? step.number : isCompleted ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : step.number}
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <p
                      className="transition-colors duration-300"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: isActive ? '14px' : '13px',
                        fontWeight: isActive ? 500 : 400,
                        color: WARM_GOLD,
                        opacity: isCompleted && !isActive ? 0.8 : isActive ? 1 : 0.4,
                        lineHeight: '1.5',
                      }}
                    >
                      {step.title}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
          {phase === 'placeholder' && (
            <div className="mt-3 flex items-start gap-3 rounded-lg px-2 py-3">
              <div
                className="flex flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'transparent',
                  border: '1px dashed rgba(212,169,60,0.25)',
                  color: 'rgba(212,169,60,0.35)',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                4
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="leading-snug text-[13px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: WARM_GOLD, opacity: 0.42 }}
                >
                  Content Generator (coming soon)
                </p>
                <span
                  className="mt-1 inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid rgba(212,169,60,0.25)',
                    color: 'rgba(212,169,60,0.45)',
                  }}
                >
                  soon
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-10">
          <div
            className="mx-auto mb-6 h-px w-[80%] opacity-70"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,169,60,0.35) 50%, transparent 100%)',
            }}
            aria-hidden
          />
          <p
            className="pb-4 text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              fontStyle: 'italic',
              color: WARM_GOLD,
              opacity: 0.75,
              lineHeight: 1.6,
            }}
          >
            Where Creators Become Empires.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full border-0 bg-transparent pb-1 text-center transition-opacity hover:opacity-100"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'rgba(180, 178, 204, 0.55)',
              cursor: 'pointer',
              opacity: 0.92,
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
