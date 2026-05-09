import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';

const GOLD = '#D4A93C';
const MIDNIGHT_TEXT = '#1A1F4A';

const VOICES = [
  {
    id: 'calm-authority',
    title: 'CALM AUTHORITY',
    description: 'Educates with quiet confidence. Premium, grounded, never hyped.',
  },
  {
    id: 'best-friend',
    title: 'BEST FRIEND',
    description: "Warm, conversational. Real talk like you're chatting over coffee.",
  },
  {
    id: 'bold-and-punchy',
    title: 'BOLD AND PUNCHY',
    description: 'Strong opinions, fast pace, no fluff. Stops the scroll.',
  },
  {
    id: 'faith-led',
    title: 'FAITH-LED',
    description: 'Anchored in faith. Encouraging, hopeful, scripture-aware.',
  },
  {
    id: 'comedic',
    title: 'COMEDIC',
    description: 'Light, funny, entertaining. Does not take itself too seriously.',
  },
  {
    id: 'soft-and-soothing',
    title: 'SOFT AND SOOTHING',
    description: 'Gentle, reassuring, healing energy. Speaks to the tired and overwhelmed.',
  },
] as const;

const ERR_MSG = 'Please complete this field to continue.';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function SetupStep3Voice({ onComplete, onBack }: Props) {
  const voice = useCampaignStore((s) => s.voice);
  const setVoice = useCampaignStore((s) => s.setVoice);
  const markSetupComplete = useCampaignStore((s) => s.markSetupComplete);
  const resetStep3 = useCampaignStore((s) => s.resetStep3);
  const [error, setError] = useState(false);

  const valid = Boolean(voice);

  const handleResetThisStep = () => {
    resetStep3();
    setError(false);
  };

  const handleComplete = () => {
    if (!voice) {
      setError(true);
      return;
    }
    setError(false);
    markSetupComplete();
    onComplete();
  };

  return (
    <div className="relative flex min-h-[60vh] flex-col pb-[100px]">
      <div className="mb-2 flex shrink-0 justify-end">
        <button
          type="button"
          onClick={handleResetThisStep}
          className="rounded-[20px] border bg-transparent px-3 py-1.5 uppercase tracking-[0.12em] transition-colors hover:bg-[rgba(212,169,60,0.08)]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            borderColor: 'rgba(212,169,60,0.45)',
            color: 'rgba(212,169,60,0.9)',
          }}
        >
          RESET THIS STEP
        </button>
      </div>

      <h1
        className="mb-2 text-[clamp(28px,3.6vw,36px)] font-normal tracking-[-0.02em]"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
      >
        How do you sound?
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        This shapes the personality of every piece of content Velour writes for you.
      </p>

      <div className="mb-10 grid grid-cols-2 gap-3">
        {VOICES.map((v) => {
          const selected = voice === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setVoice(v.id);
                setError(false);
              }}
              className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                selected
                  ? 'border-[#C9A84C] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]'
                  : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
              }`}
              style={{ borderLeftWidth: selected ? 2 : 4, borderLeftColor: selected ? '#C9A84C' : 'rgba(201,168,76,0.45)' }}
            >
              {selected && (
                <span className="absolute right-3 top-3 text-[#C9A84C]" aria-hidden>
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              )}
              <h3 className="pr-8 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A84C]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {v.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                {v.description}
              </p>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="mb-6 text-sm font-medium text-[rgba(236,162,162,0.95)]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {ERR_MSG}
        </p>
      ) : null}

      <div
        className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between border-t px-6 py-4 md:left-[240px]"
        style={{ borderColor: 'rgba(212,169,60,0.15)', background: 'rgba(26,31,74,0.96)' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em]"
          style={{ fontFamily: 'Inter, sans-serif', borderColor: 'rgba(212,169,60,0.55)', color: GOLD }}
        >
          BACK
        </button>
        <button
          type="button"
          aria-disabled={!valid}
          onClick={handleComplete}
          className="rounded-lg border-0 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition-[opacity,transform,box-shadow]"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: GOLD,
            color: MIDNIGHT_TEXT,
            opacity: valid ? 1 : 0.5,
            boxShadow: valid ? '0 8px 32px rgba(212,169,60,0.35)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (!valid) return;
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,169,60,0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = valid ? '0 8px 32px rgba(212,169,60,0.35)' : 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          COMPLETE SETUP
        </button>
      </div>
    </div>
  );
}
