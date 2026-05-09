/**
 * Phase A2 placeholder: full customer-clarity flow will live here.
 */
import HomeHeader from './HomeHeader';

const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_BOTTOM = '#151A40';
const GOLD = '#D4A93C';

export default function ProfileFlow() {
  return (
    <div
      className="flex min-h-screen flex-col items-center px-6 pb-16 pt-24 md:px-12"
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
      }}
    >
      <HomeHeader />
      <img
        src="/velour-logo.png"
        alt="Velour by Charlen Maison"
        className="mx-auto mb-12 block h-auto w-full max-w-[220px] md:max-w-[260px]"
        style={{ filter: 'drop-shadow(0 0 40px rgba(212, 169, 60, 0.3))' }}
      />
      <h1
        className="mb-4 max-w-xl text-center text-[clamp(24px,3.8vw,32px)] font-normal tracking-[-0.02em]"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
      >
        Customer clarity profile
      </h1>
      <p className="max-w-lg text-center text-sm leading-relaxed text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        Guided questions for who you serve, before and after states, language, and awareness. Coming in the next milestone.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          marginTop: '32px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => window.location.reload()}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(212, 169, 60, 0.85)',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            transition: 'opacity 200ms ease',
            opacity: 0.85,
          }}
        >
          {'\u2190 Back'}
        </button>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('velour-gate-choice', 'generator');
            window.location.reload();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(212, 169, 60, 0.85)',
            background: 'transparent',
            border: '1px solid rgba(212, 169, 60, 0.4)',
            borderRadius: '999px',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'opacity 200ms ease',
            opacity: 0.85,
          }}
        >
          {`GO TO GENERATOR ${'\u2192'}`}
        </button>
      </div>
    </div>
  );
}
