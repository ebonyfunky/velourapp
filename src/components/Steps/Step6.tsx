import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import { linkedInAngles, threadsAngles, categoryScriptAngles, categoryTips } from '../../utils/platformLogic';
import { Copy, RefreshCw, Zap, BookOpen, Layers, Video, X, Loader2 } from 'lucide-react';

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
}

type ScriptFormat = 'hook-and-sell' | 'story-led' | 'problem-solution' | 'trend-challenge' | 'results-first' | 'faith-purpose' | 'threads' | 'twitter-thread';

const SCRIPT_FORMATS = [
  { id: 'hook-and-sell' as const, label: 'Hook & Sell' },
  { id: 'story-led' as const, label: 'Story-Led' },
  { id: 'problem-solution' as const, label: 'Problem → Solution' },
  { id: 'trend-challenge' as const, label: 'Trend & Challenge' },
  { id: 'results-first' as const, label: 'Results First' },
  { id: 'faith-purpose' as const, label: 'Faith & Purpose' },
];

export default function Step5({ onNext, onBack }: Step5Props) {
  const store = useCampaignStore();
  const { platformTargets, contentCategory, contentStyle, contentLanguage, selectedCTA, customCTAs, setSelectedCTA, setCustomCTAs, setField, productName, targetAudience, painPoint, selectedVibe, selectedPersona } = store;
  const [scriptFormat, setScriptFormat] = useState<ScriptFormat>('hook-and-sell');
  const [threadsType, setThreadsType] = useState<'single' | 'chain'>('single');
  const [captionMode, setCaptionMode] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [customCTAInput, setCustomCTAInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  const hasThreads = platformTargets.includes('Threads');
  const hasTwitter = platformTargets.includes('Twitter / X');
  const hasFacebookFeed = platformTargets.includes('Facebook Feed Posts');
  const hasLinkedIn = platformTargets.some(p => p.includes('LinkedIn'));
  const hasStories = platformTargets.some(p => p.includes('Stories') || p === 'Snapchat');

  const presetCTAs = [
    'DM me [word] to learn more',
    'Applications open — link in bio',
    'Comment [word] and I\'ll send you the details',
    'Book a free call — link in bio',
    'Follow for more',
    'Comment [word] and I\'ll send you the link',
    'Duet this if you agree',
    'Link in bio',
    'Save this for later',
    'Share with someone who needs this',
    'Drop a comment if this helped',
    'Try it for free — link in bio',
    'Watch till the end',
    'Tag someone building their empire',
    'Comment your country',
  ];

  const affiliateCTAs = [
    'Use my code [X] for [X]% off',
    'Link in my bio — grab yours',
    'Comment [word] and I\'ll DM you my link',
    'Shop through my link — same price, supports me',
    'DM me [word] for the affiliate discount',
    'Swipe up to grab yours',
  ];

  const digitalProductCTAs = [
    'Get instant access — link in bio',
    'Download yours — link in bio',
    'Grab your copy — link in bio',
    'Comment [word] for the link',
    'DM me [word] for instant access',
    'Only $[X] — link in bio',
    'Free for the next 24 hours — link in bio',
    'Last few copies — link in bio',
  ];

  const categoryAngles = categoryScriptAngles[contentCategory];
  const categoryTip = categoryTips[contentCategory];

  const languageInstruction = contentLanguage
    ? `Generate ALL scripts entirely in ${contentLanguage}. Match authentic tone, expressions and cultural references for ${contentLanguage} speakers naturally. Do not translate back to English.`
    : 'Generate scripts in English.';

  const toggleCTA = (cta: string) => {
    if (selectedCTA === cta) {
      setSelectedCTA('');
    } else {
      setSelectedCTA(cta);
    }
  };

  const addCustomCTA = () => {
    if (!customCTAInput.trim()) return;

    const newCTA = customCTAInput.trim();
    setCustomCTAs([...customCTAs, newCTA]);
    setSelectedCTA(newCTA);
    setCustomCTAInput('');
  };

  const removeCustomCTA = (cta: string) => {
    setCustomCTAs(customCTAs.filter((c) => c !== cta));
    if (selectedCTA === cta) {
      setSelectedCTA('');
    }
  };

  const getFormatInstructions = (format: ScriptFormat): string => {
    const instructions: Record<ScriptFormat, string> = {
      'hook-and-sell': `FORMAT: Hook & Sell
Open with a bold pattern interrupt that stops the scroll in under 3 seconds. Build quickly to the offer. Close with a direct CTA.
Structure: SCROLL-STOPPER HOOK → PROBLEM AGITATION → OFFER REVEAL → CTA`,
      'story-led': `FORMAT: Story-Led
Open with a personal story hook the audience relates to. Build tension. Reveal the lesson or transformation. Close with a CTA.
Structure: STORY HOOK → TENSION/STRUGGLE → TURNING POINT → LESSON → CTA`,
      'problem-solution': `FORMAT: Problem → Solution
Name the pain clearly and specifically. Agitate it — make them feel it. Present the product/offer as the direct solution. CTA.
Structure: PAIN POINT → AGITATE → SOLUTION REVEAL → PROOF/BENEFIT → CTA`,
      'trend-challenge': `FORMAT: Trend & Challenge
High energy. Trend-aware. Designed to be shared, dueted, or stitched. Bold confident energy. Speak directly to the viewer.
Structure: BOLD TREND HOOK → RELATABLE PROBLEM → SOLUTION TEASE → COMMUNITY CTA`,
      'results-first': `FORMAT: Results First
Lead with the transformation or result BEFORE explaining anything. Then reverse engineer — show how they can get there.
Structure: RESULT/TRANSFORMATION REVEAL → "Here's how I did it" → STEPS/PROCESS → CTA`,
      'faith-purpose': `FORMAT: Faith & Purpose
Open with a scripture, faith statement or purpose-driven question. Connect it to the transformation your product creates. Close with a faith-aligned, purpose-driven CTA.
Structure: SCRIPTURE/PURPOSE HOOK → FAITH CONTEXT → PRODUCT AS CALLING → PURPOSE CTA`,
      'threads': 'Threads format',
      'twitter-thread': 'Twitter thread format',
    };
    return instructions[format] || '';
  };

  const generateScript = async () => {
    setIsGenerating(true);
    setGeneratedScript('');
    setGenerationError('');

    if (!productName || !targetAudience || !painPoint) {
      setGenerationError('Please fill in your Product details in Step 3 before generating scripts.');
      setIsGenerating(false);
      return;
    }

    const activeCTA = selectedCTA || (customCTAs && customCTAs[0]) || 'Follow for more';

    if (scriptFormat === 'threads' && threadsType === 'chain') {
      setGeneratedScript(`1/ THE HOOK
Bold opening statement, hot take, or pattern interrupt.
This is where you stop the scroll.

2/ THE PROBLEM
Expand the tension. Make them feel the pain point.
Show them what they're struggling with.

3/ THE SOLUTION
Your insight, method, or offer introduced.
This is the value moment.

4/ THE PROOF
Result, testimonial, stat, or transformation.
Make it believable and tangible.

5/ THE CTA
${activeCTA}`);
      setIsGenerating(false);
      return;
    } else if (scriptFormat === 'twitter-thread') {
      setGeneratedScript(`1/ THE HOOK TWEET
Bold claim or curiosity gap that stops the scroll.

2/ Here's why this matters...
Supporting point one with specific detail.

3/ Most people get this wrong:
Common mistake or contrarian viewpoint.

4/ The better approach:
Your method or insight explained clearly.

5/ Here's what happens when you apply this:
Result or transformation example.

6/ ${activeCTA}`);
      setIsGenerating(false);
      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const apiUrl = `${supabaseUrl}/functions/v1/generate-scripts`;

      console.log('Calling edge function:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          creatorName: store.creatorName,
          brandName: store.brandName,
          productName: productName,
          productDescription: store.productDescription,
          pricePoint: store.pricePoint,
          currency: store.currency,
          keyBenefits: store.benefits,
          usp: store.usp,
          targetAudience: targetAudience,
          painPoint: painPoint,
          desiredOutcome: store.desiredOutcome,
          scriptFormat: scriptFormat,
          contentLanguage: contentLanguage,
          contentStyle: contentStyle,
          selectedCTA: activeCTA,
          selectedVibe: selectedVibe,
          selectedPersona: selectedPersona,
          avatarRealPerson: store.avatarRealPerson,
          avatarCurrently: store.avatarCurrently,
          avatarFeels: store.avatarFeels,
          avatarFrustratedBy: store.avatarFrustratedBy,
          avatarAlreadyTried: store.avatarAlreadyTried,
          avatarBiggestFear: store.avatarBiggestFear,
          avatarSecretHope: store.avatarSecretHope,
          avatarVoice: store.avatarVoice,
          avatarFeelBlank: store.avatarFeelBlank,
          avatarWantBlank: store.avatarWantBlank,
          avatarTiredOfBlank: store.avatarTiredOfBlank,
        })
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedScript(data.scripts);

    } catch (error: any) {
      console.error('Generate error:', error);
      setGenerationError(
        `Error: ${error.message}. Check browser console for details.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '42px',
              fontWeight: 600,
              color: '#f0ebff',
              marginBottom: '0',
              lineHeight: '1.5',
              overflow: 'visible',
            }}
          >
            Script Generator
          </h1>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#c9a84c',
            marginBottom: '24px',
            lineHeight: '1.6',
            overflow: 'visible',
          }}
        >
          Viral content scripts with automatic filming directions
        </p>
      </div>

      {hasStories && (
        <div
          className="p-4 rounded-xl text-[13px] font-medium"
          style={{
            background: 'rgba(201,168,76,0.08)',
            borderLeft: '3px solid #c9a84c',
            color: '#f0ebff',
          }}
        >
          Stories viewers decide in 1.5 seconds. Pattern Interrupt or Emotional Hook recommended for maximum hold
          rate.
        </div>
      )}

      {hasLinkedIn && (
        <div
          className="p-4 rounded-xl text-[13px] font-medium"
          style={{
            background: 'rgba(201,168,76,0.08)',
            borderLeft: '3px solid #c9a84c',
            color: '#f0ebff',
          }}
        >
          <div className="mb-2 font-bold">LinkedIn Best Angles:</div>
          <ul className="space-y-1 text-[13px]">
            {linkedInAngles.map((angle, i) => (
              <li key={i}>- {angle}</li>
            ))}
          </ul>
          <div className="mt-3 italic text-gold">
            LinkedIn hooks must earn the 'see more' click in the first line. Lead with the insight, not the
            backstory.
          </div>
        </div>
      )}

      {hasThreads && (
        <div
          className="p-4 rounded-xl text-[13px] font-medium"
          style={{
            background: 'rgba(201,168,76,0.08)',
            borderLeft: '3px solid #c9a84c',
            color: '#f0ebff',
          }}
        >
          <div className="mb-2 font-bold">Best Angles for Threads:</div>
          <ul className="space-y-1 text-[13px]">
            {threadsAngles.map((angle, i) => (
              <li key={i}>{angle}</li>
            ))}
          </ul>
          <div className="mt-3 italic text-gold">
            Threads rewards raw, conversational and opinionated content. Less polished = more reach. Write like you
            think, not like you edit.
          </div>
        </div>
      )}

      {categoryAngles && (
        <div
          className="p-4 rounded-xl text-[13px] font-medium"
          style={{
            background: 'rgba(201,168,76,0.08)',
            borderLeft: '3px solid #c9a84c',
            color: '#f0ebff',
          }}
        >
          <div className="mb-2 font-bold">{contentCategory} Script Angles:</div>
          <ul className="space-y-1 text-[13px]">
            {categoryAngles.map((angle, i) => (
              <li key={i}>- {angle}</li>
            ))}
          </ul>
          {categoryTip && (
            <div className="mt-3 italic text-gold text-[13px]">
              {categoryTip}
            </div>
          )}
        </div>
      )}

      <div>
        <label className="input-label">CONTENT STYLE</label>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setField.bind(null, 'contentStyle')('western')}
            className="relative selection-card transition-all duration-300"
            style={{
              border: contentStyle === 'western' ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.25)',
              boxShadow: contentStyle === 'western'
                ? '0 0 0 1px rgba(201,168,76,0.3), 0 8px 40px rgba(201,168,76,0.2)'
                : undefined,
              background: contentStyle === 'western'
                ? 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))'
                : undefined,
              minHeight: '140px',
              padding: '20px 16px',
            }}
          >
            <div className="text-2xl mb-2" />
            <h3 className="text-[16px] font-bold text-text-primary mb-2">Western</h3>
            <p className="text-[12px] text-text-dim leading-relaxed">Direct, fast-paced, high energy</p>
          </button>

          <button
            onClick={() => setField.bind(null, 'contentStyle')('african')}
            className="relative selection-card transition-all duration-300"
            style={{
              border: contentStyle === 'african' ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.25)',
              boxShadow: contentStyle === 'african'
                ? '0 0 0 1px rgba(201,168,76,0.3), 0 8px 40px rgba(201,168,76,0.2)'
                : undefined,
              background: contentStyle === 'african'
                ? 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))'
                : undefined,
              minHeight: '140px',
              padding: '20px 16px',
            }}
          >
            <div className="text-2xl mb-2" />
            <h3 className="text-[16px] font-bold text-text-primary mb-2">African / Cultural</h3>
            <p className="text-[12px] text-text-dim leading-relaxed">Storytelling-led, community-focused, culturally rich and relatable</p>
          </button>

          <button
            onClick={() => setField.bind(null, 'contentStyle')('faith')}
            className="relative selection-card transition-all duration-300"
            style={{
              border: contentStyle === 'faith' ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.25)',
              boxShadow: contentStyle === 'faith'
                ? '0 0 0 1px rgba(201,168,76,0.3), 0 8px 40px rgba(201,168,76,0.2)'
                : undefined,
              background: contentStyle === 'faith'
                ? 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))'
                : undefined,
              minHeight: '140px',
              padding: '20px 16px',
            }}
          >
            <div className="text-2xl mb-2" />
            <h3 className="text-[16px] font-bold text-text-primary mb-2">Faith-Based</h3>
            <p className="text-[12px] text-text-dim leading-relaxed">Scripture-anchored, hope-led, transformational</p>
          </button>

          <button
            onClick={() => setField.bind(null, 'contentStyle')('universal')}
            className="relative selection-card transition-all duration-300"
            style={{
              border: contentStyle === 'universal' ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.25)',
              boxShadow: contentStyle === 'universal'
                ? '0 0 0 1px rgba(201,168,76,0.3), 0 8px 40px rgba(201,168,76,0.2)'
                : undefined,
              background: contentStyle === 'universal'
                ? 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))'
                : undefined,
              minHeight: '140px',
              padding: '20px 16px',
            }}
          >
            <div className="text-2xl mb-2" />
            <h3 className="text-[16px] font-bold text-text-primary mb-2">Universal</h3>
            <p className="text-[12px] text-text-dim leading-relaxed">Inclusive, clear and globally relatable</p>
          </button>
        </div>
      </div>

      <div>
        <label className="input-label">Script Format</label>
        <div
          className="flex gap-2 mb-4"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '8px',
            width: '100%',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {SCRIPT_FORMATS.map((format) => (
            <button
              key={format.id}
              onClick={() => setScriptFormat(format.id)}
              style={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                borderRadius: '100px',
                padding: '10px 18px',
                fontSize: '12px',
                cursor: 'pointer',
                border: scriptFormat === format.id ? 'none' : '1px solid rgba(255,255,255,0.12)',
                outline: 'none',
                background: scriptFormat === format.id
                  ? 'linear-gradient(135deg, #c9a84c, #8B6914)'
                  : 'rgba(255,255,255,0.04)',
                color: scriptFormat === format.id ? '#0a0610' : '#9b8fb5',
                fontWeight: scriptFormat === format.id ? 700 : 600,
                boxShadow: scriptFormat === format.id ? '0 0 16px rgba(201,168,76,0.4)' : 'none',
              }}
            >
              {format.label}
            </button>
          ))}
          {hasThreads && (
            <button
              onClick={() => setScriptFormat('threads')}
              style={{
                background: scriptFormat === 'threads'
                  ? 'linear-gradient(135deg, #c9a84c, #8B6914)'
                  : 'rgba(255,255,255,0.04)',
                border: scriptFormat === 'threads' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                color: scriptFormat === 'threads' ? '#0a0610' : '#9b8fb5',
                borderRadius: '100px',
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: scriptFormat === 'threads' ? 700 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: scriptFormat === 'threads' ? '0 0 16px rgba(201,168,76,0.4)' : 'none',
              }}
            >
              Threads Mode
            </button>
          )}
          {hasTwitter && (
            <button
              onClick={() => setScriptFormat('twitter-thread')}
              style={{
                background: scriptFormat === 'twitter-thread'
                  ? 'linear-gradient(135deg, #c9a84c, #8B6914)'
                  : 'rgba(255,255,255,0.04)',
                border: scriptFormat === 'twitter-thread' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                color: scriptFormat === 'twitter-thread' ? '#0a0610' : '#9b8fb5',
                borderRadius: '100px',
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: scriptFormat === 'twitter-thread' ? 700 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: scriptFormat === 'twitter-thread' ? '0 0 16px rgba(201,168,76,0.4)' : 'none',
              }}
            >
              X Thread
            </button>
          )}
        </div>

        {scriptFormat === 'threads' && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setThreadsType('single')}
              className={`pill ${threadsType === 'single' ? 'active' : ''}`}
            >
              Single Post
            </button>
            <button
              onClick={() => setThreadsType('chain')}
              className={`pill ${threadsType === 'chain' ? 'active' : ''}`}
            >
              Thread Chain (5 posts)
            </button>
          </div>
        )}

        {hasFacebookFeed && scriptFormat !== 'threads' && scriptFormat !== 'twitter-thread' && (
          <div className="mb-4">
            <label className="flex items-center gap-2 text-text-body text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={captionMode}
                onChange={(e) => setCaptionMode(e.target.checked)}
                className="w-4 h-4 accent-gold"
              />
              <span>Caption Mode (generates video script + written caption)</span>
            </label>
          </div>
        )}
      </div>

      <div>
        <label
          className="input-label"
          style={{
            color: '#e8c96a',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Platform-Specific CTAs (select 1)
        </label>
        <p
          style={{
            fontSize: '11px',
            color: '#9b8fb5',
            fontStyle: 'italic',
            marginBottom: '12px',
          }}
        >
          Choose the one CTA for this campaign
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {presetCTAs.map((cta, i) => {
            const isSelected = selectedCTA === cta;
            return (
              <button
                key={i}
                onClick={() => toggleCTA(cta)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  color: isSelected ? '#e8c96a' : '#9b8fb5',
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.2)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {cta}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', letterSpacing: '0.08em', marginTop: '16px', marginBottom: '8px' }}>
          AFFILIATE CTAs
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {affiliateCTAs.map((cta, i) => {
            const isSelected = selectedCTA === cta;
            return (
              <button
                key={`aff-${i}`}
                onClick={() => toggleCTA(cta)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  color: isSelected ? '#e8c96a' : '#9b8fb5',
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.2)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {cta}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', letterSpacing: '0.08em', marginTop: '16px', marginBottom: '8px' }}>
          DIGITAL PRODUCT CTAs
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {digitalProductCTAs.map((cta, i) => {
            const isSelected = selectedCTA === cta;
            return (
              <button
                key={`dig-${i}`}
                onClick={() => toggleCTA(cta)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  color: isSelected ? '#e8c96a' : '#9b8fb5',
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.2)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {cta}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {customCTAs.map((cta, i) => {
            const isSelected = selectedCTA === cta;
            return (
              <button
                key={`custom-${i}`}
                onClick={() => toggleCTA(cta)}
                className="px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2"
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  color: isSelected ? '#e8c96a' : '#9b8fb5',
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.2)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {cta}
                <X
                  className="w-3 h-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCustomCTA(cta);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '16px' }}>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#e8c96a',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            + Add your own CTA
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customCTAInput}
              onChange={(e) => setCustomCTAInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addCustomCTA();
                }
              }}
              placeholder="Type your own call to action..."
              className="flex-1 text-sm transition-all"
              style={{
                background: '#17152e',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '100px',
                padding: '10px 20px',
                color: '#f0ebff',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#c9a84c';
                e.target.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(201,168,76,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={addCustomCTA}
              style={{
                background: 'linear-gradient(135deg, #1a5c35, #2e8b57)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '100px',
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="input-label mb-0">Generated Script</label>
          <button
            onClick={generateScript}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green/20 text-green border border-green/40 font-semibold text-sm hover:bg-green/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>
        {generationError && (
          <div style={{
            color: '#e8c96a',
            fontSize: '12px',
            padding: '8px',
            background: 'rgba(201,168,76,0.1)',
            borderRadius: '8px',
            marginBottom: '8px'
          }}>
            {generationError}
          </div>
        )}
        <p
          className="text-center mb-3"
          style={{
            fontSize: '11px',
            color: '#9b8fb5',
            fontStyle: 'italic',
          }}
        >
          {contentLanguage ? `Scripts will be generated in ${contentLanguage}` : 'Scripts generate in English by default'}.
        </p>
        <div
          className="velour-card p-6 min-h-[300px] relative"
          style={{
            border: isGenerating ? '1.5px solid rgba(201,168,76,0.4)' : undefined,
            boxShadow: isGenerating ? '0 0 20px rgba(201,168,76,0.15)' : undefined,
            animation: isGenerating ? 'pulse 2s ease-in-out infinite' : undefined,
          }}
        >
          {isGenerating ? (
            <div className="absolute inset-0 flex items-center justify-center text-text-dim">
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-3 animate-spin" style={{ color: '#c9a84c' }} />
                <p className="text-sm" style={{ color: '#e8c96a' }}>Velour is crafting your scripts...</p>
              </div>
            </div>
          ) : generatedScript ? (
            <div className="space-y-4">
              <pre
                className="text-text-body font-sans text-[13px] leading-relaxed whitespace-pre-wrap"
                style={{
                  color: '#f0ebff',
                }}
              >
                {generatedScript.split('\n').map((line, i) => {
                  if (line.match(/^SCRIPT [123]/)) {
                    return <div key={i} style={{ color: '#e8c96a', fontWeight: 700, marginTop: i > 0 ? '24px' : '0', marginBottom: '12px' }}>{line}</div>;
                  }
                  return <div key={i}>{line || '\u00A0'}</div>;
                })}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedScript);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/20 font-semibold text-sm hover:bg-gold/20 transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy Script
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-text-dim">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Click Generate to create your script</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-xl bg-card-bg border border-gold/20 text-text-primary font-bold tracking-wider hover:border-gold/50 transition-all"
        >
          Back
        </button>
        <button onClick={handleContinue} className="btn-primary flex-1">
          Continue to Content Calendar
        </button>
      </div>
    </motion.div>
  );
}
