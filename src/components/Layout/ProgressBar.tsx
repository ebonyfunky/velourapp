import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  /** 0-1 fraction through the current step (e.g. sub-screens within Step 2) */
  subProgress?: number;
}

export default function ProgressBar({ currentStep, totalSteps, subProgress = 0 }: ProgressBarProps) {
  const progressPercent = ((currentStep - 1 + subProgress) / totalSteps) * 100;

  return (
    <div className="fixed left-[240px] right-0 top-0 z-30 h-[3px]" style={{ background: 'rgba(212,169,60,0.12)' }}>
      <motion.div
        className="h-full rounded-r-sm"
        style={{
          background: '#D4A93C',
          boxShadow: '0 0 12px rgba(212, 169, 60, 0.35)',
        }}
        initial={false}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-medium"
        style={{ color: 'rgba(212, 169, 60, 0.75)' }}
      >
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
