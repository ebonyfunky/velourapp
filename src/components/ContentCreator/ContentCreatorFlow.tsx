import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';

const fadeTransition = { duration: 0.25 };

const PERSONA_OPTIONS = [
  { id: 'authority', title: 'THE AUTHORITY', description: 'You educate, lead and build credibility through knowledge' },
  { id: 'insider', title: 'THE INSIDER', description: 'You share real talk like a trusted peer in the room' },
  { id: 'activator', title: 'THE ACTIVATOR', description: 'You push people from stuck to moving - fast' },
  { id: 'specialist', title: 'THE SPECIALIST', description: 'Your niche is deep and your results do the talking' },
  { id: 'connector', title: 'THE CONNECTOR', description: 'You turn real experiences into movements people follow' },
  { id: 'disruptor', title: 'THE DISRUPTOR', description: 'You challenge what everyone else accepts as normal' },
  { id: 'visionary', title: 'THE VISIONARY', description: 'You paint the future and people follow your lead' },
  { id: 'builder', title: 'THE BUILDER', description: 'You document the journey of creating something from nothing' },
]

const STYLE_OPTIONS = [
  { id: 'natural', title: 'NATURAL AND AUTHENTIC', description: 'Real, raw, unfiltered' },
  { id: 'bold', title: 'BOLD AND CONFIDENT', description: 'Strong opinions, strong presence' },
  { id: 'minimal', title: 'MINIMAL AND CLEAN', description: 'Simple, clear, focused' },
  { id: 'luxury', title: 'LUXURY AND PREMIUM', description: 'Elevated, aspirational, polished' },
  { id: 'casual', title: 'CASUAL AND RELATABLE', description: 'Everyday, human and warm' },
  { id: 'power', title: 'POWER AND AUTHORITY', description: 'Commanding, credible, results focused' },
];

const NICHE_OPTIONS = [
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'high-ticket-affiliate-marketing', label: 'High Ticket Affiliate Marketing' },
  { id: 'immigration-consulting', label: 'Immigration Consulting' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'coaching-services', label: 'Coaching Services' },
  { id: 'financial-services', label: 'Financial Services' },
  { id: 'fashion-beauty', label: 'Fashion and Beauty' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'ai-arbitrage', label: 'AI Arbitrage' },
  { id: 'healthcare-services', label: 'Healthcare Services' },
  { id: 'religious-services', label: 'Religious Services' },
  { id: 'other', label: 'Other' },
];

const NICHE_AFFIRMATIONS: Record<string, string> = {
  'digital-marketing': 'Your own product. Your own income. Lets build it.',
  'high-ticket-affiliate-marketing': 'Big commissions, smart strategy. You are in the right place.',
  'immigration-consulting': 'People need your expertise. Lets get you seen.',
  'real-estate': 'Real estate plus content equals unstoppable.',
  'coaching-services': 'Coaches who show up online build empires.',
  'financial-services': 'Money content that actually helps people? That is powerful.',
  'fashion-beauty': 'Style is influence. Lets build yours.',
  'ecommerce': 'Products plus content equals a brand people love.',
  'ai-arbitrage': 'Smart strategy. Lets build it.',
  'healthcare-services': 'Your knowledge can change lives. Lets share it.',
  'religious-services': 'Your message deserves a bigger stage.',
  'other': 'Your path is yours. Lets build it.',
};

const CONTENT_TYPE_OPTIONS = [
  { id: 'daily-social', label: 'Daily Social Media Content' },
  { id: 'short-form', label: 'Short Form Video - Reels, TikTok, Shorts' },
  { id: 'long-form', label: 'Long Form Video - YouTube, Facebook' },
  { id: 'podcast', label: 'Podcast Content' },
  { id: 'ai-faceless', label: 'AI Faceless Stories and Videos' },
  { id: 'comedy', label: 'Comedy and Entertainment Content' },
  { id: 'faith-based', label: 'Faith Based and Inspirational Content' },
  { id: 'fitness-nutrition', label: 'Fitness and Nutrition Content' },
  { id: 'educational', label: 'Educational Carousels and Posts' },
  { id: 'live-video', label: 'Live Video Content' },
  { id: 'other', label: 'Other' },
];

const FACELESS_OPTIONS = [
  {
    id: 'faceless',
    title: 'FACELESS',
    subtext: 'My presence. My voice. My AI twin/ avatar. No camera, still my brand.',
    affirmation: 'Smart. Faceless creators are winning right now. Your voice is enough.',
  },
  {
    id: 'face-forward',
    title: 'FACE FORWARD',
    subtext: 'Full presence, camera on, my brand.',
    affirmation: 'Bold move. Showing up consistently is the fastest way to build trust and sales.',
  },
];

const FREQUENCY_OPTIONS = [
  { id: 'multiple-daily', label: 'MULTIPLE TIMES DAILY', sublabel: 'I post 2 to 3 times every day' },
  { id: 'daily', label: 'DAILY', sublabel: 'One piece of content every day' },
  { id: '3-4-week', label: '3 TO 4 TIMES A WEEK', sublabel: 'Consistent but not every day' },
  { id: 'weekly', label: 'WEEKLY', sublabel: 'One strong piece per week' },
  { id: 'biweekly', label: 'BI-WEEKLY', sublabel: 'Twice a month' },
  { id: 'monthly', label: 'MONTHLY', sublabel: 'One powerful piece per month' },
  { id: 'batching', label: 'BATCHING', sublabel: 'I create in bulk every 30, 60 or 90 days' },
];

const BATCH_OPTIONS = [
  { id: '1', label: 'GENERATE 1 SCRIPT', sublabel: 'I need one right now' },
  { id: 'week', label: 'GENERATE A WEEK OF SCRIPTS', sublabel: '7 days worth' },
  { id: 'month', label: 'GENERATE A MONTH OF SCRIPTS', sublabel: '30 days worth' },
  { id: '3months', label: 'GENERATE 3 MONTHS OF SCRIPTS', sublabel: '90 days, I am batching' },
  { id: 'quarter', label: 'GENERATE A FULL QUARTER', sublabel: 'Full content strategy batch' },
];

const Q1_CHIPS = ['Restless', 'Drained', 'Doubtful', 'Unheard', 'Lost', 'Anxious', 'Uninspired', 'Trapped', 'Desperate for Change', 'Like Time is Running Out'];
const Q2_CHIPS = ['More Income', 'Time Freedom', 'Location Freedom', 'Financial Security', 'To Be Their Own Boss', 'Confidence Online', 'A Loyal Audience', 'Recognition and Influence', 'To Turn Their Knowledge Into Cash', 'A Simple System That Actually Works'];
const Q3_CHIPS = ['YouTube tutorials', 'Free courses', 'Paid programs', 'Coaching or mentorship', 'Social media posting', 'Network marketing', 'Dropshipping or e-commerce', 'Affiliate marketing', 'Nothing yet - this is their first step', 'Too many things to count'];
const Q4_CARDS = [
  { id: 'fear-fail', label: 'What if this does not work either?' },
  { id: 'fear-time', label: 'I do not have time to figure this out' },
  { id: 'fear-judge', label: 'People will judge me' },
  { id: 'fear-money', label: 'I cannot afford to fail again' },
  { id: 'fear-no-money', label: 'I do not have money to spare' },
  { id: 'fear-scammed', label: 'I have been scammed before' },
  { id: 'fear-complex', label: 'It feels too complex for me' },
];
const Q5_CHIPS = ['18-24', '25-34', '35-44', '45-54', '55+'];
const Q6_OPTIONS = ['9 to 5 Employee', 'Student', 'Stay at Home Parent', 'Freelancer', 'Small Business Owner', 'Currently Unemployed', 'Already in Sales or Marketing'];
const Q7_PAIN = ['No time to figure it out', 'Tried before and failed', 'Do not know where to start', 'No consistent income', 'Feel like an imposter', 'Overwhelmed by information', 'No support system', 'Fear of being judged online', 'Do not believe it can work for them', 'Tired of working hard with no results'];

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

function Card({
  selected,
  onClick,
  children,
  className = '',
}: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${selected ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]' : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'} ${className || ''}`}
    >
      {children}
    </motion.button>
  );
}

function Chip({ selected, onClick, label, disabled = false }: { selected: boolean; onClick: () => void; label: string; disabled?: boolean }) {
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

interface ContentCreatorFlowProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubProgress?: (fraction: number) => void;
}

export default function ContentCreatorFlow({ currentStep, onNext, onBack, onSubProgress }: ContentCreatorFlowProps) {
  const setField = useCampaignStore((s) => s.setField);
  const creatorIdentityPersona = useCampaignStore((s) => s.creatorIdentityPersona);
  const creatorIdentityStyle = useCampaignStore((s) => s.creatorIdentityStyle);
  const creatorIdentityStoryUsedTo = useCampaignStore((s) => s.creatorIdentityStoryUsedTo ?? '');
  const creatorIdentityStoryUntilI = useCampaignStore((s) => s.creatorIdentityStoryUntilI ?? '');
  const creatorIdentityStoryNowIShow = useCampaignStore((s) => s.creatorIdentityStoryNowIShow ?? '');
  const contentCreatorProfession = useCampaignStore((s) => s.contentCreatorProfession ?? '');
  const contentCreatorProfessionOther = useCampaignStore((s) => s.contentCreatorProfessionOther ?? '');
  const contentCreatorFaceType = useCampaignStore((s) => s.contentCreatorFaceType ?? '');
  const contentCreatorAudienceEmotions = useCampaignStore((s) => s.contentCreatorAudienceEmotions ?? []);
  const contentCreatorAudienceWants = useCampaignStore((s) => s.contentCreatorAudienceWants ?? []);
  const contentCreatorAudienceTriedOptions = useCampaignStore((s) => s.contentCreatorAudienceTriedOptions ?? []);
  const contentCreatorAudienceFear = useCampaignStore((s) => s.contentCreatorAudienceFear ?? '');
  const contentCreatorAudienceAges = useCampaignStore((s) => s.contentCreatorAudienceAges ?? []);
  const contentCreatorAudienceLife = useCampaignStore((s) => s.contentCreatorAudienceLife ?? []);
  const contentCreatorAudiencePainPoints = useCampaignStore((s) => s.contentCreatorAudiencePainPoints ?? []);
  const contentCreatorAudienceStatement = useCampaignStore((s) => s.contentCreatorAudienceStatement ?? '');
  const contentCreatorContentTypes = useCampaignStore((s) => s.contentCreatorContentTypes ?? []);
  const contentCreatorContentTypesOther = useCampaignStore((s) => s.contentCreatorContentTypesOther ?? '');
  const contentCreatorPostingFrequency = useCampaignStore((s) => s.contentCreatorPostingFrequency ?? '');
  const contentCreatorScriptBatchSize = useCampaignStore((s) => s.contentCreatorScriptBatchSize ?? '');
  const contentCreatorGeneratedScripts = useCampaignStore((s) => s.contentCreatorGeneratedScripts ?? []);
  const contentCreatorNicheHooks = useCampaignStore((s) => s.contentCreatorNicheHooks ?? []);
  const contentCreatorCalendarSlots = useCampaignStore((s) => s.contentCreatorCalendarSlots ?? []);

  const [step2QuestionIndex, setStep2QuestionIndex] = useState(0);
  const [step2ShowCardReveal, setStep2ShowCardReveal] = useState(false);
  const [step2ShowConfetti, setStep2ShowConfetti] = useState(false);
  const [step6ScriptsGenerated, setStep6ScriptsGenerated] = useState(false);
  const [step6IsGenerating, setStep6IsGenerating] = useState(false);

  const emotionsArray = useMemo(() => {
    const raw = Array.isArray(contentCreatorAudienceEmotions) ? contentCreatorAudienceEmotions : [];
    return raw.filter((e) => Q1_CHIPS.includes(e));
  }, [contentCreatorAudienceEmotions]);
  const wantsArray = useMemo(() => {
    const raw = Array.isArray(contentCreatorAudienceWants) ? contentCreatorAudienceWants : [];
    return raw.filter((e) => Q2_CHIPS.includes(e));
  }, [contentCreatorAudienceWants]);
  const triedArray = useMemo(() => {
    const raw = Array.isArray(contentCreatorAudienceTriedOptions) ? contentCreatorAudienceTriedOptions : [];
    return raw.filter((e) => Q3_CHIPS.includes(e));
  }, [contentCreatorAudienceTriedOptions]);
  const lifeArray = useMemo(() => {
    const raw = Array.isArray(contentCreatorAudienceLife) ? contentCreatorAudienceLife : [];
    return raw.filter((e) => Q6_OPTIONS.includes(e));
  }, [contentCreatorAudienceLife]);

  const audienceStatement =
    contentCreatorAudienceStatement ||
    `I create content for people who feel ${emotionsArray[0]?.toLowerCase() || '...'} because they want ${wantsArray[0]?.toLowerCase() || '...'} but are tired of ${contentCreatorAudiencePainPoints[0]?.toLowerCase() || '...'}.`;

  useEffect(() => {
    if (currentStep !== 2) return;
    const total = 8;
    const frac = (step2QuestionIndex + 1) / total;
    onSubProgress?.(frac);
  }, [currentStep, step2QuestionIndex, onSubProgress]);

  const canNextStep1 =
    !!creatorIdentityPersona &&
    !!creatorIdentityStyle &&
    creatorIdentityStoryUsedTo.trim().length > 0 &&
    creatorIdentityStoryUntilI.trim().length > 0 &&
    creatorIdentityStoryNowIShow.trim().length > 0;

  const canNextStep2Q1 = emotionsArray.length >= 3 && emotionsArray.length <= 5;
  const canNextStep2Q2 = wantsArray.length >= 3 && wantsArray.length <= 5;
  const canNextStep2Q3 = triedArray.length >= 1 && triedArray.length <= 3;
  const canNextStep2Q4 = !!contentCreatorAudienceFear;
  const canNextStep2Q5 = contentCreatorAudienceAges.length > 0;
  const canNextStep2Q6 = lifeArray.length >= 1 && lifeArray.length <= 2;
  const canNextStep2Q7 = contentCreatorAudiencePainPoints.length >= 1 && contentCreatorAudiencePainPoints.length <= 3;
  const canNextStep2Summary = step2ShowCardReveal;

  const canNextStep2 =
    (step2QuestionIndex === 0 && canNextStep2Q1) ||
    (step2QuestionIndex === 1 && canNextStep2Q2) ||
    (step2QuestionIndex === 2 && canNextStep2Q3) ||
    (step2QuestionIndex === 3 && canNextStep2Q4) ||
    (step2QuestionIndex === 4 && canNextStep2Q5) ||
    (step2QuestionIndex === 5 && canNextStep2Q6) ||
    (step2QuestionIndex === 6 && canNextStep2Q7) ||
    (step2QuestionIndex === 7 && canNextStep2Summary);

  const canNextStep3 = contentCreatorProfession ? (contentCreatorProfession !== 'other' || contentCreatorProfessionOther.trim().length > 0) : false;
  const canNextStep4 = contentCreatorContentTypes.length >= 1 && (contentCreatorContentTypes.includes('other') ? contentCreatorContentTypesOther.trim().length > 0 : true);
  const canNextStep5 = !!contentCreatorFaceType;
  const canNextStep6 = step6ScriptsGenerated;

  const toggleMulti = useCallback(
    (field: 'contentCreatorAudienceEmotions' | 'contentCreatorAudienceWants' | 'contentCreatorAudienceTriedOptions' | 'contentCreatorAudienceAges' | 'contentCreatorAudienceLife', value: string, max?: number) => {
      const getArr = () => {
        const s = useCampaignStore.getState();
        if (field === 'contentCreatorAudienceEmotions') return Array.isArray(s.contentCreatorAudienceEmotions) ? s.contentCreatorAudienceEmotions.filter((e) => Q1_CHIPS.includes(e)) : [];
        if (field === 'contentCreatorAudienceWants') return Array.isArray(s.contentCreatorAudienceWants) ? s.contentCreatorAudienceWants.filter((e) => Q2_CHIPS.includes(e)) : [];
        if (field === 'contentCreatorAudienceTriedOptions') return Array.isArray(s.contentCreatorAudienceTriedOptions) ? s.contentCreatorAudienceTriedOptions.filter((e) => Q3_CHIPS.includes(e)) : [];
        if (field === 'contentCreatorAudienceAges') return Array.isArray(s.contentCreatorAudienceAges) ? s.contentCreatorAudienceAges : [];
        return Array.isArray(s.contentCreatorAudienceLife) ? s.contentCreatorAudienceLife.filter((e) => Q6_OPTIONS.includes(e)) : [];
      };
      const arr = getArr();
      const isRemoving = arr.includes(value);
      const next = isRemoving ? arr.filter((x) => x !== value) : (max != null && arr.length >= max ? arr : [...arr, value]);
      setField(field, next);
    },
    [setField]
  );

  const togglePain = useCallback(
    (label: string) => {
      const next = contentCreatorAudiencePainPoints.includes(label)
        ? contentCreatorAudiencePainPoints.filter((x) => x !== label)
        : contentCreatorAudiencePainPoints.length >= 3 ? contentCreatorAudiencePainPoints : [...contentCreatorAudiencePainPoints, label];
      setField('contentCreatorAudiencePainPoints', next);
    },
    [contentCreatorAudiencePainPoints, setField]
  );

  const handleStep2Back = () => {
    if (step2QuestionIndex === 0) onBack();
    else setStep2QuestionIndex((i) => i - 1);
  };
  const handleStep2Next = () => {
    if (step2QuestionIndex < 7) setStep2QuestionIndex((i) => i + 1);
    else onNext();
  };
  const handleGenerateAvatarCard = () => {
    setField('contentCreatorAudienceStatement', audienceStatement);
    setStep2ShowConfetti(true);
    setStep2ShowCardReveal(true);
    setTimeout(() => setStep2ShowConfetti(false), 1200);
  };

  const generatePlaceholderScripts = useCallback(() => {
    setStep6IsGenerating(true);
    const niche = contentCreatorProfession === 'other' ? contentCreatorProfessionOther : NICHE_OPTIONS.find((n) => n.id === contentCreatorProfession)?.label || 'Creator';
    const count = 21;
    const scripts: typeof contentCreatorGeneratedScripts = [];
    const hookStyles = ['Personal story', 'Pain point', 'Education tip', 'Transformation', 'Myth busting', 'Social proof', 'Bold claim', 'Question', 'Behind the scenes', 'Call out'];
    const ctas = ['Comment READY below', 'Drop ME for details', 'Save this right now', 'Share this today', 'DM me INFO', 'Follow for more', 'Tag someone stuck', 'Comment YES if this hit'];
    for (let i = 0; i < count; i++) {
      scripts.push({
        id: `script-${i}`,
        dayLabel: `Day ${Math.floor(i / 3) + 1} ${['Morning', 'Afternoon', 'Evening'][i % 3]}`,
        type: 'Reel',
        hook: `${hookStyles[i % hookStyles.length]} hook for ${niche}`,
        problem: 'One sentence problem.',
        solution: 'One sentence solution.',
        cta: ctas[i % ctas.length],
        fullScript: `HOOK: ${hookStyles[i % hookStyles.length]} hook for ${niche}\n\nPROBLEM: One sentence problem.\n\nSOLUTION: One sentence solution.\n\nCTA: ${ctas[i % ctas.length]}`,
      });
    }
    setField('contentCreatorGeneratedScripts', scripts);
    const hooks: string[] = [];
    for (let i = 0; i < 10; i++) {
      hooks.push(`${niche} hook ${i + 1} - scroll stop`);
    }
    setField('contentCreatorNicheHooks', hooks);
    setStep6ScriptsGenerated(true);
    setStep6IsGenerating(false);
  }, [contentCreatorProfession, contentCreatorProfessionOther, setField]);

  const generateCalendar = useCallback(() => {
    const slots: { dayNumber: number; contentType: string; topic: string }[] = [];
    const types = ['Reel', 'Carousel', 'Story', 'Live', 'Post', 'Podcast'];
    const days = ['Relatable story', 'Educational - teach one thing', 'Engagement - ask a question', 'Value - tip or insight', 'Social proof or transformation', 'Behind the scenes', 'Faith or motivational'];
    for (let d = 1; d <= 30; d++) {
      slots.push({
        dayNumber: d,
        contentType: types[d % types.length],
        topic: days[d % 7],
      });
    }
    setField('contentCreatorCalendarSlots', slots);
  }, [setField]);

  useEffect(() => {
    if (currentStep === 7 && contentCreatorCalendarSlots.length === 0) {
      generateCalendar();
    }
  }, [currentStep, contentCreatorCalendarSlots.length, generateCalendar]);

  const stepCanNext =
    currentStep === 1 ? canNextStep1 :
    currentStep === 2 ? canNextStep2 :
    currentStep === 3 ? canNextStep3 :
    currentStep === 4 ? canNextStep4 :
    currentStep === 5 ? canNextStep5 :
    currentStep === 6 ? canNextStep6 : false;

  const handleNextClick = () => {
    if (currentStep === 2) {
      handleStep2Next();
    } else {
      onNext();
    }
  };

  const showNextButton = currentStep < 7;

  const handleBackClick = () => {
    if (currentStep === 2) {
      handleStep2Back();
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Let's build your creator identity
            </h2>
            <p className="text-[#9a8fa8] text-sm font-medium">How do you show up as a creator?</p>
          </div>
          <div>
            <h3 className="text-[#c9a84c] text-sm font-bold mb-2 uppercase tracking-wide">Section A - Your Persona</h3>
            <div className="grid grid-cols-2 gap-3">
              {PERSONA_OPTIONS.map((p) => (
                <Card key={p.id} selected={creatorIdentityPersona === p.id} onClick={() => setField('creatorIdentityPersona', p.id)}>
                  <h4 className="text-sm font-bold text-[#c9a84c] uppercase">{p.title}</h4>
                  <p className="mt-1 text-xs text-[#b8aed0]">{p.description}</p>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#5eead4] text-sm font-bold mb-2 uppercase tracking-wide">Section B - Your Content Style</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STYLE_OPTIONS.map((s) => (
                <Card key={s.id} selected={creatorIdentityStyle === s.id} onClick={() => setField('creatorIdentityStyle', s.id)}>
                  <h4 className="text-sm font-bold text-[#c9a84c] uppercase">{s.title}</h4>
                  <p className="mt-1 text-xs text-[#b8aed0]">{s.description}</p>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#c9a84c] text-sm font-bold mb-2 uppercase tracking-wide">Section C - Your Story in One Line</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#d4cce8] mb-1">I used to...</label>
                <input
                  type="text"
                  value={creatorIdentityStoryUsedTo}
                  onChange={(e) => setField('creatorIdentityStoryUsedTo', e.target.value)}
                  placeholder="e.g. struggle with money while working full time"
                  className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#d4cce8] mb-1">Until I...</label>
                <input
                  type="text"
                  value={creatorIdentityStoryUntilI}
                  onChange={(e) => setField('creatorIdentityStoryUntilI', e.target.value)}
                  placeholder="e.g. discovered digital income"
                  className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#d4cce8] mb-1">Now I show...</label>
                <input
                  type="text"
                  value={creatorIdentityStoryNowIShow}
                  onChange={(e) => setField('creatorIdentityStoryNowIShow', e.target.value)}
                  placeholder="e.g. burnt-out professionals how to earn online"
                  className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="min-h-[400px] flex flex-col pb-20">
          <p className="text-[#6a5f80] text-xs font-medium mb-4">{step2QuestionIndex === 7 ? 'Summary' : `Question ${step2QuestionIndex + 1} of 7`}</p>
          <AnimatePresence mode="sync" initial={false}>
            {step2QuestionIndex === 0 && (
              <motion.div key="q1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Who are you really talking to?</h2>
                <p className="text-[#9a8fa8] text-sm font-medium mb-2">Not everyone. ONE person. The version of you from before.</p>
                <p className="text-[#c9a84c] text-sm font-semibold">The more specific you are, the more powerful your content becomes.</p>
                <p className="text-lg font-semibold text-[#e8c96a]">This person wakes up every morning feeling...</p>
                <p className="text-[#c9a84c] font-semibold text-sm">Select 3 to 5 - {emotionsArray.length} selected</p>
                <div className="flex flex-wrap gap-2">
                  {Q1_CHIPS.map((label) => {
                    const selected = emotionsArray.includes(label);
                    const disabled = !selected && emotionsArray.length >= 5;
                    return <Chip key={label} selected={selected} onClick={() => toggleMulti('contentCreatorAudienceEmotions', label, 5)} label={label} disabled={disabled} />;
                  })}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 1 && (
              <motion.div key="q2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What they REALLY want is...</h2>
                <p className="text-[#c9a84c] font-semibold text-sm">{wantsArray.length} of 5 selected</p>
                <div className="flex flex-wrap gap-2">
                  {Q2_CHIPS.map((label) => {
                    const selected = wantsArray.includes(label);
                    const disabled = !selected && wantsArray.length >= 5;
                    return <Chip key={label} selected={selected} onClick={() => toggleMulti('contentCreatorAudienceWants', label, 5)} label={label} disabled={disabled} />;
                  })}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 2 && (
              <motion.div key="q3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>They have already tried...</h2>
                <p className="text-[#c9a84c] font-semibold text-sm">Up to 3 - {triedArray.length} selected</p>
                <div className="flex flex-wrap gap-2">
                  {Q3_CHIPS.map((label) => {
                    const selected = triedArray.includes(label);
                    const disabled = !selected && triedArray.length >= 3;
                    return <Chip key={label} selected={selected} onClick={() => toggleMulti('contentCreatorAudienceTriedOptions', label, 3)} label={label} disabled={disabled} />;
                  })}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 3 && (
              <motion.div key="q4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Their biggest fear is...</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Q4_CARDS.map((c) => (
                    <Card key={c.id} selected={contentCreatorAudienceFear === c.id} onClick={() => setField('contentCreatorAudienceFear', c.id)}>
                      <span className="text-sm font-semibold text-[#f0ebff]">{c.label}</span>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 4 && (
              <motion.div key="q5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>How old is this person likely?</h2>
                <div className="flex flex-wrap gap-2">
                  {Q5_CHIPS.map((label) => (
                    <Chip key={label} selected={contentCreatorAudienceAges.includes(label)} onClick={() => toggleMulti('contentCreatorAudienceAges', label)} label={label} />
                  ))}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 5 && (
              <motion.div key="q6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What best describes their life right now?</h2>
                <p className="text-[#c9a84c] font-semibold text-sm">Select up to 2 - {lifeArray.length} selected</p>
                <div className="flex flex-wrap gap-2">
                  {Q6_OPTIONS.map((label) => {
                    const selected = lifeArray.includes(label);
                    const disabled = !selected && lifeArray.length >= 2;
                    return <Chip key={label} selected={selected} onClick={() => toggleMulti('contentCreatorAudienceLife', label, 2)} label={label} disabled={disabled} />;
                  })}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 6 && (
              <motion.div key="q7" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Pick their top 3 pain points</h2>
                <p className="text-[#c9a84c] font-semibold text-sm">0 of 3 selected - {contentCreatorAudiencePainPoints.length} selected</p>
                <div className="flex flex-wrap gap-2">
                  {Q7_PAIN.map((label) => {
                    const selected = contentCreatorAudiencePainPoints.includes(label);
                    const disabled = !selected && contentCreatorAudiencePainPoints.length >= 3;
                    return <Chip key={label} selected={selected} onClick={() => !disabled && togglePain(label)} label={label} disabled={disabled} />;
                  })}
                </div>
              </motion.div>
            )}
            {step2QuestionIndex === 7 && (
              <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="space-y-6 relative">
                {step2ShowConfetti && <GoldConfetti />}
                <h2 className="text-xl md:text-2xl font-bold text-[#f0ebff]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your audience in one sentence</h2>
                <div className="rounded-2xl border-2 border-[#c9a84c] p-6 bg-[rgba(201,168,76,0.08)] shadow-[0_0_32px_rgba(201,168,76,0.2)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  <p className="text-[#e8c96a] text-lg md:text-xl leading-relaxed italic">&quot;{audienceStatement}&quot;</p>
                </div>
                {!step2ShowCardReveal ? (
                  <button type="button" onClick={handleGenerateAvatarCard} className="w-full py-4 rounded-xl font-bold bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] transition-all shadow-[0_0_24px_rgba(201,168,76,0.35)]">
                    Generate My Audience Avatar Card
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-[#c9a84c] p-6 bg-[#1c1a35] space-y-4">
                    <p className="text-[#c9a84c] font-bold text-sm uppercase tracking-wide">Your audience avatar</p>
                    {emotionsArray.length > 0 && <p className="text-[#f0ebff] font-medium">Feels: {emotionsArray.join(', ')}</p>}
                    {wantsArray.length > 0 && <p className="text-[#f0ebff] font-medium">Wants: {wantsArray.join(', ')}</p>}
                    {triedArray.length > 0 && <p className="text-[#f0ebff] font-medium">Tried: {triedArray.join(', ')}</p>}
                    {contentCreatorAudienceFear && <p className="text-[#f0ebff] font-medium">Fear: {Q4_CARDS.find((c) => c.id === contentCreatorAudienceFear)?.label}</p>}
                    {contentCreatorAudienceAges.length > 0 && <p className="text-[#f0ebff] font-medium">Age: {contentCreatorAudienceAges.join(', ')}</p>}
                    {lifeArray.length > 0 && <p className="text-[#f0ebff] font-medium">Life: {lifeArray.join(', ')}</p>}
                    {contentCreatorAudiencePainPoints.length > 0 && <p className="text-[#f0ebff] font-medium">Pain: {contentCreatorAudiencePainPoints.join(', ')}</p>}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (currentStep === 3) {
      const affirmation = contentCreatorProfession ? NICHE_AFFIRMATIONS[contentCreatorProfession] || NICHE_AFFIRMATIONS.other : null;
      return (
        <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What is your world?</h2>
            <p className="text-[#9a8fa8] text-sm font-medium">Pick the one that fits you best right now</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {NICHE_OPTIONS.map((n) => {
              const selected = contentCreatorProfession === n.id;
              return (
                <motion.button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setField('contentCreatorProfession', n.id);
                    if (n.id !== 'other') setField('contentCreatorProfessionOther', '');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                    selected ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]' : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <span className="block text-sm font-bold text-[#c9a84c] uppercase">{n.label}</span>
                </motion.button>
              );
            })}
          </div>
          {contentCreatorProfession === 'other' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
              <input
                type="text"
                value={contentCreatorProfessionOther}
                onChange={(e) => setField('contentCreatorProfessionOther', e.target.value)}
                placeholder="Tell us your world..."
                className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              />
            </motion.div>
          )}
          {affirmation && <p className="text-[#e8c96a] font-semibold text-sm">{affirmation}</p>}
        </motion.div>
      );
    }

    if (currentStep === 4) {
      const contentTypeIds = CONTENT_TYPE_OPTIONS.map((c) => c.id);
      const selectedIds = contentCreatorContentTypes.filter((id) => contentTypeIds.includes(id));
      const toggle = (id: string) => {
        const next = selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id];
        setField('contentCreatorContentTypes', next);
      };
      return (
        <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What kind of content are you creating?</h2>
            <p className="text-[#9a8fa8] text-sm font-medium">Select everything that applies</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CONTENT_TYPE_OPTIONS.map((c) => {
              const selected = selectedIds.includes(c.id);
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                    selected ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]' : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <span className="block text-sm font-bold text-[#c9a84c] uppercase">{c.label}</span>
                </motion.button>
              );
            })}
          </div>
          {selectedIds.includes('other') && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
              <input
                type="text"
                value={contentCreatorContentTypesOther}
                onChange={(e) => setField('contentCreatorContentTypesOther', e.target.value)}
                placeholder="Other content type..."
                className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              />
            </motion.div>
          )}
        </motion.div>
      );
    }

    if (currentStep === 5) {
      const selectedAffirmation = contentCreatorFaceType ? FACELESS_OPTIONS.find((o) => o.id === contentCreatorFaceType)?.affirmation : null;
      return (
        <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Now the big question...</h2>
            <p className="text-[#9a8fa8] text-sm font-medium">How do YOU want to show up?</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACELESS_OPTIONS.map((opt) => (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => setField('contentCreatorFaceType', opt.id as '' | 'faceless' | 'face-forward')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                  contentCreatorFaceType === opt.id ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_28px_rgba(201,168,76,0.3)]' : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                }`}
              >
                <h3 className="text-lg font-bold text-[#c9a84c] uppercase">{opt.title}</h3>
                <p className="mt-2 text-sm text-[#b8aed0]" style={{ whiteSpace: 'pre-line' }}>{opt.subtext}</p>
              </motion.button>
            ))}
          </div>
          {selectedAffirmation && <p className="text-[#e8c96a] font-semibold">{selectedAffirmation}</p>}
        </motion.div>
      );
    }

    if (currentStep === 6) {
      const hasFrequency = !!contentCreatorPostingFrequency;
      const hasBatch = !!contentCreatorScriptBatchSize;
      const showGenerate = hasFrequency && hasBatch && !step6ScriptsGenerated;
      return (
        <motion.div key="step6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-8 pb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your scripts - ready to go</h2>
            <p className="text-[#9a8fa8] text-sm font-medium">Built from your niche, your identity, and your audience</p>
          </div>
          {!hasFrequency && (
            <div className="space-y-4">
              <p className="text-[#e8c96a] font-semibold">How often are you publishing?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FREQUENCY_OPTIONS.map((f) => (
                  <Card key={f.id} selected={contentCreatorPostingFrequency === f.id} onClick={() => setField('contentCreatorPostingFrequency', f.id)}>
                    <span className="text-sm font-bold text-[#c9a84c] uppercase">{f.label}</span>
                    <p className="mt-1 text-xs text-[#b8aed0]">{f.sublabel}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {hasFrequency && !hasBatch && (
            <div className="space-y-4">
              <p className="text-[#e8c96a] font-semibold">How many scripts do you need right now?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BATCH_OPTIONS.map((b) => (
                  <Card key={b.id} selected={contentCreatorScriptBatchSize === b.id} onClick={() => setField('contentCreatorScriptBatchSize', b.id)}>
                    <span className="text-sm font-bold text-[#c9a84c] uppercase">{b.label}</span>
                    <p className="mt-1 text-xs text-[#b8aed0]">{b.sublabel}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {showGenerate && (
            <button
              type="button"
              onClick={generatePlaceholderScripts}
              disabled={step6IsGenerating}
              className="w-full py-4 rounded-xl font-bold bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] transition-all shadow-[0_0_24px_rgba(201,168,76,0.35)] disabled:opacity-60"
            >
              {step6IsGenerating ? 'Generating...' : 'Generate My Scripts'}
            </button>
          )}
          {step6ScriptsGenerated && contentCreatorGeneratedScripts.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => navigator.clipboard.writeText(contentCreatorGeneratedScripts.map((s) => s.fullScript || '').join('\n\n---\n\n'))} className="px-4 py-2 rounded-lg font-semibold bg-[#c9a84c] text-[#0d0b1a]">
                  Copy All Scripts
                </button>
              </div>
              <div className="space-y-3 max-h-[320px] overflow-y-auto">
                {contentCreatorGeneratedScripts.slice(0, 7).map((s) => (
                  <div key={s.id} className="rounded-xl border border-[rgba(201,168,76,0.3)] p-4 bg-[#17152e]">
                    <p className="text-[#c9a84c] text-xs font-bold">{s.dayLabel} - {s.type}</p>
                    <p className="text-[#f0ebff] text-sm mt-2 whitespace-pre-wrap">{s.fullScript}</p>
                    <button type="button" onClick={() => navigator.clipboard.writeText(s.fullScript || '')} className="mt-2 text-xs text-[#e8c96a] font-semibold">Copy</button>
                  </div>
                ))}
                {contentCreatorGeneratedScripts.length > 7 && <p className="text-[#9a8fa8] text-sm">+ {contentCreatorGeneratedScripts.length - 7} more scripts</p>}
              </div>
              {contentCreatorNicheHooks.length > 0 && (
                <div className="pt-4 border-t border-[rgba(201,168,76,0.2)]">
                  <h3 className="text-[#c9a84c] font-bold mb-2">Your Niche Hook Bank</h3>
                  <p className="text-[#9a8fa8] text-xs mb-2">10 scroll-stopping hooks built for your niche - 5 words or fewer each</p>
                  <div className="flex flex-wrap gap-2">
                    {contentCreatorNicheHooks.map((hook, i) => (
                      <button key={i} type="button" onClick={() => navigator.clipboard.writeText(hook)} className="rounded-full px-3 py-1.5 text-xs font-semibold border border-[rgba(201,168,76,0.4)] text-[#e8c96a] hover:bg-[rgba(201,168,76,0.1)]">
                        {hook}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    }

    if (currentStep === 7) {
      const slots = contentCreatorCalendarSlots;
      return (
        <motion.div key="step7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition} className="space-y-8 pb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your 30 Day Content Plan</h2>
            <p className="text-[#9a8fa8] text-sm font-medium">A different plan every month - built around your niche and audience</p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              const slot = slots.find((s) => s.dayNumber === d);
              return (
                <div key={d} className="rounded-lg border border-[rgba(201,168,76,0.25)] p-2 bg-[rgba(28,26,53,0.8)]">
                  <p className="text-[#c9a84c] text-xs font-bold">Day {d}</p>
                  <p className="text-[#f0ebff] text-xs">{slot?.contentType || 'Post'}</p>
                  <p className="text-[#b8aed0] text-xs truncate" title={slot?.topic}>{slot?.topic || '-'}</p>
                  <button type="button" className="mt-1 text-[10px] text-[#e8c96a] font-semibold">Get Script</button>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={generateCalendar} className="px-4 py-2 rounded-lg font-semibold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)]">
            Regenerate Calendar
          </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[rgba(201,168,76,0.2)] p-4 bg-[#17152e]">
              <h3 className="text-[#c9a84c] font-bold mb-2 uppercase">Posting frequency guide</h3>
              <ul className="text-[#d4cce8] text-sm space-y-1">
                <li>Instagram Reels: 4 to 5 times per week</li>
                <li>Instagram Stories: Daily - 3 to 7 frames</li>
                <li>TikTok: 1 to 3 times daily for growth</li>
                <li>Facebook: 1 to 2 times daily</li>
                <li>YouTube Shorts: 3 to 5 times per week</li>
                <li>Pinterest: 5 to 10 pins per day</li>
                <li>LinkedIn: 3 to 5 times per week</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[rgba(201,168,76,0.2)] p-4 bg-[#17152e]">
              <h3 className="text-[#c9a84c] font-bold mb-2 uppercase">DOs and DONTs</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#5eead4] font-semibold mb-1">DOs</p>
                  <ul className="text-[#d4cce8] space-y-0.5">
                    <li>Hook in the first 3 seconds</li>
                    <li>Bold visible text on screen</li>
                    <li>Speak to ONE person only</li>
                    <li>Add captions - 85 percent watch on mute</li>
                    <li>Every post needs a CTA</li>
                    <li>Check analytics every week</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#e8a0a0] font-semibold mb-1">DONTs</p>
                  <ul className="text-[#d4cce8] space-y-0.5">
                    <li>Never post without a plan</li>
                    <li>Never use vague hooks</li>
                    <li>Never overload text on screen</li>
                    <li>Never ignore your analytics</li>
                    <li>Never speak to everyone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-[400px] flex flex-col pb-24">
      <AnimatePresence mode="sync" initial={false}>
        {renderStepContent()}
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.15)] bg-[#1c1a35] z-[100] md:left-[240px]" style={{ pointerEvents: 'auto' }}>
        <button type="button" onClick={handleBackClick} className="px-5 py-3 rounded-lg font-bold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all">
          Back
        </button>
        {showNextButton && (
          <button
            type="button"
            onClick={handleNextClick}
            disabled={!stepCanNext}
            className="px-6 py-3 rounded-lg font-bold border-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
          >
            Next
          </button>
        )}
        {!showNextButton && <div className="w-24" />}
      </div>
    </div>
  );
}
