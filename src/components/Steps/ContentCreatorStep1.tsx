import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';

const PROFESSIONS = [
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'high-ticket-affiliate-marketing', label: 'High Ticket Affiliate Marketing' },
  { id: 'immigration-consulting', label: 'Immigration Consulting' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'coaching-services', label: 'Coaching Services' },
  { id: 'financial-services', label: 'Financial Services' },
  { id: 'fashion-beauty', label: 'Fashion & Beauty' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'ai-arbitrage', label: 'AI Arbitrage' },
  { id: 'healthcare-services', label: 'Healthcare Services' },
  { id: 'religious-services', label: 'Religious Services' },
  { id: 'other', label: 'Other' },
] as const;

const PROFESSION_AFFIRMATIONS: Record<string, string> = {
  'digital-marketing': 'Your own product. Your own income. Let\'s build it.',
  'high-ticket-affiliate-marketing': 'Big commissions, smart strategy. You are in the right place.',
  'immigration-consulting': 'People need your expertise. Let\'s get you seen.',
  'real-estate': 'Real estate plus content equals unstoppable.',
  'coaching-services': 'Coaches who show up online build empires.',
  'financial-services': 'Money content that actually helps people? That is powerful.',
  'fashion-beauty': 'Style is influence. Let\'s build yours.',
  'ecommerce': 'Products plus content equals a brand people love.',
  'ai-arbitrage': 'Smart strategy. Let\'s build it.',
  'healthcare-services': 'Your knowledge can change lives. Let\'s share it.',
  'religious-services': 'Your message deserves a bigger stage.',
  'other': 'Your path is yours. Let\'s build it.',
};

const PERSONA_OPTIONS = [
  { id: 'teacher', title: 'The Teacher', description: 'You educate and break things down simply' },
  { id: 'friend', title: 'The Friend', description: 'You share your journey like talking to a bestie' },
  { id: 'coach', title: 'The Coach', description: 'You push people to take action' },
  { id: 'expert', title: 'The Expert', description: 'You lead with authority and results' },
  { id: 'storyteller', title: 'The Storyteller', description: 'You connect through real personal stories' },
  { id: 'rebel', title: 'The Rebel', description: 'You challenge the mainstream and speak hard truths' },
];

const STYLE_OPTIONS = [
  { id: 'natural', title: 'Natural and Authentic', description: 'Real, raw, unfiltered' },
  { id: 'bold', title: 'Bold and Confident', description: 'Strong opinions, strong presence' },
  { id: 'minimal', title: 'Minimal and Clean', description: 'Simple, clear, focused' },
  { id: 'luxury', title: 'Luxury and Premium', description: 'Elevated, aspirational, polished' },
  { id: 'casual', title: 'Casual and Relatable', description: 'Everyday, human, and warm' },
  { id: 'power', title: 'Power and Authority', description: 'Commanding, credible, results-focused' },
];

const FACE_OPTIONS = [
  { id: 'faceless' as const, title: 'FACELESS', subtitle: 'My presence. My voice. My AI twin/ avatar. No camera, still my brand.', affirmation: 'Faceless creators are taking over. Smart move.' },
  { id: 'face-forward' as const, title: 'FACE FORWARD', subtitle: 'Full presence, camera on, my brand.', affirmation: 'People buy from people. You have got this.' },
];

interface ContentCreatorStep1Props {
  onNext: () => void;
  onBack: () => void;
  onSubProgress?: (fraction: number) => void;
}

export default function ContentCreatorStep1({ onNext, onBack, onSubProgress }: ContentCreatorStep1Props) {
  const {
    contentCreatorProfession,
    contentCreatorProfessionOther,
    contentCreatorFaceType,
    creatorIdentityPersona,
    creatorIdentityStyle,
    setField,
  } = useCampaignStore();
  const [screen, setScreen] = useState<'profession' | 'identity' | 'face'>('profession');
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [showOtherInput, setShowOtherInput] = useState(contentCreatorProfession === 'other');

  useEffect(() => {
    const fraction = screen === 'profession' ? 0 : screen === 'identity' ? 1 / 3 : 2 / 3;
    onSubProgress?.(fraction);
  }, [screen, onSubProgress]);

  const handleProfessionSelect = (id: string) => {
    if (id === 'other') {
      setShowOtherInput(true);
      setField('contentCreatorProfession', 'other');
    } else {
      setShowOtherInput(false);
      setField('contentCreatorProfession', id);
      setAffirmation(PROFESSION_AFFIRMATIONS[id] || PROFESSION_AFFIRMATIONS.other);
    }
  };

  const handleFaceSelect = (id: 'faceless' | 'face-forward') => {
    setField('contentCreatorFaceType', id);
    setAffirmation(FACE_OPTIONS.find((o) => o.id === id)!.affirmation);
  };

  const handleBack = useCallback(() => {
    if (screen === 'face') {
      setScreen('identity');
      setAffirmation(null);
    } else if (screen === 'identity') {
      setScreen('profession');
      setAffirmation(null);
    } else {
      onBack();
    }
  }, [screen, onBack]);

  const handleNextFromProfession = useCallback(() => {
    setAffirmation(null);
    setScreen('identity');
  }, []);

  const handleNextFromIdentity = useCallback(() => {
    setAffirmation(null);
    setScreen('face');
  }, []);

  const handleNextFromFace = useCallback(() => {
    setAffirmation(null);
    onNext();
  }, [onNext]);

  const canAdvanceProfession = contentCreatorProfession && (contentCreatorProfession !== 'other' || contentCreatorProfessionOther.trim());
  const canAdvanceIdentity = !!creatorIdentityPersona && !!creatorIdentityStyle;
  const canAdvanceFace = !!contentCreatorFaceType;

  return (
    <div className="min-h-[400px] flex flex-col pb-20">
      <AnimatePresence mode="sync" initial={false}>
        {affirmation ? (
          <motion.div
            key="affirmation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center flex-1 py-12 pointer-events-auto"
          >
            <p
              className="text-xl md:text-2xl font-bold text-center text-[#e8c96a] px-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {affirmation}
            </p>
          </motion.div>
        ) : screen === 'identity' ? (
          <motion.div
            key="identity"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="space-y-6 border border-[rgba(201,168,76,0.4)] rounded-2xl bg-[rgba(13,11,26,0.9)] shadow-[0_0_30px_rgba(201,168,76,0.25)] px-4 py-4"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Creator Identity
              </h2>
              <p className="text-[#9a8fa8] text-sm font-medium mb-4">Your persona and content style</p>
            </div>
            <div>
              <h3 className="text-[#c9a84c] text-sm font-bold mb-2 uppercase tracking-wide">Section 1 - Your persona</h3>
              <p className="text-[#9a8fa8] text-xs mb-3">How do you show up as a creator?</p>
              <div className="grid grid-cols-2 gap-3">
                {PERSONA_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.id}
                    type="button"
                    onClick={() => setField('creatorIdentityPersona', opt.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                      creatorIdentityPersona === opt.id
                        ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_20px_rgba(201,168,76,0.25)]'
                        : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#f0ebff]">{opt.title}</span>
                    <span className="block text-xs text-[#9a8fa8] mt-0.5">{opt.description}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#5eead4] text-sm font-bold mb-2 uppercase tracking-wide">Section 2 - Your content style</h3>
              <p className="text-[#9a8fa8] text-xs mb-3">What vibe do you bring to your content?</p>
              <div className="grid grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.id}
                    type="button"
                    onClick={() => setField('creatorIdentityStyle', opt.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                      creatorIdentityStyle === opt.id
                        ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_20px_rgba(201,168,76,0.25)]'
                        : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#f0ebff]">{opt.title}</span>
                    <span className="block text-xs text-[#9a8fa8] mt-0.5">{opt.description}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : screen === 'profession' ? (
          <motion.div
            key="profession"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                First things first - what's your world?
              </h2>
              <p className="text-[#9a8fa8] text-sm font-medium">Pick the one that fits you best right now</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROFESSIONS.map((p) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => handleProfessionSelect(p.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                    contentCreatorProfession === p.id
                      ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]'
                      : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <span className="block text-sm font-bold text-[#f0ebff]">{p.label}</span>
                </motion.button>
              ))}
            </div>

            {showOtherInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-2"
              >
                <input
                  type="text"
                  value={contentCreatorProfessionOther}
                  onChange={(e) => setField('contentCreatorProfessionOther', e.target.value)}
                  placeholder="Tell us your world..."
                  className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="face"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Now the big question...
              </h2>
              <p className="text-[#9a8fa8] text-sm font-medium">How do YOU want to show up?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FACE_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => handleFaceSelect(opt.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                    contentCreatorFaceType === opt.id
                      ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_28px_rgba(201,168,76,0.3)]'
                      : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <h3 className="text-lg font-bold text-[#f0ebff]">{opt.title}</h3>
                  <p className="mt-1 text-sm text-[#b8aed0]" style={{ whiteSpace: 'pre-line' }}>{opt.subtitle}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.15)] bg-[#1c1a35] z-[100] md:left-[240px]" style={{ pointerEvents: 'auto' }}>
        <button
          type="button"
          onClick={handleBack}
          className="px-5 py-3 rounded-lg font-bold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
        >
          Back
        </button>
        <div className="w-24" />
        {screen === 'profession' && (
          <button
            type="button"
            onClick={handleNextFromProfession}
            disabled={!canAdvanceProfession}
            className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
          >
            Next
          </button>
        )}
        {screen === 'identity' && (
          <button
            type="button"
            onClick={handleNextFromIdentity}
            disabled={!canAdvanceIdentity}
            className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
          >
            Next
          </button>
        )}
        {screen === 'face' && (
          <button
            type="button"
            onClick={handleNextFromFace}
            disabled={!canAdvanceFace}
            className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
