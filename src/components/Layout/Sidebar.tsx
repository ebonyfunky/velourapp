import { Check, ArrowLeft } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import { useState } from 'react';
import ResetModal from '../ResetModal';

interface SidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

const steps = [
  { number: 1, title: 'Who Are You?', subtitle: 'Profession, identity & how you show up' },
  { number: 2, title: 'Audience Avatar', subtitle: 'Who you're really talking to' },
  { number: 3, title: 'Content Project', subtitle: 'What you're building' },
  { number: 4, title: 'AI Twin Studio', subtitle: 'Vibe & persona' },
  { number: 5, title: 'Product & Offer', subtitle: 'What you are selling' },
  { number: 6, title: 'Campaign Pack', subtitle: 'Your empire' },
];

export default function Sidebar({ currentStep, onStepClick, completedSteps }: SidebarProps) {
  const { resetMode, reset } = useCampaignStore();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleBackToHome = () => {
    resetMode();
  };

  const handleGlobalReset = () => {
    reset();
    window.location.href = '/';
  };

  return (
    <div
      className="w-[240px] flex flex-col z-20 relative"
      style={{
        background: '#0d0b1a',
        borderRight: '1px solid rgba(201,168,76,0.15)',
        alignSelf: 'stretch',
        minHeight: '100%',
        height: 'auto',
      }}
    >
      <div
        className="absolute right-0 top-0 pointer-events-none"
        style={{
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.4) 30%, rgba(46,139,87,0.3) 70%, transparent 100%)',
        }}
      />

      <div className="relative z-10" style={{ background: '#0a0814', padding: '24px 20px 20px 20px', width: '100%' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" width="220" height="68" style={{ filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.3))' }}>
          <defs>
            <linearGradient id="vL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d060"/>
              <stop offset="40%" stopColor="#c9a84c"/>
              <stop offset="100%" stopColor="#7a5c1a"/>
            </linearGradient>
            <linearGradient id="vR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8c96a"/>
              <stop offset="50%" stopColor="#a07828"/>
              <stop offset="100%" stopColor="#c9a84c"/>
            </linearGradient>
            <linearGradient id="cG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d060"/>
              <stop offset="100%" stopColor="#8B6914"/>
            </linearGradient>
            <linearGradient id="wG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0d060"/>
              <stop offset="40%" stopColor="#c9a84c"/>
              <stop offset="70%" stopColor="#a07828"/>
              <stop offset="100%" stopColor="#c9a84c"/>
            </linearGradient>
          </defs>
          <g transform="translate(48, 18) scale(1.0)">
            <path d="M18 22 L55 112 L70 87 L42 22 Z" fill="url(#vL)"/>
            <path d="M122 22 L85 112 L70 87 L98 22 Z" fill="url(#vR)"/>
            <rect x="46" y="12" width="48" height="6" rx="2" fill="url(#cG)"/>
            <path d="M46 18 L46 5 L58 12 L70 3 L82 12 L94 5 L94 18 Z" fill="url(#cG)"/>
            <circle cx="46" cy="5" r="2.5" fill="#f0d060"/>
            <circle cx="70" cy="3" r="3.5" fill="#f0d060"/>
            <circle cx="94" cy="5" r="2.5" fill="#f0d060"/>
          </g>
          <text x="185" y="135" fontFamily="Georgia, serif"
            fontSize="76" fontWeight="bold"
            letterSpacing="12" fill="url(#wG)">VELOUR</text>
        </svg>
        <button
          onClick={handleBackToHome}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9b8fb5',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 0',
            marginTop: '12px',
            transition: 'color 0.2s',
            marginLeft: '0',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#e8c96a')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#9b8fb5')}
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </div>

      <div style={{
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, #c9a84c 20%, #e8c96a 50%, #c9a84c 80%, transparent 100%)',
        boxShadow: '0 0 12px rgba(201,168,76,0.8), 0 0 24px rgba(201,168,76,0.4)',
        flexShrink: 0,
        margin: '0'
      }} />

      <div className="flex-1 relative z-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0px', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isClickable = isCompleted || step.number < currentStep;

          return (
            <div key={step.number}>
              <button
                onClick={() => isClickable && onStepClick(step.number)}
                disabled={!isClickable && !isCurrent}
                className={`w-full flex items-start gap-3 text-left transition-all duration-200 relative group ${
                  isClickable || isCurrent ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                style={{
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  paddingLeft: isCurrent ? '12px' : '12px',
                  paddingRight: isCurrent ? '12px' : '0',
                  opacity: !isClickable && !isCurrent ? 0.5 : 1,
                  background: isCurrent ? 'rgba(201,168,76,0.06)' : 'transparent',
                  borderRadius: isCurrent ? '8px' : '0',
                  borderLeft: isCurrent ? 'none' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderLeft = '2px solid rgba(201,168,76,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderLeft = '2px solid transparent';
                  }
                }}
              >
                {isCurrent && (
                  <div
                    className="absolute left-0 top-0 bottom-0"
                    style={{
                      width: '3px',
                      background: 'linear-gradient(to bottom, #c9a84c, #2e8b57)',
                      borderRadius: '0 2px 2px 0',
                      left: '-24px',
                    }}
                  />
                )}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={
                    isCurrent
                      ? {
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                          color: '#0d0b1a',
                          fontSize: '13px',
                          fontWeight: 800,
                          boxShadow: '0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.2)',
                        }
                      : isCompleted
                      ? {
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #1a5c35, #2e8b57)',
                          color: '#ffffff',
                          fontSize: '13px',
                          fontWeight: 800,
                          boxShadow: '0 0 12px rgba(46,139,87,0.4)',
                        }
                      : {
                          width: '32px',
                          height: '32px',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1.5px solid rgba(255,255,255,0.15)',
                          color: '#8a7a9a',
                          fontSize: '12px',
                          fontWeight: 600,
                        }
                  }
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <div className="flex-1 py-0.5">
                  <p
                    className="transition-colors duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: isCurrent ? '14px' : '13px',
                      fontWeight: isCurrent ? 700 : isCompleted ? 600 : 600,
                      color: isCurrent ? '#ffffff' : isCompleted ? '#d4cce8' : '#b8aed0',
                      textTransform: 'none',
                      lineHeight: '1.6',
                      overflow: 'visible',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="mt-0.5 transition-colors duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: isCurrent ? 600 : 500,
                      color: isCurrent ? '#c9a84c' : isCompleted ? '#2e8b57' : '#6a5f80',
                      textTransform: 'none',
                      lineHeight: '1.6',
                      overflow: 'visible',
                    }}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
        </div>

        <div>
          <div style={{
            width: '80%',
            height: '1px',
            margin: '0 auto 16px auto',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 50%, transparent 100%)'
          }} />

          <div
            className="w-full text-center pb-2 relative z-10"
            style={{
              background: '#0a0814',
              paddingTop: '0',
            }}
          >
            <button
              type="button"
              onClick={() => {
                const { setField } = useCampaignStore.getState();
                setField('creatorMode', 'ugc-creator');
              }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '10px',
                fontWeight: 700,
                color: '#6a5f80',
                cursor: 'pointer',
                textAlign: 'center',
                width: '100%',
                marginBottom: '12px',
              }}
            >
              Switch to UGC Hub
            </button>

            <div
              style={{
                display: 'block',
                textAlign: 'center',
                color: '#c9a84c',
                fontSize: '8px',
                marginBottom: '8px',
                opacity: 0.6,
                letterSpacing: '4px',
              }}
            >
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#c9a84c',
                textAlign: 'center',
                lineHeight: '1.8',
                textTransform: 'none',
                textShadow: '0 0 20px rgba(201,168,76,0.5), 0 0 40px rgba(201,168,76,0.2)',
                overflow: 'visible',
              }}
            >
              Where Creators Become Empires.
            </p>

            <button
              onClick={() => setShowResetModal(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6a5f80',
                fontSize: '10px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
                marginTop: '16px',
                textAlign: 'center',
                width: '100%',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#c9a84c')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#6a5f80')}
            >
              Reset / Start Fresh
            </button>
          </div>
        </div>
      </div>

      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleGlobalReset}
        type="global"
      />
    </div>
  );
}
