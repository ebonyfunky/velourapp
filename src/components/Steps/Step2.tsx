import { useCampaignStore } from '../../store/campaignStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({ onNext, onBack }: Step2Props) {
  const {
    avatarRealPerson,
    avatarCurrently,
    avatarFeels,
    avatarFrustratedBy,
    avatarAlreadyTried,
    avatarBiggestFear,
    avatarSecretHope,
    avatarVoice,
    guidedFeeling,
    guidedWish,
    guidedBarrier,
    avatarFeelBlank,
    avatarWantBlank,
    avatarTiredOfBlank,
    setField,
  } = useCampaignStore();

  const [showStatementBuilt, setShowStatementBuilt] = useState(false);
  const [showExampleApplied, setShowExampleApplied] = useState(false);

  const handleBuildStatement = () => {
    setField('avatarFeelBlank', guidedFeeling);
    setField('avatarWantBlank', guidedWish);
    setField('avatarTiredOfBlank', guidedBarrier);
    setShowStatementBuilt(true);
    setTimeout(() => setShowStatementBuilt(false), 4000);
    setTimeout(() => {
      document.getElementById('sentence-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleExampleClick = (feel: string, want: string, barrier: string) => {
    setField('avatarFeelBlank', feel);
    setField('avatarWantBlank', want);
    setField('avatarTiredOfBlank', barrier);
    setShowExampleApplied(true);
    setTimeout(() => setShowExampleApplied(false), 4000);
    setTimeout(() => {
      document.getElementById('sentence-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const canProceed = avatarRealPerson && avatarFeels && avatarBiggestFear && avatarFeelBlank && avatarWantBlank && avatarTiredOfBlank;

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '42px',
          fontWeight: 600,
          color: '#f0ebff',
          marginBottom: '12px',
        }}
      >
        Audience Avatar
      </h1>
      <p
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#c9a84c',
          marginBottom: '32px',
        }}
      >
        Your content speaks to ONE person — not everyone. Define them here and every Velour script will speak directly to their soul.
      </p>

      <div className="space-y-6">
        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '6px',
              display: 'block',
            }}
          >
            WHO WERE YOU BEFORE YOU FIGURED THIS OUT?
          </label>
          <p className="text-[11px] text-text-dim mb-3">
            Your avatar is one real person — a past version of you, or someone you deeply understand. Not a group. One specific person.
          </p>
          <textarea
            value={avatarRealPerson}
            onChange={(e) => setField('avatarRealPerson', e.target.value)}
            placeholder="e.g. Me when I was exhausted from my 9-5 and tried every online course but still couldn't make it work..."
            rows={3}
            style={{
              background: '#17152e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '12px',
              padding: '14px 16px',
              color: '#f0ebff',
              fontSize: '13px',
              width: '100%',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#c9a84c';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <div
            style={{
              background: 'rgba(201,168,76,0.06)',
              borderLeft: '3px solid #c9a84c',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
              fontSize: '11px',
              color: '#9b8fb5',
              fontStyle: 'italic',
              marginTop: '8px',
            }}
          >
            The more specific you are, the more your content makes people say "this is literally me"
          </div>
        </div>

        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '6px',
              display: 'block',
            }}
          >
            DEFINE THEIR INNER WORLD
          </label>
          <p className="text-[11px] text-text-dim mb-4">Emotions only — not age, gender or location</p>

          <div className="space-y-3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                They are currently...
              </div>
              <input
                type="text"
                value={avatarCurrently}
                onChange={(e) => setField('avatarCurrently', e.target.value)}
                placeholder="e.g. working a job they hate while secretly trying to build something online at night"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                They feel...
              </div>
              <input
                type="text"
                value={avatarFeels}
                onChange={(e) => setField('avatarFeels', e.target.value)}
                placeholder="e.g. confused, exhausted, scared of failing one more time"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                They are frustrated by...
              </div>
              <input
                type="text"
                value={avatarFrustratedBy}
                onChange={(e) => setField('avatarFrustratedBy', e.target.value)}
                placeholder="e.g. buying courses that teach theory but never show them exactly what to do"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                They've already tried...
              </div>
              <input
                type="text"
                value={avatarAlreadyTried}
                onChange={(e) => setField('avatarAlreadyTried', e.target.value)}
                placeholder="e.g. YouTube tutorials, free challenges, 2 or 3 paid courses"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                Their biggest fear is...
              </div>
              <input
                type="text"
                value={avatarBiggestFear}
                onChange={(e) => setField('avatarBiggestFear', e.target.value)}
                placeholder="e.g. what if this doesn't work either and I've wasted more money and time"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, minWidth: '180px', flexShrink: 0 }}>
                What they secretly hope...
              </div>
              <input
                type="text"
                value={avatarSecretHope}
                onChange={(e) => setField('avatarSecretHope', e.target.value)}
                placeholder="e.g. that this time it finally makes sense and actually works"
                style={{
                  background: '#17152e',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '6px',
              display: 'block',
            }}
          >
            GIVE YOUR AVATAR A VOICE
          </label>
          <p className="text-[11px] text-text-dim mb-3">
            Write one sentence your ideal person would say out loud — emotional and natural, not salesy
          </p>
          <textarea
            value={avatarVoice}
            onChange={(e) => setField('avatarVoice', e.target.value)}
            placeholder="e.g. I don't want hype. I just want something that actually works because I'm running out of time and patience to keep trying things that don't deliver."
            rows={2}
            style={{
              background: '#17152e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '12px',
              padding: '14px 16px',
              color: '#f0ebff',
              fontSize: '13px',
              width: '100%',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#c9a84c';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.08em',
              marginBottom: '6px',
              display: 'block',
            }}
          >
            YOUR ONE-SENTENCE AUDIENCE STATEMENT
          </label>
          <p className="text-[11px] text-text-dim mb-4">
            This becomes your content filter forever. Every post you create must pass this statement. Print it. Pin it. Live by it.
          </p>

          <div
            style={{
              background: 'rgba(124,58,237,0.06)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f0ebff', marginBottom: '16px' }}>
              Answer these 3 questions first
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gold-light block mb-1">
                  01 — How do they feel RIGHT NOW?
                </label>
                <p className="text-[10px] text-text-dim mb-2">
                  Not what they think. How do they FEEL when they wake up in the morning before they check their phone.
                </p>
                <textarea
                  value={guidedFeeling}
                  onChange={(e) => setField('guidedFeeling', e.target.value)}
                  placeholder="e.g. exhausted, invisible, like everyone else is moving forward and they are stuck"
                  rows={2}
                  style={{
                    background: '#17152e',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    width: '100%',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gold-light block mb-1">
                  02 — What do they secretly wish for?
                </label>
                <p className="text-[10px] text-text-dim mb-2">
                  The thing they dream about at 2am that they have never said out loud to anyone.
                </p>
                <textarea
                  value={guidedWish}
                  onChange={(e) => setField('guidedWish', e.target.value)}
                  placeholder="e.g. to quit their job and never ask permission for a day off again"
                  rows={2}
                  style={{
                    background: '#17152e',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    width: '100%',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gold-light block mb-1">
                  03 — What keeps stopping them?
                </label>
                <p className="text-[10px] text-text-dim mb-2">
                  They have tried before. What always gets in the way? Be honest — this is what your content will solve.
                </p>
                <textarea
                  value={guidedBarrier}
                  onChange={(e) => setField('guidedBarrier', e.target.value)}
                  placeholder="e.g. every time they get started something feels too complicated or too expensive and they give up again"
                  rows={2}
                  style={{
                    background: '#17152e',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    width: '100%',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleBuildStatement}
              disabled={!guidedFeeling || !guidedWish || !guidedBarrier}
              style={{
                background: guidedFeeling && guidedWish && guidedBarrier
                  ? 'linear-gradient(135deg, #c9a84c, #8B6914)'
                  : 'rgba(201,168,76,0.2)',
                color: guidedFeeling && guidedWish && guidedBarrier ? '#0a0610' : '#9b8fb5',
                borderRadius: '100px',
                padding: '12px 24px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: guidedFeeling && guidedWish && guidedBarrier ? 'pointer' : 'not-allowed',
                border: 'none',
                marginTop: '16px',
                width: '100%',
              }}
            >
              Build My Statement
            </button>
          </div>

          <AnimatePresence>
            {showStatementBuilt && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-3"
                style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}
              >
                Your statement has been built — refine it below until it feels exactly right
              </motion.div>
            )}
          </AnimatePresence>

          <div
            id="sentence-card"
            style={{
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '12px',
              padding: '24px',
              fontSize: '14px',
              color: '#f0ebff',
              lineHeight: '3.0',
              marginTop: '16px',
            }}
          >
            I speak to people who wake up every day feeling{' '}
            <input
              type="text"
              value={avatarFeelBlank}
              onChange={(e) => setField('avatarFeelBlank', e.target.value)}
              placeholder="trapped and overlooked"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #c9a84c',
                borderRadius: '0',
                padding: '4px 10px',
                color: '#e8c96a',
                fontSize: '14px',
                fontWeight: 600,
                fontStyle: 'italic',
                minWidth: '220px',
                outline: 'none',
                display: 'inline-block',
                margin: '0 6px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#f0ebff';
                e.currentTarget.style.color = '#f0ebff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = '#c9a84c';
                e.currentTarget.style.color = '#e8c96a';
              }}
            />
            secretly wishing they could{' '}
            <input
              type="text"
              value={avatarWantBlank}
              onChange={(e) => setField('avatarWantBlank', e.target.value)}
              placeholder="replace their salary from their phone"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #c9a84c',
                borderRadius: '0',
                padding: '4px 10px',
                color: '#e8c96a',
                fontSize: '14px',
                fontWeight: 600,
                fontStyle: 'italic',
                minWidth: '220px',
                outline: 'none',
                display: 'inline-block',
                margin: '0 6px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#f0ebff';
                e.currentTarget.style.color = '#f0ebff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = '#c9a84c';
                e.currentTarget.style.color = '#e8c96a';
              }}
            />
            but every time they try,{' '}
            <input
              type="text"
              value={avatarTiredOfBlank}
              onChange={(e) => setField('avatarTiredOfBlank', e.target.value)}
              placeholder="the courses are too complicated and nothing sticks"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #c9a84c',
                borderRadius: '0',
                padding: '4px 10px',
                color: '#e8c96a',
                fontSize: '14px',
                fontWeight: 600,
                fontStyle: 'italic',
                minWidth: '220px',
                outline: 'none',
                display: 'inline-block',
                margin: '0 6px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#f0ebff';
                e.currentTarget.style.color = '#f0ebff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = '#c9a84c';
                e.currentTarget.style.color = '#e8c96a';
              }}
            />
            .
          </div>

          <div style={{ marginTop: '20px' }}>
            <label
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#e8c96a',
                letterSpacing: '0.1em',
                marginBottom: '10px',
                display: 'block',
              }}
            >
              Or choose an example from your niche and edit it to make it yours
            </label>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleExampleClick(
                    'stuck in a job that pays the bills but steals their soul',
                    'build something of their own and finally feel proud of how they earn money',
                    'getting overwhelmed by all the options and talking themselves out of starting'
                  )
                }
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#7c3aed', marginBottom: '6px', letterSpacing: '0.1em' }}>
                  9-5 PROFESSIONAL
                </div>
                <p style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.6' }}>
                  I speak to people who wake up every day feeling stuck in a job that pays the bills but steals their soul, secretly wishing they could build something of their own and finally feel proud of how they earn money, but every time they try, they get overwhelmed by all the options and talk themselves out of starting.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleClick(
                    'like they give everything to everyone else and nothing is left for themselves',
                    'earn real money from home without missing a single school run or bedtime',
                    'courses that assume they have 4 hours a day and a tech degree'
                  )
                }
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#c9a84c', marginBottom: '6px', letterSpacing: '0.1em' }}>
                  BUSY MUM
                </div>
                <p style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.6' }}>
                  I speak to people who wake up every day feeling like they give everything to everyone else and nothing is left for themselves, secretly wishing they could earn real money from home without missing a single school run or bedtime story, but every time they try, the courses assume they have 4 hours a day free and a tech degree.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleClick(
                    'like they are one viral video away from changing their life but freeze the moment they press record',
                    'turn their phone into a real paycheck without feeling fake or salesy',
                    'their videos flopping and wondering if this was ever meant for them'
                  )
                }
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#2e8b57', marginBottom: '6px', letterSpacing: '0.1em' }}>
                  TIKTOK & AFFILIATE
                </div>
                <p style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.6' }}>
                  I speak to people who wake up every day feeling like they are one viral video away from changing their life but freeze the moment they press record, secretly wishing they could turn their phone into a real paycheck without feeling fake or salesy, but every time they try, their videos flop and they start wondering if this is even meant for them.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleClick(
                    'embarrassed to tell people what they do because they have heard pyramid scheme one too many times',
                    'build a team that actually grows without begging friends and family or sliding into strangers DMs',
                    'trying to build online and nobody taking them seriously'
                  )
                }
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#e8c96a', marginBottom: '6px', letterSpacing: '0.1em' }}>
                  NETWORK MARKETING
                </div>
                <p style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.6' }}>
                  I speak to people who wake up every day feeling embarrassed to tell people what they do because they have heard the words pyramid scheme one too many times, secretly wishing they could build a team that actually grows without begging friends and family or sliding into strangers DMs, but every time they try to build online nobody takes them seriously.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleClick(
                    'like they are sitting on knowledge that could change lives but have no idea how to get paid for it',
                    'sell a digital product while they sleep',
                    'getting stuck on the tech and never actually launching'
                  )
                }
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#a78bfa', marginBottom: '6px', letterSpacing: '0.1em' }}>
                  COACH & COURSE CREATOR
                </div>
                <p style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.6' }}>
                  I speak to people who wake up every day feeling like they are sitting on knowledge and experience that could genuinely change someone's life but have no idea how to package it and get paid for it, secretly wishing they could sell a digital product while they sleep, but every time they try they get stuck on the tech and never actually launch.
                </p>
              </button>
            </div>

            <AnimatePresence>
              {showExampleApplied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-2"
                  style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}
                >
                  Example applied — now edit the fields above to make it completely yours
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#e8c96a',
                letterSpacing: '0.1em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              YOUR STATEMENT
            </label>
            <div
              style={{
                background: '#17152e',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '10px',
                padding: '16px',
                fontSize: '13px',
                color: '#f0ebff',
                fontStyle: 'italic',
                lineHeight: '1.8',
                minHeight: '60px',
              }}
            >
              I speak to people who wake up every day feeling{' '}
              <span style={{ color: avatarFeelBlank ? '#e8c96a' : '#4a3f66' }}>
                {avatarFeelBlank || '...'}
              </span>
              , secretly wishing they could{' '}
              <span style={{ color: avatarWantBlank ? '#e8c96a' : '#4a3f66' }}>
                {avatarWantBlank || '...'}
              </span>
              , but every time they try,{' '}
              <span style={{ color: avatarTiredOfBlank ? '#e8c96a' : '#4a3f66' }}>
                {avatarTiredOfBlank || '...'}
              </span>
              .
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              color: '#7c3aed',
              fontSize: '40px',
              lineHeight: '1',
            }}
          >
            "
          </div>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#f0ebff',
              fontStyle: 'italic',
              marginTop: '4px',
            }}
          >
            Would THIS version of me stop scrolling for this content?
          </p>
          <p
            style={{
              fontSize: '11px',
              color: '#9b8fb5',
              marginTop: '8px',
            }}
          >
            Before you post anything — ask this. If the answer is no, go back and rewrite it.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px' }}>
            <button
              type="button"
              style={{
                background: 'rgba(46,139,87,0.15)',
                border: '1px solid #2e8b57',
                color: '#4ade80',
                borderRadius: '100px',
                padding: '10px 24px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'default',
              }}
            >
              Yes — post it
            </button>
            <button
              type="button"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171',
                borderRadius: '100px',
                padding: '10px 24px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'default',
              }}
            >
              No — rewrite it
            </button>
          </div>
        </div>

        {avatarFeelBlank && avatarWantBlank && avatarTiredOfBlank && (
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
              }}
            >
              Your Avatar is Complete
            </h3>
            <p
              style={{
                color: '#e8c96a',
                fontSize: '13px',
                fontStyle: 'italic',
                fontWeight: 600,
                marginTop: '10px',
                lineHeight: '1.8',
              }}
            >
              "I speak to people who wake up every day feeling {avatarFeelBlank}, secretly wishing they could {avatarWantBlank}, but every time they try, {avatarTiredOfBlank}."
            </p>
            <p
              style={{
                color: '#9b8fb5',
                fontSize: '11px',
                marginTop: '8px',
              }}
            >
              Every Velour script, every Live show, and every day of your 30-day content calendar will now be written specifically for this person — their language, their fears, their secret hope.
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
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← Back
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
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
