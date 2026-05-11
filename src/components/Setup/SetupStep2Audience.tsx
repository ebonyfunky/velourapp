import { useMemo, useState, type CSSProperties } from 'react';
import { useCampaignStore } from '../../store/campaignStore';

const GOLD = '#D4A93C';
const MIDNIGHT_TEXT = '#1A1F4A';

const AUDIENCE_EXAMPLES: Record<string, string[]> = {
  'Real Estate / Realtor': [
    'First-time home buyers in [your city]',
    'Luxury home sellers ready to upgrade',
    'Real estate investors looking for rentals',
  ],
  'Immigration Consultant': [
    'New immigrants applying for U.S. visas',
    'Skilled workers seeking employment-based visas',
    'Families navigating green card applications',
  ],
  'Healthcare Professional': [
    'Burned-out nurses looking for career change',
    'New moms struggling with postpartum recovery',
    'Patients managing chronic illness at home',
  ],
  'Fitness / Nutrition Coach': [
    'Busy moms wanting to lose 20 pounds',
    'Men over 40 rebuilding their strength',
    'Beginners intimidated by the gym',
  ],
  'Pastor / Faith Leader': [
    'Young Christians struggling with doubt',
    'Married couples drifting apart spiritually',
    'New believers seeking community',
  ],
  'Educator / Tutor': [
    'Parents whose kids are falling behind in math',
    'High schoolers preparing for the SAT',
    'Adult learners returning to college',
  ],
  'Coach / Consultant': [
    'Mid-career professionals stuck in their job',
    'Female entrepreneurs scaling past six figures',
    'First-time managers learning to lead',
  ],
  'Digital Marketer': [
    'Beginners wanting to start affiliate marketing',
    'Small business owners overwhelmed by social media',
    'Coaches who need consistent leads online',
  ],
  'Content Creator / UGC': [
    'Creators wanting their first paid brand deal',
    'Stay-at-home moms building UGC income',
    'Aspiring influencers under 10K followers',
  ],
  'E-commerce / Product Seller': [
    'Shoppers looking for sustainable beauty products',
    'Pet owners who want premium dog food',
    'Moms shopping for safe baby gear',
  ],
  'Service Provider (cleaning, beauty, trades, etc.)': [
    'Busy homeowners who hate cleaning',
    'Brides preparing for their big day',
    'Homeowners needing emergency repairs',
  ],
  'Professional Services (legal, accounting, etc.)': [
    'Small business owners confused by taxes',
    'First-time home buyers needing legal help',
    'Couples planning their estate',
  ],
  Other: [
    'People who feel stuck in their current life',
    'Beginners wanting a clear path forward',
    'Busy parents needing simple solutions',
  ],
};

const PAIN_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Select their biggest pain...' },
  { value: 'Overwhelmed by too much information', label: 'Overwhelmed by too much information' },
  { value: "Don't know where to start", label: "Don't know where to start" },
  { value: 'Tried before and failed', label: 'Tried before and failed' },
  { value: 'No time to figure it out', label: 'No time to figure it out' },
  { value: 'No money to risk', label: 'No money to risk' },
  { value: "Don't trust online programs anymore", label: "Don't trust online programs anymore" },
  { value: 'Imposter syndrome', label: 'Imposter syndrome' },
  { value: 'Stuck in a 9-to-5 they hate', label: 'Stuck in a 9-to-5 they hate' },
  { value: 'Other', label: 'Other' },
];

const WANT_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Select their #1 desire...' },
  { value: 'More income', label: 'More income' },
  { value: 'More time / time freedom', label: 'More time / time freedom' },
  { value: 'Confidence in themselves', label: 'Confidence in themselves' },
  { value: 'A simple system that works', label: 'A simple system that works' },
  { value: 'Financial security', label: 'Financial security' },
  { value: 'A supportive community', label: 'A supportive community' },
  { value: 'Recognition / to be seen as the expert', label: 'Recognition / to be seen as the expert' },
  { value: 'Total freedom (location, schedule, life)', label: 'Total freedom (location, schedule, life)' },
  { value: 'Other', label: 'Other' },
];

const inputCls =
  'w-full rounded-xl border px-5 py-4 text-base outline-none ring-2 ring-transparent transition-shadow focus:border-[#D4A93C]/80 focus:ring-[#D4A93C]';
const boxStyle = { fontFamily: 'Inter, sans-serif' as const, background: '#17152e', borderColor: 'rgba(212, 169, 60, 0.35)', color: '#f0ebff' as const };

const ERR_MSG = 'Please complete this field to continue.';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SetupStep2Audience({ onNext, onBack }: Props) {
  const profession = useCampaignStore((s) => s.profession);
  const [idealAudiencePhrase, setIdealAudiencePhrase] = useState('');
  const audiencePain = useCampaignStore((s) => s.audiencePain);
  const audiencePainOther = useCampaignStore((s) => s.audiencePainOther);
  const audienceWant = useCampaignStore((s) => s.audienceWant);
  const audienceWantOther = useCampaignStore((s) => s.audienceWantOther);
  const setAudiencePain = useCampaignStore((s) => s.setAudiencePain);
  const setAudiencePainOther = useCampaignStore((s) => s.setAudiencePainOther);
  const setAudienceWant = useCampaignStore((s) => s.setAudienceWant);
  const setAudienceWantOther = useCampaignStore((s) => s.setAudienceWantOther);
  const resetStep2 = useCampaignStore((s) => s.resetStep2);
  const [error, setError] = useState(false);

  const exampleChips = useMemo(() => {
    const p = profession?.trim();
    if (!p || p === 'Other') return AUDIENCE_EXAMPLES.Other;
    return AUDIENCE_EXAMPLES[p] ?? AUDIENCE_EXAMPLES.Other;
  }, [profession]);

  const descLen = idealAudiencePhrase.length;

  let counterStyle: CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.42)',
  };
  if (descLen > 80) {
    counterStyle = { ...counterStyle, color: 'rgba(236,162,162,0.82)' };
  } else if (descLen > 60) {
    counterStyle = { ...counterStyle, color: 'rgba(212,169,60,0.72)' };
  }

  const painOk =
    audiencePain.trim() !== '' &&
    audiencePain !== PAIN_OPTIONS[0].value &&
    (audiencePain !== 'Other' || audiencePainOther.trim().length > 0);

  const wantOk =
    audienceWant.trim() !== '' &&
    audienceWant !== WANT_OPTIONS[0].value &&
    (audienceWant !== 'Other' || audienceWantOther.trim().length > 0);

  const descriptionOk = idealAudiencePhrase.trim().length > 0;
  const valid = descriptionOk && painOk && wantOk;

  const handleResetThisStep = () => {
    resetStep2();
    setError(false);
  };

  const handleNext = () => {
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
        Who are you talking to?
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        The more specific you are, the more your content will land.
      </p>

      <div className="mb-6">
        <label htmlFor="aud-desc" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(212,169,60,0.85)', fontFamily: 'Inter, sans-serif' }}>
          Describe your ideal audience in one phrase
        </label>
        <input
          id="aud-desc"
          type="text"
          value={idealAudiencePhrase}
          onChange={(e) => {
            setIdealAudiencePhrase(e.target.value);
            setError(false);
          }}
          placeholder="e.g. First-time home buyers in Dallas"
          className={inputCls}
          style={boxStyle}
        />
        <div className="mt-1.5 flex justify-end">
          <span style={counterStyle}>
            {descLen} / 80
          </span>
        </div>
        <p className="mb-2 mt-3 text-xs italic leading-relaxed text-white/55" style={{ fontFamily: 'Inter, sans-serif' }}>
          Be specific. Velour writes better content for narrow audiences.
        </p>
        <p className="mb-2 text-[11px] text-white/45" style={{ fontFamily: 'Inter, sans-serif' }}>
          Examples for your profession:
        </p>
        <div className="flex flex-wrap gap-2">
          {exampleChips.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setIdealAudiencePhrase(example);
                setError(false);
              }}
              className="rounded-lg border border-[rgba(212,169,60,0.45)] bg-transparent px-[14px] py-2 text-left text-xs transition-[box-shadow,color] hover:shadow-[0_0_14px_rgba(212,169,60,0.25)]"
              style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(212,169,60,0.88)' }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(212,169,60,0.85)', fontFamily: 'Inter, sans-serif' }}>
          What&apos;s their #1 pain right now?
        </label>
        <select
          value={audiencePain}
          onChange={(e) => {
            const v = e.target.value;
            setAudiencePain(v);
            if (v !== 'Other') setAudiencePainOther('');
            setError(false);
          }}
          className={inputCls}
          style={{ ...boxStyle, fontFamily: 'Inter, sans-serif' }}
        >
          {PAIN_OPTIONS.map((o, i) => (
            <option key={o.value || `p-${i}`} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {audiencePain === 'Other' && (
          <input
            type="text"
            value={audiencePainOther}
            onChange={(e) => {
              setAudiencePainOther(e.target.value);
              setError(false);
            }}
            placeholder="Describe their biggest pain"
            className={`${inputCls} mt-3`}
            style={boxStyle}
          />
        )}
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(212,169,60,0.85)', fontFamily: 'Inter, sans-serif' }}>
          What do they want most?
        </label>
        <select
          value={audienceWant}
          onChange={(e) => {
            const v = e.target.value;
            setAudienceWant(v);
            if (v !== 'Other') setAudienceWantOther('');
            setError(false);
          }}
          className={inputCls}
          style={{ ...boxStyle, fontFamily: 'Inter, sans-serif' }}
        >
          {WANT_OPTIONS.map((o, i) => (
            <option key={o.value || `w-${i}`} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {audienceWant === 'Other' && (
          <input
            type="text"
            value={audienceWantOther}
            onChange={(e) => {
              setAudienceWantOther(e.target.value);
              setError(false);
            }}
            placeholder="Describe their #1 desire"
            className={`${inputCls} mt-3`}
            style={boxStyle}
          />
        )}
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
          onClick={handleNext}
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
