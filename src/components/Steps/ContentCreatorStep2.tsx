import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';

const Q1_CHIPS = [
  'Restless',
  'Drained',
  'Doubtful',
  'Unheard',
  'Lost',
  'Anxious',
  'Uninspired',
  'Trapped',
  'Desperate for change',
  'Feel like time is running out',
];
const Q1_MIN_SELECT = 3;
const Q1_MAX_SELECT = 5;
const Q2_CHIPS = [
  'More Income',
  'Time Freedom',
  'Location Freedom',
  'To Quit Their 9 to 5',
  'Financial Security',
  'To Be Their Own Boss',
  'Confidence Online',
  'A Business That Works While They Sleep',
  'Recognition and Influence',
  'To Finally See Results',
];
const Q2_MIN_SELECT = 3;
const Q2_MAX_SELECT = 5;
const Q3_CHIPS = [
  'YouTube tutorials',
  'Free courses',
  'Paid programs',
  'Coaching or mentorship',
  'Social media posting',
  'Network marketing',
  'Dropshipping or ecommerce',
  'Affiliate marketing',
  'Nothing yet, this is their first step',
  'Too many things to count',
];
const Q3_MIN_SELECT = 1;
const Q3_MAX_SELECT = 3;
const Q4_CARDS = [
  { id: 'fear-fail', label: 'What if this does not work either?' },
  { id: 'fear-time', label: 'I do not have time to figure this out' },
  { id: 'fear-judge', label: 'People will judge me' },
  { id: 'fear-money', label: 'I cannot afford to fail again' },
  { id: 'fear-no-money', label: 'I do not have money to spare' },
  { id: 'fear-scammed', label: 'I have been scammed before' },
  { id: 'fear-complex', label: 'It feels too complex for me' },
  { id: 'fear-too-good', label: 'It feels too good to be true' },
];
const Q5_CHIPS = ['18 to 24', '25 to 34', '35 to 44', '45 to 54', '55+'];
const Q6_CHIPS = [
  '9 to 5 Employee',
  'Student',
  'Stay at Home Parent',
  'Single parent',
  'Freelancer',
  'Small Business Owner',
  'Currently Unemployed',
  'Already in Sales or Marketing',
];
const Q6_MIN_SELECT = 1;
const Q6_MAX_SELECT = 2;
const Q7_PAIN_POINTS = [
  'No time to figure it out',
  'Tried before and failed',
  'Do not know where to start',
  'No consistent income',
  'Feel like an imposter',
  'Overwhelmed by information',
  'No support system',
  'Fear of being judged online',
  'Do not believe it can work for them',
  'Tired of working hard with no results',
];
const MAX_PAIN_POINTS = 3;

function GoldConfetti() {
  const particles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({ id: i, angle: (i / 24) * 360 })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden>
      {particles.map(({ id, angle }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 rounded-full bg-[#c9a84c] left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * 200,
            y: Math.sin((angle * Math.PI) / 180) * 200,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

interface ContentCreatorStep2Props {
  onNext: () => void;
  onBack: () => void;
  onSubProgress?: (fraction: number) => void;
}

export default function ContentCreatorStep2({ onNext, onBack, onSubProgress }: ContentCreatorStep2Props) {
  const {
    contentCreatorAudienceEmotions,
    contentCreatorAudienceWants,
    contentCreatorAudienceTriedOptions,
    contentCreatorAudienceFear,
    contentCreatorAudienceAges,
    contentCreatorAudienceLife,
    contentCreatorAudiencePainPoints,
    contentCreatorAudienceStatement,
    setField,
  } = useCampaignStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showCardReveal, setShowCardReveal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalQuestions = 8;
  const progressFraction = (questionIndex + 1) / totalQuestions;
  useEffect(() => {
    onSubProgress?.(progressFraction);
  }, [questionIndex, onSubProgress, progressFraction]);

  const emotionsRaw = Array.isArray(contentCreatorAudienceEmotions)
    ? contentCreatorAudienceEmotions
    : (contentCreatorAudienceEmotions != null && contentCreatorAudienceEmotions !== '' ? [String(contentCreatorAudienceEmotions)] : []);
  const emotionsArray = emotionsRaw.filter((e) => Q1_CHIPS.includes(e));
  const emotionText = emotionsArray.length ? emotionsArray.join(', ').toLowerCase() : '';
  const wantsRaw = Array.isArray(contentCreatorAudienceWants)
    ? contentCreatorAudienceWants
    : (contentCreatorAudienceWants != null && contentCreatorAudienceWants !== '' ? [String(contentCreatorAudienceWants)] : []);
  const wantsArray = wantsRaw.filter((e) => Q2_CHIPS.includes(e));
  const wantText = wantsArray.length ? wantsArray.join(', ').toLowerCase() : '';
  const triedRaw = Array.isArray(contentCreatorAudienceTriedOptions)
    ? contentCreatorAudienceTriedOptions
    : (contentCreatorAudienceTriedOptions != null && contentCreatorAudienceTriedOptions !== '' ? [String(contentCreatorAudienceTriedOptions)] : []);
  const triedArray = triedRaw.filter((e) => Q3_CHIPS.includes(e));
  const triedText = triedArray.length ? triedArray.join(', ').toLowerCase() : '';
  const lifeRaw = Array.isArray(contentCreatorAudienceLife)
    ? contentCreatorAudienceLife
    : (contentCreatorAudienceLife != null && contentCreatorAudienceLife !== '' ? [String(contentCreatorAudienceLife)] : []);
  const lifeArray = lifeRaw.filter((e) => Q6_CHIPS.includes(e));
  const fearLabel = Q4_CARDS.find((c) => c.id === contentCreatorAudienceFear)?.label || '';

  const statement =
    contentCreatorAudienceStatement ||
    `I create content for people who feel ${emotionText || '...'} because they want ${wantText || '...'} but are tired of ${triedText || '...'}.`;

  const handleBack = () => {
    if (questionIndex === 0) onBack();
    else setQuestionIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) setQuestionIndex((i) => i + 1);
    else onNext();
  };

  const getCurrentArray = (field: 'contentCreatorAudienceEmotions' | 'contentCreatorAudienceWants' | 'contentCreatorAudienceTriedOptions' | 'contentCreatorAudienceAges' | 'contentCreatorAudienceLife'): string[] => {
    const state = useCampaignStore.getState();
    const raw = field === 'contentCreatorAudienceEmotions' ? state.contentCreatorAudienceEmotions
      : field === 'contentCreatorAudienceWants' ? state.contentCreatorAudienceWants
      : field === 'contentCreatorAudienceTriedOptions' ? state.contentCreatorAudienceTriedOptions
      : field === 'contentCreatorAudienceAges' ? state.contentCreatorAudienceAges
      : state.contentCreatorAudienceLife;
    if (Array.isArray(raw)) return raw;
    if (raw != null && raw !== '') return [String(raw)];
    return [];
  };

  const toggleMulti = (field: 'contentCreatorAudienceEmotions' | 'contentCreatorAudienceWants' | 'contentCreatorAudienceTriedOptions' | 'contentCreatorAudienceAges' | 'contentCreatorAudienceLife', value: string, maxSelect?: number) => {
    let arr = getCurrentArray(field);
    if (field === 'contentCreatorAudienceEmotions') {
      arr = arr.filter((e) => Q1_CHIPS.includes(e));
    }
    if (field === 'contentCreatorAudienceWants') {
      arr = arr.filter((e) => Q2_CHIPS.includes(e));
    }
    if (field === 'contentCreatorAudienceTriedOptions') {
      arr = arr.filter((e) => Q3_CHIPS.includes(e));
    }
    if (field === 'contentCreatorAudienceLife') {
      arr = arr.filter((e) => Q6_CHIPS.includes(e));
    }
    const isRemoving = arr.includes(value);
    const next = isRemoving
      ? arr.filter((x) => x !== value)
      : (maxSelect != null && arr.length >= maxSelect ? arr : [...arr, value]);
    setField(field, next);
  };

  const togglePain = (label: string) => {
    const next = contentCreatorAudiencePainPoints.includes(label)
      ? contentCreatorAudiencePainPoints.filter((x) => x !== label)
      : contentCreatorAudiencePainPoints.length >= MAX_PAIN_POINTS
        ? contentCreatorAudiencePainPoints
        : [...contentCreatorAudiencePainPoints, label];
    setField('contentCreatorAudiencePainPoints', next);
  };

  const handleGenerateCard = () => {
    setField('contentCreatorAudienceStatement', statement);
    setShowConfetti(true);
    setShowCardReveal(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  const canNextQ1 = emotionsArray.length >= Q1_MIN_SELECT && emotionsArray.length <= Q1_MAX_SELECT;
  const canNextQ2 = wantsArray.length >= Q2_MIN_SELECT;
  const canNextQ3 = triedArray.length >= Q3_MIN_SELECT;
  const canNextQ4 = !!contentCreatorAudienceFear;
  const canNextQ5 = contentCreatorAudienceAges.length > 0;
  const canNextQ6 = lifeArray.length >= Q6_MIN_SELECT;
  const canNextQ7 = contentCreatorAudiencePainPoints.length >= 1;
  const canNextSummary = showCardReveal;

  const nextDisabled =
    (questionIndex === 0 && !canNextQ1) ||
    (questionIndex === 1 && !canNextQ2) ||
    (questionIndex === 2 && !canNextQ3) ||
    (questionIndex === 3 && !canNextQ4) ||
    (questionIndex === 4 && !canNextQ5) ||
    (questionIndex === 5 && !canNextQ6) ||
    (questionIndex === 6 && !canNextQ7) ||
    (questionIndex === 7 && !canNextSummary);

  return (
    <div className="min-h-[400px] flex flex-col pb-20">
      <AnimatePresence mode="sync" initial={false}>
        {questionIndex === 0 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Who are you really talking to?
              </h2>
              <p className="text-[#9a8fa8] text-sm font-medium mb-4">Not everyone. ONE person. The version of you from before.</p>
              <p className="text-lg font-semibold text-[#e8c96a]">This person wakes up every morning feeling...</p>
              <p className="text-[#c9a84c] font-semibold text-sm mt-2">Select 3 to 5 - {emotionsArray.length} selected</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Q1_CHIPS.map((label) => {
                const selected = emotionsArray.includes(label);
                const disabled = !selected && emotionsArray.length >= Q1_MAX_SELECT;
                return (
                  <Chip
                    key={label}
                    selected={selected}
                    onClick={() => toggleMulti('contentCreatorAudienceEmotions', label, Q1_MAX_SELECT)}
                    label={label}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {questionIndex === 1 && (
          <motion.div key="q2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What they REALLY want is...</h2>
            <p className="text-[#c9a84c] font-semibold text-sm">{wantsArray.length}/{Q2_MAX_SELECT} selected</p>
            <div className="flex flex-wrap gap-2">
              {Q2_CHIPS.map((label) => {
                const selected = wantsArray.includes(label);
                const disabled = !selected && wantsArray.length >= Q2_MAX_SELECT;
                return (
                  <Chip
                    key={label}
                    selected={selected}
                    onClick={() => toggleMulti('contentCreatorAudienceWants', label, Q2_MAX_SELECT)}
                    label={label}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {questionIndex === 2 && (
          <motion.div key="q3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>They have already tried...</h2>
            <p className="text-[#c9a84c] font-semibold text-sm">{triedArray.length}/{Q3_MAX_SELECT} selected</p>
            <div className="flex flex-wrap gap-2">
              {Q3_CHIPS.map((label) => {
                const selected = triedArray.includes(label);
                const disabled = !selected && triedArray.length >= Q3_MAX_SELECT;
                return (
                  <Chip
                    key={label}
                    selected={selected}
                    onClick={() => toggleMulti('contentCreatorAudienceTriedOptions', label, Q3_MAX_SELECT)}
                    label={label}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {questionIndex === 3 && (
          <motion.div key="q4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Their biggest fear is...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Q4_CARDS.map((c) => (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => setField('contentCreatorAudienceFear', c.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    contentCreatorAudienceFear === c.id ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_20px_rgba(201,168,76,0.25)]' : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <span className="text-sm font-semibold text-[#f0ebff]">{c.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {questionIndex === 4 && (
          <motion.div key="q5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>How old is this person likely?</h2>
            <div className="flex flex-wrap gap-2">
              {Q5_CHIPS.map((label) => (
                <Chip key={label} selected={contentCreatorAudienceAges.includes(label)} onClick={() => toggleMulti('contentCreatorAudienceAges', label)} label={label} />
              ))}
            </div>
          </motion.div>
        )}

        {questionIndex === 5 && (
          <motion.div key="q6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What best describes their life right now?</h2>
            <p className="text-[#c9a84c] font-semibold text-sm">{lifeArray.length}/{Q6_MAX_SELECT} selected</p>
            <div className="flex flex-wrap gap-2">
              {Q6_CHIPS.map((label) => {
                const selected = lifeArray.includes(label);
                const disabled = !selected && lifeArray.length >= Q6_MAX_SELECT;
                return (
                  <Chip
                    key={label}
                    selected={selected}
                    onClick={() => toggleMulti('contentCreatorAudienceLife', label, Q6_MAX_SELECT)}
                    label={label}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {questionIndex === 6 && (
          <motion.div key="q7" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Pick their top 3 pain points</h2>
            <p className="text-[#c9a84c] font-semibold text-sm">{contentCreatorAudiencePainPoints.length}/3 selected</p>
            <div className="flex flex-wrap gap-2">
              {Q7_PAIN_POINTS.map((label) => {
                const selected = contentCreatorAudiencePainPoints.includes(label);
                const disabled = !selected && contentCreatorAudiencePainPoints.length >= MAX_PAIN_POINTS;
                return (
                  <Chip key={label} selected={selected} onClick={() => { if (!disabled) togglePain(label); }} label={label} disabled={disabled} />
                );
              })}
            </div>
          </motion.div>
        )}

        {questionIndex === 7 && (
          <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6 relative">
            {showConfetti && <GoldConfetti />}
            <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your audience in one sentence</h2>
            <p className="text-[#9a8fa8] text-sm">Here is who you are really creating for.</p>
            <div className="rounded-2xl border-2 border-[#c9a84c] p-6 bg-[rgba(201,168,76,0.08)] shadow-[0_0_32px_rgba(201,168,76,0.2)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <p className="text-[#e8c96a] text-lg md:text-xl leading-relaxed italic">"{statement}"</p>
            </div>
            {!showCardReveal ? (
              <button
                type="button"
                onClick={handleGenerateCard}
                className="w-full py-4 rounded-xl font-bold bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] transition-all shadow-[0_0_24px_rgba(201,168,76,0.35)]"
              >
                Generate My Audience Avatar Card
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-[#c9a84c] p-6 bg-[#1c1a35] space-y-4">
                <p className="text-[#c9a84c] font-bold text-sm uppercase tracking-wide">Your audience avatar</p>
                {emotionsArray.length > 0 && <p className="text-[#f0ebff] font-medium">Feels: {emotionsArray.join(', ')}</p>}
                {wantsArray.length > 0 && <p className="text-[#f0ebff] font-medium">Wants: {wantsArray.join(', ')}</p>}
                {triedArray.length > 0 && <p className="text-[#f0ebff] font-medium">Tried: {triedArray.join(', ')}</p>}
                {fearLabel && <p className="text-[#f0ebff] font-medium">Fear: {fearLabel}</p>}
                {contentCreatorAudienceAges.length > 0 && <p className="text-[#f0ebff] font-medium">Age: {contentCreatorAudienceAges.join(', ')}</p>}
                {lifeArray.length > 0 && <p className="text-[#f0ebff] font-medium">Life: {lifeArray.join(', ')}</p>}
                {contentCreatorAudiencePainPoints.length > 0 && <p className="text-[#f0ebff] font-medium">Pain: {contentCreatorAudiencePainPoints.join(', ')}</p>}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.15)] bg-[#1c1a35] z-[100] md:left-[240px]" style={{ pointerEvents: 'auto' }}>
        <button type="button" onClick={handleBack} className="px-5 py-3 rounded-lg font-bold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all">
          Back
        </button>
        <div className="w-24" />
        <button
          type="button"
          onClick={handleNext}
          disabled={nextDisabled}
          className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  label,
  disabled = false,
}: { selected: boolean; onClick: () => void; label: string; disabled?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`rounded-full px-4 py-2.5 text-sm font-semibold border-2 transition-all ${
        selected ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.2)] text-[#e8c96a] shadow-[0_0_16px_rgba(201,168,76,0.3)]' : disabled ? 'border-[rgba(255,255,255,0.1)] text-[#6a5f80] cursor-not-allowed opacity-30' : 'border-[rgba(201,168,76,0.3)] bg-[rgba(28,26,53,0.8)] text-[#d4cce8] hover:border-[rgba(201,168,76,0.5)]'
      }`}
    >
      {label}
    </motion.button>
  );
}
