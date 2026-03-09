import { Video, Users, ChevronDown } from 'lucide-react';
import { WizardState, CampaignMode } from '../types';

interface Step1Props {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
}

const objectives = [
  'Brand Awareness',
  'Product Launch',
  'Engagement Campaign',
  'Educational Content',
  'Lifestyle Showcase',
  'Tutorial Series',
];

export default function Step1({ state, onChange, onNext }: Step1Props) {
  const canProceed = state.campaignName && state.brandName && state.campaignMode && state.campaignObjective;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Campaign Identity
        </h2>
        <p className="text-text-muted text-sm">Define the foundation of your influencer campaign</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <input
            type="text"
            value={state.campaignName}
            onChange={(e) => onChange({ campaignName: e.target.value })}
            className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 pt-6 pb-2 text-text-primary placeholder-transparent focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all peer"
            placeholder="Campaign Name"
            id="campaignName"
          />
          <label
            htmlFor="campaignName"
            className="absolute left-4 top-2 text-xs text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold"
          >
            Campaign Name
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            value={state.brandName}
            onChange={(e) => onChange({ brandName: e.target.value })}
            className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 pt-6 pb-2 text-text-primary placeholder-transparent focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all peer"
            placeholder="Brand Name"
            id="brandName"
          />
          <label
            htmlFor="brandName"
            className="absolute left-4 top-2 text-xs text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold"
          >
            Brand Name
          </label>
        </div>

        <div>
          <label className="block text-sm text-text-muted mb-3">Campaign Mode</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onChange({ campaignMode: 'vlog' })}
              className={`glass-card p-6 rounded-xl text-left transition-all duration-300 hover:border-gold group ${
                state.campaignMode === 'vlog' ? 'border-gold bg-green/10 shadow-[0_0_20px_rgba(201,168,76,0.2)]' : ''
              }`}
            >
              <Video className={`w-8 h-8 mb-3 transition-colors ${state.campaignMode === 'vlog' ? 'text-gold' : 'text-text-muted group-hover:text-gold'}`} />
              <h3 className="font-semibold text-text-primary mb-1">Vlog Mode</h3>
              <p className="text-xs text-text-muted">Personal storytelling and lifestyle content</p>
            </button>

            <button
              onClick={() => onChange({ campaignMode: 'ugc' })}
              className={`glass-card p-6 rounded-xl text-left transition-all duration-300 hover:border-gold group ${
                state.campaignMode === 'ugc' ? 'border-gold bg-green/10 shadow-[0_0_20px_rgba(201,168,76,0.2)]' : ''
              }`}
            >
              <Users className={`w-8 h-8 mb-3 transition-colors ${state.campaignMode === 'ugc' ? 'text-gold' : 'text-text-muted group-hover:text-gold'}`} />
              <h3 className="font-semibold text-text-primary mb-1">UGC / Influencer</h3>
              <p className="text-xs text-text-muted">Product reviews and authentic testimonials</p>
            </button>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-text-muted mb-3">Campaign Objective</label>
          <div className="relative">
            <select
              value={state.campaignObjective}
              onChange={(e) => onChange({ campaignObjective: e.target.value })}
              className="w-full bg-bg-card border border-gold/20 rounded-lg px-4 py-3 pr-10 text-text-primary focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(201,168,76,0.10)] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select an objective</option>
              {objectives.map((obj) => (
                <option key={obj} value={obj} className="bg-bg-card text-text-primary">
                  {obj}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          canProceed
            ? 'cta-gradient text-text-primary hover:scale-[1.02]'
            : 'bg-text-dim/30 text-text-muted cursor-not-allowed'
        }`}
      >
        Continue to Character & Assets
      </button>
    </div>
  );
}
