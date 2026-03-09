import { ChevronDown } from 'lucide-react';
import { WizardState, AspectRatio } from '../types';

interface Step3Props {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const aspectRatios: AspectRatio[] = ['9:16', '16:9', '1:1'];
const cameraStyles = ['Cinematic', 'Documentary', 'Vlog Style', 'Fashion Editorial', 'Product Focus'];
const hairstyles = ['Natural Waves', 'Sleek Straight', 'Curly', 'Updo', 'Ponytail', 'Short & Chic'];
const makeupStyles = ['Natural', 'Glamorous', 'Bold', 'Minimal', 'Editorial', 'Fresh & Dewy'];
const outfits = ['Casual Chic', 'Business Professional', 'Athleisure', 'Evening Wear', 'Street Style'];
const nailStyles = ['Natural', 'French Manicure', 'Bold Color', 'Nude', 'Artistic', 'Minimalist'];

const skinTones = [
  { name: 'Fair', color: '#F5D7C3' },
  { name: 'Light', color: '#E8B896' },
  { name: 'Medium', color: '#C58F65' },
  { name: 'Tan', color: '#A67447' },
  { name: 'Deep', color: '#7B5135' },
  { name: 'Dark', color: '#4A2F1F' },
];

export default function Step3({ state, onChange, onNext, onBack }: Step3Props) {
  const canProceed = state.aspectRatio && state.cameraStyle && state.marketingGoal.length > 0;
  const charCount = state.marketingGoal.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Style & Aesthetics
        </h2>
        <p className="text-text-muted text-sm">Define the visual style and creative direction</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-text-muted mb-3">Aspect Ratio</label>
          <div className="flex gap-3">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => onChange({ aspectRatio: ratio })}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  state.aspectRatio === ratio
                    ? 'bg-gradient-to-br from-purple to-green text-text-primary'
                    : 'glass-card text-text-muted hover:text-text-primary hover:border-gold'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-text-muted mb-2">Camera Style</label>
          <div className="relative">
            <select
              value={state.cameraStyle}
              onChange={(e) => onChange({ cameraStyle: e.target.value })}
              className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select camera style</option>
              {cameraStyles.map((style) => (
                <option key={style} value={style} className="bg-bg-card text-text-primary">
                  {style}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm text-text-muted mb-2">Hairstyle</label>
            <div className="relative">
              <select
                value={state.hairstyle}
                onChange={(e) => onChange({ hairstyle: e.target.value })}
                className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select style</option>
                {hairstyles.map((style) => (
                  <option key={style} value={style} className="bg-bg-card text-text-primary">
                    {style}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-text-muted mb-2">Makeup</label>
            <div className="relative">
              <select
                value={state.makeup}
                onChange={(e) => onChange({ makeup: e.target.value })}
                className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select style</option>
                {makeupStyles.map((style) => (
                  <option key={style} value={style} className="bg-bg-card text-text-primary">
                    {style}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm text-text-muted mb-2">Outfit</label>
            <div className="relative">
              <select
                value={state.outfit}
                onChange={(e) => onChange({ outfit: e.target.value })}
                className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select style</option>
                {outfits.map((style) => (
                  <option key={style} value={style} className="bg-bg-card text-text-primary">
                    {style}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-text-muted mb-2">Nails</label>
            <div className="relative">
              <select
                value={state.nails}
                onChange={(e) => onChange({ nails: e.target.value })}
                className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select style</option>
                {nailStyles.map((style) => (
                  <option key={style} value={style} className="bg-bg-card text-text-primary">
                    {style}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-text-muted mb-2">Skin Tone</label>
          <div className="flex gap-3">
            {skinTones.map((tone) => (
              <button
                key={tone.color}
                onClick={() => onChange({ skinTone: tone.color })}
                className={`w-12 h-12 rounded-full transition-all duration-300 ${
                  state.skinTone === tone.color
                    ? 'ring-4 ring-gold ring-offset-4 ring-offset-bg-main scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: tone.color }}
                title={tone.name}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-text-muted mb-2">
            Marketing Goal <span className="text-gold">*</span>
          </label>
          <textarea
            value={state.marketingGoal}
            onChange={(e) => onChange({ marketingGoal: e.target.value })}
            className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all resize-none h-24"
            placeholder="Describe what you want to achieve with this campaign..."
            maxLength={500}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-text-muted">{charCount}/500</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-text-primary font-medium">Add Custom Script</label>
            <button
              onClick={() => onChange({ scriptEnabled: !state.scriptEnabled })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                state.scriptEnabled ? 'bg-green' : 'bg-text-dim/30'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-text-primary rounded-full transition-transform duration-300 ${
                  state.scriptEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {state.scriptEnabled && (
            <textarea
              value={state.script}
              onChange={(e) => onChange({ script: e.target.value })}
              className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all resize-none h-32"
              placeholder="Enter your custom script or dialogue..."
            />
          )}
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
          onClick={onNext}
          disabled={!canProceed}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
            canProceed
              ? 'cta-gradient text-text-primary hover:scale-[1.02]'
              : 'bg-text-dim/30 text-text-muted cursor-not-allowed'
          }`}
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
