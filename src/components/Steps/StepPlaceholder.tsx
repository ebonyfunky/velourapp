import { motion } from 'framer-motion';

interface StepPlaceholderProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPlaceholder({ stepNumber, title, subtitle, onNext, onBack }: StepPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="gradient-text mb-2">{title}</h1>
        <p className="text-gold text-[14px] font-semibold">{subtitle}</p>
      </div>

      <div className="velour-card p-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-gold">{stepNumber}</span>
          </div>
          <h3 className="text-xl text-text-primary">Step {stepNumber} Coming Soon</h3>
          <p className="text-text-body text-[13px] font-medium leading-relaxed">
            This step includes advanced features for {title.toLowerCase()}. The complete implementation includes
            interactive controls, real-time previews, and AI-powered generation.
          </p>
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Demo Mode
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 px-6 rounded-xl bg-card-bg border border-gold/20 text-text-primary font-semibold hover:border-gold/50 transition-all">
          Back
        </button>
        <button onClick={onNext} className="btn-primary flex-1">
          Continue
        </button>
      </div>
    </motion.div>
  );
}
