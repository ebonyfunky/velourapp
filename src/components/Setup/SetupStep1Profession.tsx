import { useState } from 'react';
import { useCampaignStore } from '../../store/campaignStore';

const GOLD = '#D4A93C';
const MIDNIGHT_TEXT = '#1A1F4A';

const OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Select your profession...' },
  { value: 'Real Estate / Realtor', label: 'Real Estate / Realtor' },
  { value: 'Immigration Consultant', label: 'Immigration Consultant' },
  { value: 'Healthcare Professional', label: 'Healthcare Professional' },
  { value: 'Fitness / Nutrition Coach', label: 'Fitness / Nutrition Coach' },
  { value: 'Pastor / Faith Leader', label: 'Pastor / Faith Leader' },
  { value: 'Educator / Tutor', label: 'Educator / Tutor' },
  { value: 'Coach / Consultant', label: 'Coach / Consultant' },
  { value: 'Digital Marketer', label: 'Digital Marketer' },
  { value: 'Content Creator / UGC', label: 'Content Creator / UGC' },
  { value: 'E-commerce / Product Seller', label: 'E-commerce / Product Seller' },
  { value: 'Service Provider (cleaning, beauty, trades, etc.)', label: 'Service Provider (cleaning, beauty, trades, etc.)' },
  { value: 'Professional Services (legal, accounting, etc.)', label: 'Professional Services (legal, accounting, etc.)' },
  { value: 'Other', label: 'Other' },
];

interface Props {
  onNext: () => void;
  onExitToHome: () => void;
}

const ERR_MSG = 'Please complete this field to continue.';

export default function SetupStep1Profession({ onNext, onExitToHome }: Props) {
  const profession = useCampaignStore((s) => s.profession);
  const professionOther = useCampaignStore((s) => s.professionOther);
  const setProfession = useCampaignStore((s) => s.setProfession);
  const setProfessionOther = useCampaignStore((s) => s.setProfessionOther);
  const resetStep1 = useCampaignStore((s) => s.resetStep1);
  const [error, setError] = useState(false);

  const valid =
    profession.trim() !== '' &&
    profession !== OPTIONS[0].value &&
    (profession !== 'Other' || professionOther.trim().length > 0);

  const handleResetThisStep = () => {
    resetStep1();
    setError(false);
  };

  const handleNextClick = () => {
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    onNext();
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
        What do you do?
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        Velour will tailor every piece of content to your business.
      </p>

      <label htmlFor="setup-profession" className="sr-only">
        Profession
      </label>
      <select
        id="setup-profession"
        value={profession}
        onChange={(e) => {
          const v = e.target.value;
          setProfession(v);
          if (v !== 'Other') setProfessionOther('');
          setError(false);
        }}
        className="mb-4 w-full rounded-xl border px-5 py-4 text-base outline-none ring-2 ring-transparent transition-shadow focus:border-[#D4A93C]/80 focus:ring-[#D4A93C]"
        style={{
          fontFamily: 'Inter, sans-serif',
          background: '#17152e',
          borderColor: 'rgba(212, 169, 60, 0.35)',
          color: '#f0ebff',
        }}
      >
        {OPTIONS.map((o, i) => (
          <option key={o.value || `ph-${i}`} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {profession === 'Other' && (
        <input
          type="text"
          value={professionOther}
          onChange={(e) => {
            setProfessionOther(e.target.value);
            setError(false);
          }}
          placeholder="Tell us your profession"
          className="mb-2 w-full rounded-xl border px-5 py-4 text-base outline-none ring-2 ring-transparent focus:border-[#D4A93C]/80 focus:ring-[#D4A93C]"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: '#17152e',
            borderColor: 'rgba(212, 169, 60, 0.35)',
            color: '#f0ebff',
          }}
        />
      )}

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
          onClick={onExitToHome}
          className="rounded-lg border bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em]"
          style={{ fontFamily: 'Inter, sans-serif', borderColor: 'rgba(212,169,60,0.55)', color: GOLD }}
        >
          BACK
        </button>
        <button
          type="button"
          role="button"
          aria-disabled={!valid}
          onClick={handleNextClick}
          className="rounded-lg border-0 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition-[opacity,transform,box-shadow]"
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
          NEXT
        </button>
      </div>
    </div>
  );
}
