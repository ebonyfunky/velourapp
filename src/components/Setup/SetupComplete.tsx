const GOLD = '#D4A93C';
const MIDNIGHT_TEXT = '#1A1F4A';

interface Props {
  onEditSetup: () => void;
  onBackToVoice: () => void;
}

export default function SetupComplete({ onEditSetup, onBackToVoice }: Props) {
  return (
    <div className="relative flex min-h-[50vh] flex-col pb-[100px]">
      <h1 className="mb-2 text-[clamp(28px,3.6vw,36px)] font-normal tracking-[-0.02em]" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>
        You&apos;re set up.
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        Velour now knows your profession, your audience, and your voice.
      </p>
      <p className="mb-10 text-sm leading-relaxed text-white/85" style={{ fontFamily: 'Inter, sans-serif' }}>
        In the next phase, you&apos;ll land on the Content Generator, where you&apos;ll pick a content format (Reel, Carousel, Live Script,
        etc.) and Velour will produce hooks, captions, scripts, and CTAs tailored to YOUR audience, in YOUR voice.
      </p>

      <p className="mb-6 text-xs italic text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
        Content Generator screen coming in Phase B
      </p>

      <div
        className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between border-t px-6 py-4 md:left-[240px]"
        style={{ borderColor: 'rgba(212,169,60,0.15)', background: 'rgba(26,31,74,0.96)' }}
      >
        <button
          type="button"
          onClick={onBackToVoice}
          className="rounded-lg border bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em]"
          style={{ fontFamily: 'Inter, sans-serif', borderColor: 'rgba(212,169,60,0.55)', color: GOLD }}
        >
          BACK
        </button>
        <button
          type="button"
          onClick={onEditSetup}
          className="rounded-lg border-0 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition-[transform,box-shadow]"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: GOLD,
            color: MIDNIGHT_TEXT,
            boxShadow: '0 8px 32px rgba(212,169,60,0.35)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,169,60,0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,169,60,0.35)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Edit my setup
        </button>
      </div>
    </div>
  );
}
