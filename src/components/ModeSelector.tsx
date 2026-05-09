import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCampaignStore } from '../store/campaignStore';

/** Velour signature midnight (deeper, dustier than Echo royal) */
const MIDNIGHT_BLUE = '#1A1F4A';
const MIDNIGHT_BLUE_TEXT = '#1A1F4A';
const MIDNIGHT_BLUE_TOP = '#222A58';
const MIDNIGHT_BLUE_BOTTOM = '#151A40';
const WARM_GOLD = '#D4A93C';
const TILE_SURFACE = '#252B5F';

const GOLD_RGB = '212, 169, 60';

const easeOutLux = [0.22, 1, 0.36, 1] as const;

const NOISE_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/></svg>'
)}")`;

const TILES = [
  {
    Icon: Target,
    title: 'Build Your Avatar',
    description: "Define exactly who you're talking to in 20 minutes",
  },
  {
    Icon: Sparkles,
    title: 'Generate Your Scripts',
    description: 'Real scripts in your voice, written for your audience',
  },
  {
    Icon: Calendar,
    title: 'Plan Your Month',
    description: '30 days of content, ready when you are',
  },
] as const;

/** Temporary Phase B debug: verify Supabase client reaches the hosted project */
function SupabaseConnectionBadge() {
  const [state, setState] = useState<'checking' | 'ok' | 'err'>('checking');
  const [errDetail, setErrDetail] = useState('');

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { error } = await supabase.from('profiles').select('id').limit(0);
      if (cancelled) return;
      if (error) {
        setState('err');
        setErrDetail(error.message);
      } else {
        setState('ok');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const dotColor =
    state === 'ok' ? '#34d399' : state === 'err' ? '#f87171' : 'rgba(255,255,255,0.28)';

  const label =
    state === 'ok' ? 'Supabase: connected' : state === 'err' ? 'Supabase: error' : 'Supabase: ...';

  return (
    <div
      className="fixed bottom-3 right-3 z-[200] flex max-w-[240px] items-center gap-1.5 px-2 py-1 opacity-65"
      style={{ fontFamily: 'Inter, sans-serif', pointerEvents: state === 'err' ? 'auto' : 'none' }}
      title={state === 'err' && errDetail ? errDetail : undefined}
      role={state === 'err' ? 'status' : undefined}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} aria-hidden />
      <span style={{ fontSize: '10px', color: 'rgba(226,226,237,0.55)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
        {label}
      </span>
    </div>
  );
}

export default function ModeSelector() {
  const { setField } = useCampaignStore();

  const handleBegin = () => {
    setField('creatorMode', 'content-creator');
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden px-6 pb-[40px] pt-[40px] md:px-12"
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_BLUE_TOP} 0%, ${MIDNIGHT_BLUE} 48%, ${MIDNIGHT_BLUE_BOTTOM} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
        style={{
          opacity: 0.04,
          backgroundImage: NOISE_DATA_URI,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-[-8%] top-[6%] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, rgba(${GOLD_RGB}, 0.95) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute right-[-10%] top-[32%] h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full opacity-[0.14] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, rgba(${GOLD_RGB}, 0.9) 0%, transparent 72%)`,
          }}
        />
        <div
          className="absolute bottom-[8%] left-1/2 h-[min(360px,48vw)] w-[min(360px,48vw)] -translate-x-1/2 rounded-full opacity-[0.11] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, rgba(${GOLD_RGB}, 0.92) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow: `inset 0 0 min(140px, 18vw) min(52px, 7vw) rgba(10, 12, 36, 0.52)`,
        }}
        aria-hidden
      />

      <div className="relative z-[3] mx-auto flex w-full max-w-[940px] flex-1 flex-col items-center pb-0">
        <div className="relative flex flex-col items-center text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(520px,95vw)] w-[min(700px,120vw)] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${GOLD_RGB}, 0.32) 0%, rgba(${GOLD_RGB}, 0.15) 45%, transparent 72%)`,
            }}
            aria-hidden
          />

          <motion.img
            src="/velour-logo.png"
            alt="Velour by Charlen Maison"
            aria-label="Velour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOutLux }}
            className="relative z-[1] mx-auto block h-auto w-full max-w-[220px] md:max-w-[280px]"
            style={{ filter: 'drop-shadow(0 0 40px rgba(212, 169, 60, 0.3))' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easeOutLux }}
            className="relative z-[1] mt-5 max-w-xl"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(13px, 2.9vw, 16px)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: WARM_GOLD,
              opacity: 0.6,
              lineHeight: 1.6,
            }}
          >
            Where Creators Become Empires
          </motion.p>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: easeOutLux }}
          className="text-center"
          style={{
            marginTop: '36px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(22px, 3.4vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.25,
            maxWidth: '680px',
            color: WARM_GOLD,
            letterSpacing: '-0.015em',
          }}
        >
          The content engine for creators who refuse to sound like everyone else.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.05, ease: easeOutLux }}
          style={{ marginTop: '28px', marginBottom: '56px' }}
        >
          <button
            type="button"
            onClick={handleBegin}
            className="rounded-full border-0 transition-all duration-300 ease-out hover:-translate-y-0.5"
            style={{
              padding: '18px 56px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: MIDNIGHT_BLUE_TEXT,
              cursor: 'pointer',
              background: WARM_GOLD,
              boxShadow: `0 8px 32px rgba(${GOLD_RGB}, 0.4)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 40px rgba(${GOLD_RGB}, 0.58)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(${GOLD_RGB}, 0.4)`;
            }}
          >
            BEGIN
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 1.22, ease: easeOutLux }}
          className="mb-5 flex w-full max-w-[900px] flex-col items-center"
        >
          <div
            className="mb-2 h-px w-[72px]"
            style={{ backgroundColor: `rgba(${GOLD_RGB}, 0.45)` }}
            aria-hidden
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: WARM_GOLD,
              opacity: 0.5,
            }}
          >
            FEATURES
          </span>
          <div
            className="mt-2 h-px w-[72px]"
            style={{ backgroundColor: `rgba(${GOLD_RGB}, 0.45)` }}
            aria-hidden
          />
        </motion.div>

        <div className="grid w-full max-w-[900px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
          {TILES.map(({ Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.38 + index * 0.08,
                ease: easeOutLux,
              }}
              className="flex flex-col items-center rounded-[18px] text-center transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1"
              style={{
                padding: '24px',
                backgroundColor: TILE_SURFACE,
                border: `1px solid rgba(${GOLD_RGB}, 0.25)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${GOLD_RGB}, 0.5)`;
                e.currentTarget.style.boxShadow = `0 14px 40px rgba(${GOLD_RGB}, 0.22)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${GOLD_RGB}, 0.25)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon
                className="mb-2"
                size={18}
                strokeWidth={1.15}
                style={{ color: WARM_GOLD }}
                aria-hidden
              />
              <div
                className="mb-2 h-px w-[30px]"
                style={{ backgroundColor: `rgba(${GOLD_RGB}, 0.55)` }}
                aria-hidden
              />
              <h3
                className="mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16px',
                  fontWeight: 500,
                  fontVariant: 'small-caps',
                  letterSpacing: '0.1em',
                  color: WARM_GOLD,
                }}
              >
                {title}
              </h3>
              <p
                className="text-[13px]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  maxWidth: '240px',
                }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <SupabaseConnectionBadge />
    </div>
  );
}
