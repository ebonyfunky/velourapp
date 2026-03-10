import { useCampaignStore } from '../../store/campaignStore';
import { motion } from 'framer-motion';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

const VIBE_OPTIONS = [
  { id: 'natural', label: 'Natural & Authentic', description: 'Soft lighting, conversational energy, approachable' },
  { id: 'bold', label: 'Bold & Confident', description: 'Strong presence, direct delivery, high energy' },
  { id: 'minimal', label: 'Minimal & Clean', description: 'Simple background, calm tone, refined aesthetic' },
  { id: 'luxury', label: 'Luxury & Premium', description: 'Polished look, elevated feel, sophisticated' },
  { id: 'casual', label: 'Casual & Relatable', description: 'Everyday setting, friendly vibe, real talk' },
  { id: 'power', label: 'Power & Authority', description: 'Professional backdrop, commanding presence, expert tone' },
];

const PERSONA_OPTIONS = [
  { id: 'teacher', label: 'The Teacher', description: 'Breaking down complex ideas into clear steps' },
  { id: 'friend', label: 'The Friend', description: 'Speaking like you are texting your best mate' },
  { id: 'coach', label: 'The Coach', description: 'Motivating, pushing, calling out excuses' },
  { id: 'rebel', label: 'The Rebel', description: "Challenging norms, saying what others won't" },
  { id: 'expert', label: 'The Expert', description: 'Data-driven, proven, credible authority' },
  { id: 'storyteller', label: 'The Storyteller', description: 'Sharing personal experiences and lessons learned' },
];

export default function Step3({ onNext, onBack }: Step3Props) {
  const { selectedVibe, selectedPersona, setField } = useCampaignStore();

  const canProceed = selectedVibe && selectedPersona;

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '42px',
          fontWeight: 600,
          color: '#f0ebff',
          marginBottom: '12px',
          lineHeight: '1.5',
          overflow: 'visible',
        }}
      >
        AI Twin Studio
      </h1>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#c9a84c',
          marginBottom: '32px',
          lineHeight: '1.6',
          overflow: 'visible',
        }}
      >
        Choose your vibe and persona — this shapes how your content looks and sounds across all scripts.
      </p>

      <div className="space-y-8">
        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '12px',
              display: 'block',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            SELECT YOUR VIBE
          </label>
          <p
            style={{
              fontSize: '11px',
              color: '#9b8fb5',
              marginBottom: '16px',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            This sets the visual direction for your filming — lighting, background, and overall aesthetic.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {VIBE_OPTIONS.map((vibe) => (
              <button
                key={vibe.id}
                type="button"
                onClick={() => setField('selectedVibe', vibe.id)}
                style={{
                  background: selectedVibe === vibe.id ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: selectedVibe === vibe.id ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (selectedVibe !== vibe.id) {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                    e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedVibe !== vibe.id) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                {selectedVibe === vibe.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0a0610',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: selectedVibe === vibe.id ? '#f0ebff' : '#d4cce8',
                    marginBottom: '6px',
                    lineHeight: '1.5',
                    overflow: 'visible',
                  }}
                >
                  {vibe.label}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#9b8fb5',
                    lineHeight: '1.6',
                    overflow: 'visible',
                  }}
                >
                  {vibe.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '12px',
              display: 'block',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            SELECT YOUR PERSONA
          </label>
          <p
            style={{
              fontSize: '11px',
              color: '#9b8fb5',
              marginBottom: '16px',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            This defines your tone and delivery style — how you communicate and connect with your audience.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {PERSONA_OPTIONS.map((persona) => (
              <button
                key={persona.id}
                type="button"
                onClick={() => setField('selectedPersona', persona.id)}
                style={{
                  background: selectedPersona === persona.id ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: selectedPersona === persona.id ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (selectedPersona !== persona.id) {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                    e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPersona !== persona.id) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                {selectedPersona === persona.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0a0610',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: selectedPersona === persona.id ? '#f0ebff' : '#d4cce8',
                    marginBottom: '6px',
                    lineHeight: '1.5',
                    overflow: 'visible',
                  }}
                >
                  {persona.label}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#9b8fb5',
                    lineHeight: '1.6',
                    overflow: 'visible',
                  }}
                >
                  {persona.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {selectedVibe && selectedPersona && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(46,139,87,0.08)',
              border: '1px solid rgba(46,139,87,0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '16px',
            }}
          >
            <div style={{ fontSize: '20px', color: '#4ade80', marginBottom: '4px' }} />
            <h3
              style={{
                color: '#4ade80',
                fontSize: '14px',
                fontWeight: 700,
                marginTop: '4px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6',
                overflow: 'visible',
              }}
            >
              Your Style is Locked In
            </h3>
            <p
              style={{
                color: '#9b8fb5',
                fontSize: '11px',
                marginTop: '8px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6',
                overflow: 'visible',
              }}
            >
              Every script will now include automatic filming directions based on your {VIBE_OPTIONS.find(v => v.id === selectedVibe)?.label.toLowerCase()} vibe and {PERSONA_OPTIONS.find(p => p.id === selectedPersona)?.label.toLowerCase()} persona.
            </p>
          </motion.div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '14px 28px',
            fontSize: '13px',
            fontWeight: 700,
            borderRadius: '100px',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'transparent',
            color: '#c9a84c',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6',
            overflow: 'visible',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            flex: 1,
            padding: '14px 28px',
            fontSize: '13px',
            fontWeight: 700,
            borderRadius: '100px',
            border: 'none',
            background: canProceed ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(201,168,76,0.2)',
            color: canProceed ? '#0a0610' : '#9b8fb5',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6',
            overflow: 'visible',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
