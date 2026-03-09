import { Check, Shield, Sparkles } from 'lucide-react';
import { WizardState } from '../types';

interface Step4Props {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export default function Step4({ state, onChange, onGenerate, onBack }: Step4Props) {
  const canGenerate = state.termsAccepted;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Review & Launch
        </h2>
        <p className="text-text-muted text-sm">Confirm your campaign details before generating</p>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="font-semibold text-text-primary">Campaign Summary</h3>
        </div>

        <div className="space-y-3">
          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Campaign Name</p>
            <p className="text-text-primary font-medium">{state.campaignName}</p>
          </div>

          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Brand</p>
            <p className="text-text-primary font-medium">{state.brandName}</p>
          </div>

          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Mode</p>
            <p className="text-text-primary font-medium capitalize">{state.campaignMode}</p>
          </div>

          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Objective</p>
            <p className="text-text-primary font-medium">{state.campaignObjective}</p>
          </div>

          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Assets</p>
            <div className="space-y-1">
              {state.characterReference && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green" />
                  <p className="text-text-primary text-sm">Character Reference</p>
                </div>
              )}
              {state.environment && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green" />
                  <p className="text-text-primary text-sm">Environment</p>
                </div>
              )}
              {state.productReference && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green" />
                  <p className="text-text-primary text-sm">Product Reference</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-b border-gold/10 pb-3">
            <p className="text-xs text-text-muted mb-1">Visual Style</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="text-text-muted">Aspect:</span>
                <span className="text-text-primary ml-2">{state.aspectRatio}</span>
              </div>
              {state.cameraStyle && (
                <div className="text-sm">
                  <span className="text-text-muted">Camera:</span>
                  <span className="text-text-primary ml-2">{state.cameraStyle}</span>
                </div>
              )}
              {state.hairstyle && (
                <div className="text-sm">
                  <span className="text-text-muted">Hair:</span>
                  <span className="text-text-primary ml-2">{state.hairstyle}</span>
                </div>
              )}
              {state.makeup && (
                <div className="text-sm">
                  <span className="text-text-muted">Makeup:</span>
                  <span className="text-text-primary ml-2">{state.makeup}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-1">Marketing Goal</p>
            <p className="text-text-primary text-sm">{state.marketingGoal}</p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-purple" />
          <h3 className="font-semibold text-text-primary">Terms & Safety</h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-text-muted leading-relaxed">
            By proceeding, you confirm that you have the rights to use all uploaded images and that the generated
            content will comply with applicable laws and platform guidelines. Virtual influencer content will be
            generated using AI technology.
          </p>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={state.termsAccepted}
                onChange={(e) => onChange({ termsAccepted: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gold/30 rounded peer-checked:bg-green peer-checked:border-green transition-all duration-300 flex items-center justify-center">
                {state.termsAccepted && <Check className="w-3 h-3 text-text-primary" strokeWidth={3} />}
              </div>
            </div>
            <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
              I accept the terms of service and confirm I have rights to all uploaded content
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-lg font-semibold bg-text-dim/20 text-text-primary hover:bg-text-dim/30 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
            canGenerate
              ? 'cta-gradient text-text-primary hover:scale-[1.02]'
              : 'bg-text-dim/30 text-text-muted cursor-not-allowed'
          }`}
        >
          {canGenerate ? 'Generate Campaign' : 'Accept Terms to Continue'}
        </button>
      </div>
    </div>
  );
}
