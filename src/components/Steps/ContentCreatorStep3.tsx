import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';

const PROJECT_OPTIONS = [
  { id: 'daily-social', label: 'Daily Social Media Content' },
  { id: 'ebook', label: 'eBook Creation' },
  { id: 'daily-podcast', label: 'Daily Podcast Content' },
  { id: 'online-community', label: 'Online Community Launch' },
  { id: 'ai-faceless', label: 'AI Content for Faceless Creators' },
  { id: 'faith-based', label: 'Faith-Based and Inspirational Content' },
  { id: 'fitness-nutrition', label: 'Fitness and Nutrition Content' },
  { id: 'digital-marketing', label: 'Digital marketing content' },
  { id: 'affiliate-marketing', label: 'High ticket affiliate marketing content' },
  { id: 'comedy-humor-skits', label: 'Comedy' },
  { id: 'kid-friendly', label: 'Kid-friendly content' },
  { id: 'other', label: 'Other' },
];
const PROJECT_IDS = PROJECT_OPTIONS.map((p) => p.id);
const MAX_PROJECT_SELECT = 3;

function GoldParticles() {
  const particles = useMemo(() => Array.from({ length: 32 }, (_, i) => ({ id: i, angle: (i / 32) * 360 })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map(({ id, angle }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 rounded-full bg-[#c9a84c] left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * 280,
            y: Math.sin((angle * Math.PI) / 180) * 280,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

interface ContentCreatorStep3Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ContentCreatorStep3({ onNext, onBack }: ContentCreatorStep3Props) {
  const { contentCreatorProjectTypes, contentCreatorProjectOther, setField } = useCampaignStore();
  const [showHype, setShowHype] = useState(false);

  const selectedIds = Array.isArray(contentCreatorProjectTypes)
    ? contentCreatorProjectTypes.filter((id) => PROJECT_IDS.includes(id))
    : contentCreatorProjectTypes
      ? [String(contentCreatorProjectTypes)]
      : [];

  const toggleProject = (id: string) => {
    const isSelected = selectedIds.includes(id);
    const next = isSelected
      ? selectedIds.filter((x) => x !== id)
      : selectedIds.length >= MAX_PROJECT_SELECT
        ? selectedIds
        : [...selectedIds, id];
    setField('contentCreatorProjectTypes', next);
  };

  const handleNext = () => {
    setShowHype(true);
    const t = setTimeout(() => {
      setShowHype(false);
      onNext();
    }, 1500);
    return () => clearTimeout(t);
  };

  const hasOther = selectedIds.includes('other');
  const canNext =
    selectedIds.length >= 1 &&
    selectedIds.length <= MAX_PROJECT_SELECT &&
    (!hasOther || contentCreatorProjectOther.trim().length > 0);

  if (showHype) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[320px] py-12 relative"
      >
        <GoldParticles />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-[#e8c96a] text-center px-4 relative z-10"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Let's build your empire.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-[#f0ebff] mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            We're building content that converts for:
          </h2>
          <p className="text-[#9a8fa8] text-sm font-medium mb-2">
            Pick up to 3
          </p>
          <p className="text-[#c9a84c] font-semibold text-sm mb-4">{selectedIds.length}/{MAX_PROJECT_SELECT} selected</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PROJECT_OPTIONS.map((p) => {
            const selected = selectedIds.includes(p.id);
            const disabled = !selected && selectedIds.length >= MAX_PROJECT_SELECT;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => !disabled && toggleProject(p.id)}
                disabled={disabled}
                whileHover={!disabled ? { scale: 1.02 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                className={`rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                  selected
                    ? 'border-[#c9a84c] bg-[rgba(201,168,76,0.15)] shadow-[0_0_24px_rgba(201,168,76,0.25)]'
                    : disabled
                      ? 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.6)] opacity-30 cursor-not-allowed'
                      : 'border-[rgba(201,168,76,0.2)] bg-[rgba(28,26,53,0.8)] hover:border-[rgba(201,168,76,0.5)]'
                }`}
              >
                <span className="block text-sm font-bold text-[#f0ebff]">{p.label}</span>
              </motion.button>
            );
          })}
        </div>

        {hasOther && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
            <input
              type="text"
              value={contentCreatorProjectOther}
              onChange={(e) => setField('contentCreatorProjectOther', e.target.value)}
              placeholder="Tell us what you're building..."
              className="w-full rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#17152e] px-4 py-3 text-[#f0ebff] placeholder-[#6a5f80] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </motion.div>
        )}
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.15)] bg-[#1c1a35] z-[100] md:left-[240px]" style={{ pointerEvents: 'auto' }}>
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-lg font-bold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
        >
          Back
        </button>
        <div className="w-24" />
        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext}
          className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
