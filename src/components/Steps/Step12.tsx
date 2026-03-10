import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import {
  DollarSign,
  RefreshCw,
  TrendingUp,
  Shield,
  Calendar,
  Copy,
  Check,
  Target,
  Zap,
  Brain,
  Lightbulb,
  X,
  Plus,
  Trophy
} from 'lucide-react';

export default function Step12() {
  const [activeTab, setActiveTab] = useState<'income' | 'mindset'>('mindset');
  const {
    incomeRatePerVideo,
    incomeVideosPerDeal,
    incomeDealsPerMonth,
    dailyCheckboxes,
    lastCheckboxReset,
    wins,
    milestones,
    setField
  } = useCampaignStore();

  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [winInput, setWinInput] = useState('');

  const rateNum = parseFloat(incomeRatePerVideo) || 0;
  const videosNum = parseFloat(incomeVideosPerDeal) || 1;
  const dealsNum = parseFloat(incomeDealsPerMonth) || 0;

  const monthlyTarget = rateNum * videosNum * dealsNum;
  const dealsNeeded = dealsNum;
  const videosNeeded = videosNum * dealsNum;

  const getDynamicMessage = () => {
    if (monthlyTarget === 0) return '';
    if (monthlyTarget < 500) return 'Solid start. Focus on consistency first.';
    if (monthlyTarget < 1500) return 'Growth zone. One retainer replaces half these deals.';
    if (monthlyTarget < 3000) return 'Full time territory. Retainers and rate raises from here.';
    return 'Empire level. Build systems now.';
  };

  const copyTemplate = (template: string, id: string) => {
    navigator.clipboard.writeText(template);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const retainerTemplate = `Hi [Brand] — loved creating for you this month. I would love to propose a monthly retainer — [X videos] per month at $[rate]. Consistent content for you, locked availability for me. Open to discussing?`;

  const rateRaiseTemplate = `Hi [Brand] — my rates update from [date]. New rate: $[amount] per video. Happy to lock in your current rate for briefs confirmed before then.`;

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastCheckboxReset !== today) {
      setField('dailyCheckboxes', {
        creatorAction: false,
        sentPitch: false,
        brandEngagement: false,
        contentCreated: false,
        checkedNumbers: false,
      });
      setField('lastCheckboxReset', today);
    }
  }, [lastCheckboxReset, setField]);

  const toggleCheckbox = (key: keyof typeof dailyCheckboxes) => {
    setField('dailyCheckboxes', {
      ...dailyCheckboxes,
      [key]: !dailyCheckboxes[key]
    });
  };

  const addWin = () => {
    if (!winInput.trim()) return;
    const newWin = {
      id: Date.now().toString(),
      text: winInput,
      date: new Date().toLocaleDateString()
    };
    setField('wins', [newWin, ...wins]);
    setWinInput('');
  };

  const deleteWin = (id: string) => {
    setField('wins', wins.filter(w => w.id !== id));
  };

  const getMilestoneProgress = () => {
    const total = Object.keys(milestones).length;
    const completed = Object.values(milestones).filter(Boolean).length;
    return { completed, total };
  };

  const progress = getMilestoneProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: '100px' }}
    >
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px', lineHeight: 1.2 }}>
        Talent gets you started. Resilience keeps you going.
      </h1>
      <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '48px' }}>
        Read this page. Come back on the hard days.
      </p>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={() => setActiveTab('mindset')}
          style={{
            padding: '16px 32px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'mindset' ? '3px solid #c9a84c' : '3px solid transparent',
            color: activeTab === 'mindset' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          MINDSET
        </button>
        <button
          onClick={() => setActiveTab('income')}
          style={{
            padding: '16px 32px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'income' ? '3px solid #c9a84c' : '3px solid transparent',
            color: activeTab === 'income' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          SUSTAINABLE INCOME
        </button>
      </div>

      {activeTab === 'income' ? (
        <div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Section 1 - Monthly Income Calculator */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Target size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Do the math most creators never do.
                </h2>
              </div>

              <div style={{
                background: '#1c1a35',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '16px',
                padding: '32px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Rate per video $
                    </label>
                    <input
                      type="number"
                      value={incomeRatePerVideo}
                      onChange={(e) => setField('incomeRatePerVideo', e.target.value)}
                      placeholder="150"
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Videos per deal
                    </label>
                    <input
                      type="number"
                      value={incomeVideosPerDeal}
                      onChange={(e) => setField('incomeVideosPerDeal', e.target.value)}
                      placeholder="1"
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Deals per month
                    </label>
                    <input
                      type="number"
                      value={incomeDealsPerMonth}
                      onChange={(e) => setField('incomeDealsPerMonth', e.target.value)}
                      placeholder="10"
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                </div>

                {monthlyTarget > 0 && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.15))',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid rgba(201,168,76,0.3)'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '4px' }}>Monthly Target</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#c9a84c' }}>${monthlyTarget.toFixed(0)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '4px' }}>Deals Needed</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#c9a84c' }}>{dealsNeeded}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '4px' }}>Videos Needed</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#c9a84c' }}>{videosNeeded}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#d4cee8', margin: 0 }}>
                      {getDynamicMessage()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2 - Retainer Deals */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <RefreshCw size={28} style={{ color: '#c9a84c' }} />
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                    Stop chasing one-off deals forever.
                  </h2>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', margin: '4px 0 0 0' }}>
                    One retainer at $1,500/month replaces five one-off deals. Pitch this after your first successful delivery.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#1c1a35',
                border: '2px solid rgba(201,168,76,0.2)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Retainer Pitch Template
                    </div>
                  </div>
                  <button
                    onClick={() => copyTemplate(retainerTemplate, 'retainer')}
                    style={{
                      padding: '8px 16px',
                      background: copiedTemplate === 'retainer' ? 'rgba(34,197,94,0.2)' : 'rgba(201,168,76,0.2)',
                      border: copiedTemplate === 'retainer' ? '1px solid #22c55e' : '1px solid rgba(201,168,76,0.4)',
                      borderRadius: '100px',
                      color: copiedTemplate === 'retainer' ? '#22c55e' : '#c9a84c',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {copiedTemplate === 'retainer' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedTemplate === 'retainer' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.8, margin: 0 }}>
                  {retainerTemplate}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '16px', textTransform: 'uppercase' }}>
                  Simple Pricing Guide
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { videos: '2 videos/month', multiplier: 'your rate x 1.8' },
                    { videos: '4 videos/month', multiplier: 'your rate x 3.5' },
                    { videos: '8 videos/month', multiplier: 'your rate x 6.5' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f0ebff' }}>{item.videos}</span>
                      <span style={{ fontSize: '14px', color: '#c9a84c' }}> to </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#c9a84c' }}>{item.multiplier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3 - Stack Your Income */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <TrendingUp size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  The creators earning $5k+ are not doing more work. They earn from more places.
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { name: 'UGC Brand Deals', desc: 'your foundation', range: '$300-$3,000+/month' },
                  { name: 'TikTok Shop Affiliate', desc: 'create once earn repeatedly', range: '$100-$2,000+/month' },
                  { name: 'Usage Rights', desc: 'charge extra when brands run your content as ads', range: '+20-100% per video' },
                  { name: 'Content Licensing', desc: 'sell the same content to non-competing brands', range: '$50-$500 per license' },
                  { name: 'UGC Packages', desc: 'bundle videos and photos, higher value per transaction', range: '2-3x single rate' }
                ].map((stream, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#1c1a35',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '12px',
                      padding: '24px',
                    }}
                  >
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px' }}>
                      {stream.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '12px' }}>{stream.desc}</p>
                    <div style={{
                      padding: '8px 12px',
                      background: 'rgba(201,168,76,0.15)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#c9a84c'
                    }}>
                      {stream.range}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 - Raise Your Rates */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Zap size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  The creator who never raises rates works twice as hard for the same money.
                </h2>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '12px', textTransform: 'uppercase' }}>
                  When to raise
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[
                    'After 5 completed deals',
                    'Brands accept without negotiating',
                    'Every 90 days',
                    'Portfolio has 3+ strong examples'
                  ].map((trigger, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 20px',
                        background: 'rgba(201,168,76,0.15)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: '100px',
                        color: '#c9a84c',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Check size={14} />
                      {trigger}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#1c1a35',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px' }}>
                  How much
                </div>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#d4cee8', margin: 0 }}>
                  First raise: +25%. Then +20% every 90 days. Small raises beat one big jump every time.
                </p>
              </div>

              <div style={{
                background: '#1c1a35',
                border: '2px solid rgba(201,168,76,0.2)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Rate Raise Template
                    </div>
                  </div>
                  <button
                    onClick={() => copyTemplate(rateRaiseTemplate, 'rate-raise')}
                    style={{
                      padding: '8px 16px',
                      background: copiedTemplate === 'rate-raise' ? 'rgba(34,197,94,0.2)' : 'rgba(201,168,76,0.2)',
                      border: copiedTemplate === 'rate-raise' ? '1px solid #22c55e' : '1px solid rgba(201,168,76,0.4)',
                      borderRadius: '100px',
                      color: copiedTemplate === 'rate-raise' ? '#22c55e' : '#c9a84c',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {copiedTemplate === 'rate-raise' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedTemplate === 'rate-raise' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.8, margin: 0 }}>
                  {rateRaiseTemplate}
                </p>
              </div>
            </div>

            {/* Section 5 - Protect Your Income */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Shield size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Four rules. Break them once and you will never break them again.
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Always use a contract.', desc: 'Deliverables, payment date, revision limit, usage rights. Non-negotiable.' },
                  { title: '50% upfront from new brands.', desc: 'Any brand that refuses is a red flag.' },
                  { title: '14 day payment terms.', desc: 'State it in writing. Late payment fee included.' },
                  { title: 'Usage rights cost extra.', desc: 'Creating content and licensing it for ads are two different services.' }
                ].map((rule, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#1c1a35',
                      border: '2px solid rgba(201,168,76,0.3)',
                      borderRadius: '12px',
                      padding: '24px',
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#c9a84c', marginBottom: '12px' }}>
                      {rule.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6, margin: 0 }}>
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 - 90 Day Empire Plan */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Calendar size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Overestimate a week. Underestimate 90 days. This is your roadmap.
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {[
                  {
                    month: 'Month 1',
                    title: 'Foundation',
                    items: [
                      'Complete your Velour portfolio',
                      'Send 5 pitches per week',
                      'Land first 2-3 deals',
                      'Overdeliver on every brief'
                    ],
                    goal: '3 deals done'
                  },
                  {
                    month: 'Month 2',
                    title: 'Momentum',
                    items: [
                      'Raise rate 25% after deal 5',
                      'Pitch one brand for a retainer',
                      'Join 2 UGC platforms'
                    ],
                    goal: '$500-$1,500 earned'
                  },
                  {
                    month: 'Month 3',
                    title: 'Empire',
                    items: [
                      'Retainer locked in',
                      'Second income stream added',
                      'Rate raised again'
                    ],
                    goal: '$1,500-$3,000 month'
                  }
                ].map((plan, i) => (
                  <div
                    key={i}
                    style={{
                      background: i === 2 ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,105,20,0.2))' : '#1c1a35',
                      border: i === 2 ? '2px solid #c9a84c' : '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '16px',
                      padding: '28px',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#9b8fb5', marginBottom: '8px', textTransform: 'uppercase' }}>
                      {plan.month}
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: i === 2 ? '#c9a84c' : '#f0ebff', marginBottom: '20px' }}>
                      {plan.title}
                    </h3>
                    <div style={{ marginBottom: '20px' }}>
                      {plan.items.map((item, j) => (
                        <div
                          key={j}
                          style={{
                            fontSize: '14px',
                            color: '#d4cee8',
                            marginBottom: '10px',
                            paddingLeft: '20px',
                            position: 'relative',
                          }}
                        >
                          <span style={{ position: 'absolute', left: 0, color: '#c9a84c' }}>-</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(201,168,76,0.2)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #c9a84c'
                    }}>
                      <div style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '4px' }}>GOAL</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#c9a84c' }}>{plan.goal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Section 1 - Identity Shift */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Brain size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  You are not hoping brands notice you. You are a business they need.
                </h2>
              </div>

              <div style={{
                background: '#1c1a35',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(201,168,76,0.15)' }}>
                      <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 700, color: '#c9a84c', textAlign: 'left', textTransform: 'uppercase' }}>Old</th>
                      <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 700, color: '#c9a84c', textAlign: 'left', textTransform: 'uppercase' }}>New</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Waiting to be discovered', 'Actively finding clients'],
                      ['Apologising for your rates', 'Knowing your value'],
                      ['Taking any deal', 'Choosing aligned brands'],
                      ['Feeling lucky when brands reply', 'Expecting replies because your pitch is strong'],
                      ['Comparing to bigger creators', 'Comparing to yourself 90 days ago']
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: '#9b8fb5' }}>{row[0]}</td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: '#c9a84c', fontWeight: 600 }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2 - Rejection Is Data */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Lightbulb size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Every no is telling you something. Listen.
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { type: 'No response', action: 'Hook was weak. Test a new opening line.' },
                  { type: 'Rates too high', action: 'Wrong brand or portfolio not there yet. Move on.' },
                  { type: 'Influencers only', action: 'Not your job to convince them. Move on.' },
                  { type: 'We will keep you on file', action: 'Follow up in 30 days with new work.' },
                  { type: 'Silence after delivery', action: 'Send invoice immediately. Never wait.' }
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#1c1a35',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}
                  >
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#c9a84c', marginBottom: '10px' }}>
                      {item.type}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6, margin: 0 }}>
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 - Comparison Trap */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Target size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Someone will always be further ahead. That is not your business.
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'You are seeing their highlight reel. Not the 47 pitches before that $2,000 deal.',
                  'The only comparison that matters — you versus you 90 days ago.',
                  'Their success does not shrink yours. The market is enormous.'
                ].map((statement, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(139,105,20,0.1))',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '12px',
                      padding: '24px 28px',
                      borderLeft: '4px solid #c9a84c',
                    }}
                  >
                    <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#f0ebff', lineHeight: 1.7, margin: 0 }}>
                      {statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 - Daily Habits */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Check size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Five small actions done consistently beat big actions done occasionally.
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {[
                  { key: 'creatorAction' as const, text: 'Write down one creator action for today' },
                  { key: 'sentPitch' as const, text: 'Send at least one pitch' },
                  { key: 'brandEngagement' as const, text: 'Engage genuinely with one brand' },
                  { key: 'contentCreated' as const, text: 'Create or plan one piece of content' },
                  { key: 'checkedNumbers' as const, text: 'Check your numbers for 10 minutes' }
                ].map((habit) => (
                  <button
                    key={habit.key}
                    onClick={() => toggleCheckbox(habit.key)}
                    style={{
                      background: dailyCheckboxes[habit.key] ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,105,20,0.2))' : '#1c1a35',
                      border: dailyCheckboxes[habit.key] ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: dailyCheckboxes[habit.key] ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                      border: dailyCheckboxes[habit.key] ? 'none' : '2px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {dailyCheckboxes[habit.key] && <Check size={16} style={{ color: '#0a0610' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: dailyCheckboxes[habit.key] ? '#c9a84c' : '#d4cee8', fontWeight: 600 }}>
                        {habit.text}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 5 - Slow Season Playbook */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <TrendingUp size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Deals go quiet. This is normal. Here is what to do.
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Do not panic — brands have cycles that have nothing to do with you',
                  'Double your outreach immediately',
                  'Update your portfolio — come back stronger',
                  'Join a new platform — more channels mean more deals',
                  'Message every past brand — "I have availability next month. Any upcoming campaigns?"'
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#1c1a35',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0a0610',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.7, margin: 0 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 - Win Wall */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Trophy size={28} style={{ color: '#c9a84c' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ebff', margin: 0 }}>
                  Progress feels invisible until you write it down.
                </h2>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '16px', textTransform: 'uppercase' }}>
                  Milestones — {progress.completed}/{progress.total} Unlocked
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {[
                    { key: 'firstPitch' as const, label: 'First pitch' },
                    { key: 'firstReply' as const, label: 'First reply' },
                    { key: 'firstDeal' as const, label: 'First deal' },
                    { key: 'firstDelivery' as const, label: 'First delivery' },
                    { key: 'firstPayment' as const, label: 'First payment' },
                    { key: 'firstRateRaise' as const, label: 'First rate raise' },
                    { key: 'firstRetainer' as const, label: 'First retainer' },
                    { key: 'first500Month' as const, label: 'First $500 month' },
                    { key: 'first1kMonth' as const, label: 'First $1k month' },
                    { key: 'first3kMonth' as const, label: 'First $3k month' }
                  ].map((milestone) => (
                    <button
                      key={milestone.key}
                      onClick={() => setField('milestones', { ...milestones, [milestone.key]: !milestones[milestone.key] })}
                      style={{
                        padding: '12px 20px',
                        background: milestones[milestone.key] ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
                        border: milestones[milestone.key] ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '100px',
                        color: milestones[milestone.key] ? '#0a0610' : '#9b8fb5',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: milestones[milestone.key] ? 1 : 0.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      <span>{milestone.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={winInput}
                    onChange={(e) => setWinInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addWin()}
                    placeholder="Log a win — big or small..."
                    style={{
                      flex: 1,
                      padding: '14px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '100px',
                      color: '#f0ebff',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    onClick={addWin}
                    disabled={!winInput.trim()}
                    style={{
                      padding: '14px 28px',
                      background: winInput.trim() ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(201,168,76,0.3)',
                      border: 'none',
                      borderRadius: '100px',
                      color: '#0a0610',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: winInput.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Plus size={16} />
                    Add Win
                  </button>
                </div>
                <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#c9a84c', margin: 0 }}>
                  Sent your first pitch today? That is a win. Log it.
                </p>
              </div>

              {wins.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {wins.map((win) => (
                    <div
                      key={win.id}
                      style={{
                        background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.15))',
                        border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', color: '#f0ebff', margin: '0 0 4px 0' }}>{win.text}</p>
                        <p style={{ fontSize: '12px', color: '#9b8fb5', margin: 0 }}>{win.date}</p>
                      </div>
                      <button
                        onClick={() => deleteWin(win.id)}
                        style={{
                          padding: '8px',
                          background: 'rgba(239,68,68,0.2)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '6px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
