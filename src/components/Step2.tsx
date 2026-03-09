import { Upload, ChevronDown, ChevronRight } from 'lucide-react';
import { WizardState } from '../types';
import { useState } from 'react';

interface Step2Props {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FileUploadProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

function FileUpload({ label, file, onChange, required }: FileUploadProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      onChange(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  return (
    <div>
      <label className="block text-sm text-text-muted mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="glass-card rounded-xl p-6 border-2 border-dashed border-gold/20 hover:border-gold/50 transition-all duration-300 cursor-pointer group"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id={label.replace(/\s/g, '')}
        />
        <label htmlFor={label.replace(/\s/g, '')} className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-text-muted group-hover:text-gold transition-colors mb-2" />
          {file ? (
            <div className="text-center">
              <p className="text-sm text-text-primary font-medium">{file.name}</p>
              <p className="text-xs text-text-muted mt-1">Click or drag to replace</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-text-muted">Drop image here or click to browse</p>
              <p className="text-xs text-text-dim mt-1">PNG, JPG up to 10MB</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

export default function Step2({ state, onChange, onNext, onBack }: Step2Props) {
  const [environmentExpanded, setEnvironmentExpanded] = useState(true);
  const canProceed = state.characterReference !== null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Character & Assets
        </h2>
        <p className="text-text-muted text-sm">Upload reference images for your virtual influencer</p>
      </div>

      <div className="space-y-5">
        <FileUpload
          label="Character Reference"
          file={state.characterReference}
          onChange={(file) => onChange({ characterReference: file })}
          required
        />

        <div className="flex items-center justify-between glass-card p-4 rounded-lg">
          <div className="flex-1">
            <label className="text-sm text-text-primary font-medium">Exact Face & Skin Tone Match</label>
            <p className="text-xs text-text-muted mt-1">Precisely replicate facial features and skin color</p>
          </div>
          <button
            onClick={() => onChange({ exactFaceSkinTone: !state.exactFaceSkinTone })}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              state.exactFaceSkinTone ? 'bg-green' : 'bg-text-dim/30'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-text-primary rounded-full transition-transform duration-300 ${
                state.exactFaceSkinTone ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <button
            onClick={() => setEnvironmentExpanded(!environmentExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-text-dim/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              {environmentExpanded ? (
                <ChevronDown className="w-5 h-5 text-gold" />
              ) : (
                <ChevronRight className="w-5 h-5 text-text-muted" />
              )}
              <span className="text-sm text-text-primary font-medium">Environment (Optional)</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange({ environmentEnabled: !state.environmentEnabled });
              }}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                state.environmentEnabled ? 'bg-green' : 'bg-text-dim/30'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-text-primary rounded-full transition-transform duration-300 ${
                  state.environmentEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </button>

          {environmentExpanded && state.environmentEnabled && (
            <div className="p-4 pt-0">
              <FileUpload
                label="Environment Background"
                file={state.environment}
                onChange={(file) => onChange({ environment: file })}
              />
            </div>
          )}
        </div>

        <FileUpload
          label="Product Reference"
          file={state.productReference}
          onChange={(file) => onChange({ productReference: file })}
        />
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
          Continue to Style
        </button>
      </div>
    </div>
  );
}
