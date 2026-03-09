import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-[240px] right-0 h-[3px] bg-bg/50 backdrop-blur z-30">
      <motion.div
        className="h-full"
        style={{
          background: 'linear-gradient(90deg, #7c3aed 0%, #2e8b57 50%, #c9a84c 100%)',
        }}
        initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-text-muted font-medium">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
