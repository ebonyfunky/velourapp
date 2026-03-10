import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import { Check, Zap, TrendingUp, Eye, MessageCircle, Target, Trophy, Heart, Users, Globe, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Step1Props {
  onNext: () => void;
}

const categoryGroups = [
  {
    label: '── DIGITAL PRODUCTS ──',
    options: [
      'UGC Creator',
      'Digital Course',
      'eBook / Digital Download',
      'Coaching Program',
      'Membership / Community',
      'Print on Demand',
    ],
  },
  {
    label: '── TECH & SOFTWARE ──',
    options: [
      'Technology & Software',
      'SaaS & Apps',
      'AI Tools & Automation',
    ],
  },
  {
    label: '── MARKETING ──',
    options: [
      'Affiliate Marketing',
      'TikTok Shop',
      'Agency / Service Provider',
    ],
  },
  {
    label: '── LIFESTYLE ──',
    options: [
      'Fitness & Wellness',
      'Lifestyle & Travel',
      'Food & Recipe',
      'Beauty & Fashion',
    ],
  },
  {
    label: '── FAITH & MINISTRY ──',
    options: [
      'Faith & Ministry',
      'Church / Religious Organisation',
      'Motivational Speaker',
      'Life Coach',
      'Non-Profit / Charity',
    ],
  },
  {
    label: '── OTHER ──',
    options: [
      'Physical Product',
      'Personal Brand',
      'Other',
    ],
  },
];

const platformGroups = [
  {
    label: 'SHORT-FORM VIDEO',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Facebook Reels'],
  },
  {
    label: 'SOCIAL & CONTENT',
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'Pinterest', 'Snapchat', 'Twitter / X', 'Threads'],
  },
];

const goals = [
  {
    id: 'viral',
    icon: Zap,
    title: 'Go Viral',
    description: 'Maximum reach, shares and algorithm love',
  },
  {
    id: 'sales',
    icon: TrendingUp,
    title: 'Drive Sales',
    description: 'Convert viewers into buyers fast',
  },
  {
    id: 'awareness',
    icon: Eye,
    title: 'Build Awareness',
    description: 'Grow your audience and authority',
  },
  {
    id: 'engagement',
    icon: MessageCircle,
    title: 'Boost Engagement',
    description: 'Comments, saves, shares and DMs',
  },
  {
    id: 'leads',
    icon: Target,
    title: 'Generate Leads',
    description: 'Build your list and fill your pipeline',
  },
  {
    id: 'authority',
    icon: Trophy,
    title: 'Build Authority',
    description: 'Become the go-to name in your niche',
  },
  {
    id: 'message',
    icon: Heart,
    title: 'Spread the Message',
    description: 'Share your faith, ministry or mission with the world',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Build Community',
    description: 'Grow a loyal tribe around your brand',
  },
];

const featuredLanguages = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'fr', label: '🇫🇷 French' },
  { code: 'es', label: '🇪🇸 Spanish' },
  { code: 'pt', label: '🇵🇹 Portuguese' },
  { code: 'de', label: '🇩🇪 German' },
  { code: 'zh', label: '🇨🇳 Chinese' },
  { code: 'ar', label: '🇸🇦 Arabic' },
  { code: 'hi', label: '🇮🇳 Hindi' },
  { code: 'pidgin', label: '🗣 Pidgin English' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'ig', label: 'Igbo' },
  { code: 'ha', label: 'Hausa' },
];

export default function Step1({ onNext }: Step1Props) {
  const {
    creatorName,
    brandName,
    contentCategory,
    contentLanguage,
    platformTargets,
    campaignGoals,
    setField,
  } = useCampaignStore();

  const togglePlatform = (platform: string) => {
    const updated = platformTargets.includes(platform)
      ? platformTargets.filter((p) => p !== platform)
      : [...platformTargets, platform];
    setField('platformTargets', updated);
  };

  const [showMaxGoalsWarning, setShowMaxGoalsWarning] = useState(false);

  const toggleGoal = (goalId: string) => {
    const isCurrentlySelected = campaignGoals.includes(goalId);

    if (isCurrentlySelected) {
      const updated = campaignGoals.filter((g) => g !== goalId);
      setField('campaignGoals', updated);
      setShowMaxGoalsWarning(false);
    } else {
      if (campaignGoals.length >= 3) {
        setShowMaxGoalsWarning(true);
        setTimeout(() => setShowMaxGoalsWarning(false), 3000);
        return;
      }
      const updated = [...campaignGoals, goalId];
      setField('campaignGoals', updated);
    }
  };

  const handleLanguagePillClick = (label: string) => {
    setField('contentLanguage', label);
  };

  const handleLanguageInputChange = (value: string) => {
    setField('contentLanguage', value);
  };

  const isQuickSelectActive = featuredLanguages.some(lang => lang.label === contentLanguage);

  const handleContinue = () => {
    onNext();
  };

  const canProceed =
    creatorName && brandName && contentCategory && contentLanguage && platformTargets.length > 0 && campaignGoals.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="gradient-text mb-2">Campaign Identity</h1>
        <p className="step-subtitle">Every empire starts with one campaign. Let's build yours.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="input-label">Creator Name</label>
          <input
            type="text"
            value={creatorName}
            onChange={(e) => setField('creatorName', e.target.value)}
            className="input-field"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="input-label">Brand / Business Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setField('brandName', e.target.value)}
            className="input-field"
            placeholder="Enter your brand name"
          />
        </div>

        <div>
          <label className="input-label">Content Category</label>
          <select value={contentCategory} onChange={(e) => setField('contentCategory', e.target.value)} className="input-field">
            <option value="" disabled>
              Select a category
            </option>
            {categoryGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                <option
                  disabled
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#c9a84c',
                    padding: '10px 18px 4px',
                    cursor: 'default',
                    borderTop: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  {group.label}
                </option>
                {group.options.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-gold" />
            <label className="input-label mb-0">Content Language</label>
          </div>
          <p className="text-[12px] text-text-dim mb-4 italic">
            Scripts generated in your language — not translated, natively written
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', width: '100%', marginBottom: '16px' }}>
            {featuredLanguages.map((lang) => {
              const isSelected = contentLanguage === lang.label;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguagePillClick(lang.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '9px 14px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    width: '100%',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                    border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    color: isSelected ? '#e8c96a' : '#9b8fb5',
                    boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.2)' : 'none',
                    transition: 'all 200ms ease',
                    height: '36px',
                  }}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-text-dim mb-2 block">
              Or type any language
            </label>
            <input
              type="text"
              value={isQuickSelectActive ? '' : contentLanguage}
              onChange={(e) => handleLanguageInputChange(e.target.value)}
              className="input-field"
              placeholder="e.g. Swahili, Hindi, Hausa, Twi, Zulu, Amharic, Tagalog..."
            />
          </div>

          <div
            className="mt-4 p-3 rounded-lg text-[11px] italic"
            style={{
              background: 'rgba(201,168,76,0.05)',
              border: '1px solid rgba(201,168,76,0.15)',
              color: '#b8aed0',
            }}
          >
            Velour supports 50+ languages — your scripts, hooks and CTAs will be generated in your chosen language by Claude AI. For best results with African languages, select from the featured options above.
          </div>
        </div>

        <div>
          <label
            className="input-label"
            style={{
              color: '#e8c96a',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontSize: '11px',
              marginBottom: '14px',
              display: 'block',
            }}
          >
            Platform Target (select multiple)
          </label>
          {platformGroups.map((group, groupIndex) => (
            <div key={group.label} style={{ marginTop: groupIndex > 0 ? '20px' : '0' }}>
              <div className="group-row-label">
                {group.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                {group.platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    style={{
                      border: platformTargets.includes(platform)
                        ? '1.5px solid #c9a84c'
                        : '1.5px solid rgba(201,168,76,0.35)',
                      color: platformTargets.includes(platform) ? '#12102a' : '#d4cce8',
                      background: platformTargets.includes(platform)
                        ? '#c9a84c'
                        : 'rgba(201,168,76,0.04)',
                      fontWeight: platformTargets.includes(platform) ? 700 : 600,
                      fontSize: '12px',
                      padding: '7px 14px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      boxShadow: platformTargets.includes(platform)
                        ? '0 0 16px rgba(201,168,76,0.3)'
                        : 'none',
                      width: '100%',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                      if (!platformTargets.includes(platform)) {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
                        e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
                        e.currentTarget.style.color = '#f0ebff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!platformTargets.includes(platform)) {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)';
                        e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                        e.currentTarget.style.color = '#d4cce8';
                      }
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="input-label">
            Campaign Goals (Choose Up To 3)
          </label>
          <AnimatePresence>
            {showMaxGoalsWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 mb-3 px-4 py-3 rounded-lg"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                }}
              >
                <AlertCircle className="w-4 h-4 text-gold-light flex-shrink-0" />
                <p className="text-sm text-gold-light font-medium">
                  Max 3 goals — deselect one to change.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="campaign-goal-grid">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = campaignGoals.includes(goal.id);
              const isDisabled = !isSelected && campaignGoals.length >= 3;
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  disabled={isDisabled}
                  className="relative selection-card transition-all duration-300"
                  style={{
                    border: isSelected ? '2px solid #c9a84c' : undefined,
                    boxShadow: isSelected
                      ? '0 0 0 1px rgba(201,168,76,0.3), 0 8px 40px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.08)'
                      : undefined,
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))'
                      : undefined,
                    opacity: isDisabled ? 0.4 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                  }}
                  data-selected={isSelected}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute flex items-center justify-center font-extrabold"
                      style={{
                        top: '12px',
                        right: '12px',
                        width: '22px',
                        height: '22px',
                        background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                        borderRadius: '50%',
                        color: '#12102a',
                        fontSize: '12px',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                    </motion.div>
                  )}
                  <div className={`selection-icon-container ${isSelected ? 'selected' : ''}`}>
                    <Icon className={`w-5 h-5 transition-colors ${isSelected ? 'text-gold-light' : 'text-gold'}`} />
                  </div>
                  <h3 className={`selection-card-title ${isSelected ? 'selected' : ''}`}>
                    {goal.title}
                  </h3>
                  <p className="selection-card-description">{goal.description}</p>
                </button>
              );
            })}
          </div>
          <div className="text-center mt-4">
            {campaignGoals.length > 0 ? (
              <p className="text-[12px] font-semibold italic" style={{ color: '#c9a84c', fontWeight: 600 }}>
                Goals selected: {campaignGoals.map(g => goals.find(goal => goal.id === g)?.title).join(', ')}
              </p>
            ) : (
              <p className="text-[12px] italic" style={{ color: '#9b8fb5', fontWeight: 600 }}>
                Select at least one goal to continue
              </p>
            )}
          </div>
        </div>
      </div>

      <button onClick={handleContinue} disabled={!canProceed} className="btn-primary">
        Continue to Audience Avatar →
      </button>
    </motion.div>
  );
}
