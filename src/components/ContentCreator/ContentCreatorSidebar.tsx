/**
 * CONTENT CREATOR FLOW SIDEBAR - 7 steps.
 * This is the ONLY sidebar used when creatorMode === 'content-creator'.
 * Used by App.tsx.
 */
import { Check, ArrowLeft } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import { useState } from 'react';
import ResetModal from '../ResetModal';

const WARM_GOLD = '#D4A93C';
const MIDNIGHT_BLUE = '#1A1F4A';
const SIDEBAR_BG = '#14193D';

export const CONTENT_CREATOR_STEPS = [
  { number: 1, title: 'Creator Identity' },
  { number: 2, title: 'Audience Avatar' },
  { number: 3, title: 'Your Niche' },
  { number: 4, title: 'Content Type' },
  { number: 5, title: 'Faceless or Face Forward' },
  { number: 6, title: 'Script Generator' },
  { number: 7, title: 'Content Calendar' },
] as const;

interface ContentCreatorSidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
  /** Matches top ProgressBar fill (step 2 substeps, 8 segments internally). */
  subProgress?: number;
  /** While on Step 2, 0-based sub-screen index from Content Creator flow (questions 1-7 + summary at 7). */
  audienceAvatarQuestionIndex?: number | null;
  onResetContentCreator?: () => void;
}

export default function ContentCreatorSidebar({
  currentStep,
  onStepClick,
  completedSteps,
  subProgress = 0,
  audienceAvatarQuestionIndex,
  onResetContentCreator,
}: ContentCreatorSidebarProps) {
  const { resetMode, resetContentCreatorFlow } = useCampaignStore();
  const [showResetModal, setShowResetModal] = useState(false);

  const totalSteps = CONTENT_CREATOR_STEPS.length;
  const progressRatio = Math.min(1, Math.max(0, (currentStep - 1 + subProgress) / totalSteps));
  const progressPercent = progressRatio * 100;

  const handleBackToHome = () => {
    resetMode();
  };

  const handleGlobalReset = () => {
    resetContentCreatorFlow();
    onResetContentCreator?.();
    setShowResetModal(false);
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
          <div className="absolute left-0 right-0 top-0" style={{ height: `${progressPercent}%`, background: WARM_GOLD }} />
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
        className="relative z-10 flex flex-1 flex-col justify-between gap-0 px-6 py-6"
        style={{
          background: SIDEBAR_BG,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex flex-col gap-0">
          {CONTENT_CREATOR_STEPS.map((step) => {
            /** Visual progression is driven only by comparison to App `currentStep` (re-render on each NEXT). */
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            /** Match App `handleStepClick`: completed list or strictly before current, plus current row stays enabled. */
            const isClickable =
              step.number === currentStep || step.number < currentStep || completedSteps.includes(step.number);

            const showAudienceSubProgress = step.number === 2 && isActive;
            const avIdx = typeof audienceAvatarQuestionIndex === 'number' ? audienceAvatarQuestionIndex : 0;
            const audienceQuestionBarPct = avIdx >= 7 ? 100 : ((avIdx + 1) / 7) * 100;
            const audienceQuestionLabel =
              avIdx < 7 ? `Question ${avIdx + 1} of 7` : 'Review';

            return (
              <div key={step.number}>
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`group relative flex w-full items-start gap-3 rounded-lg text-left transition-all duration-200 ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
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
                        opacity: isCompleted ? 0.8 : isActive ? 1 : 0.4,
                        lineHeight: '1.5',
                      }}
                    >
                      {step.title}
                    </p>
                    {showAudienceSubProgress && (
                      <>
                        <div
                          className="mt-2 h-[5px] w-full overflow-hidden rounded-full"
                          style={{ backgroundColor: 'rgba(212, 169, 60, 0.15)' }}
                          aria-hidden
                        >
                          <div
                            className="h-full rounded-full bg-[#D4A93C]"
                            style={{
                              width: `${audienceQuestionBarPct}%`,
                              transition: 'width 0.35s ease-out',
                            }}
                          />
                        </div>
                        <p
                          className="mt-1 font-sans"
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            color: '#D4A93C',
                            fontWeight: 500,
                          }}
                        >
                          {audienceQuestionLabel}
                        </p>
                      </>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div
            className="mb-4 h-px w-[80%] opacity-70"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(212,169,60,0.35) 50%, transparent 100%)',
            }}
            aria-hidden
          />

          <div className="relative z-10 pb-2 text-center">
            <p
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

            <div className="mt-4 flex w-full flex-col items-center px-1">
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="w-full max-w-[200px] cursor-pointer rounded-[20px] border border-solid bg-transparent px-4 py-2 text-center transition-all duration-200"
                style={{
                  borderColor: 'rgba(220, 100, 100, 0.4)',
                  color: 'rgba(220, 100, 100, 0.8)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget;
                  t.style.borderColor = 'rgba(220, 100, 100, 0.7)';
                  t.style.backgroundColor = 'rgba(220, 100, 100, 0.05)';
                  t.style.color = 'rgba(220, 100, 100, 0.95)';
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget;
                  t.style.borderColor = 'rgba(220, 100, 100, 0.4)';
                  t.style.backgroundColor = 'transparent';
                  t.style.color = 'rgba(220, 100, 100, 0.8)';
                }}
              >
                START OVER
              </button>
              <p
                className="mt-1 font-sans"
                style={{
                  fontSize: '9px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: WARM_GOLD,
                  opacity: 0.5,
                  textAlign: 'center',
                  lineHeight: 1.35,
                  maxWidth: '200px',
                }}
              >
                Clears all entries from all steps
              </p>
            </div>
          </div>
        </div>
      </div>

      <ResetModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} onConfirm={handleGlobalReset} type="global" />
    </div>
  );
}
