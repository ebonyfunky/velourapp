import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Sparkles, Copy, RotateCcw, Save, Trash2, Clock } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';
import BriefUploader, { BriefData } from './BriefUploader';
import BriefRequirementsChecklist from './BriefRequirementsChecklist';

const toneOptions = [
  'Authentic & Raw',
  'Fun & Energetic',
  'Professional & Polished',
  'Emotional & Storytelling',
  'Educational & Informative'
];

const videoLengthOptions = ['15 seconds', '30 seconds', '60 seconds'];

const countWords = (text: string): number => {
  return text
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
};

const getTargetWordCount = (videoLength: string): number => {
  if (videoLength.includes('15')) return 30;
  if (videoLength.includes('30')) return 60;
  if (videoLength.includes('60')) return 120;
  return 60;
};

const scriptFormats = [
  {
    id: 'hook-sell',
    name: 'Hook & Sell',
    description: 'Grab attention immediately, then pitch the product',
  },
  {
    id: 'story-led',
    name: 'Story-Led',
    description: 'Personal narrative that naturally leads to the product',
  },
  {
    id: 'problem-solution',
    name: 'Problem → Solution',
    description: 'Show the pain point, reveal your product as the answer',
  },
  {
    id: 'trend-challenge',
    name: 'Trend & Challenge',
    description: 'Leverage trending sounds or challenges with your product',
  },
  {
    id: 'results-first',
    name: 'Results First',
    description: 'Lead with the transformation or before/after',
  },
  {
    id: 'faith-purpose',
    name: 'Faith & Purpose',
    description: 'Values-driven content connecting faith to product benefit',
  }
];

export default function ScriptStudio() {
  const {
    scriptStudioBrandName,
    scriptStudioProductName,
    scriptStudioKeyBenefit,
    scriptStudioTargetAudience,
    scriptStudioTone,
    scriptStudioVideoLength,
    scriptStudioFormat,
    scriptStudioGeneratedScript,
    scriptStudioSavedScripts,
    scriptStudioIsGenerating,
    setField
  } = useCampaignStore();

  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
  const [hasCreativeFreedom, setHasCreativeFreedom] = useState(true);
  const [brandBrief, setBrandBrief] = useState('');
  const [selectedCTA, setSelectedCTA] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [uploadedBrief, setUploadedBrief] = useState<BriefData | null>(null);

  const canGenerate =
    scriptStudioBrandName &&
    scriptStudioProductName &&
    scriptStudioKeyBenefit &&
    scriptStudioTargetAudience &&
    scriptStudioFormat;

  const generateScript = async () => {
    if (!canGenerate) return;

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      alert('Please add your Anthropic API key to the .env file as VITE_ANTHROPIC_API_KEY');
      return;
    }

    setField('scriptStudioIsGenerating', true);

    try {
      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const selectedFormat = scriptFormats.find(f => f.id === scriptStudioFormat);

      let briefRequirements = '';
      if (uploadedBrief) {
        briefRequirements = `
A brand brief has been uploaded. The following requirements must be invisibly woven into this script without ever sounding like a checklist is being read aloud:

Key messages to include: ${uploadedBrief.keyMessages.join(', ')}
Dos: ${uploadedBrief.dos.join(', ')}
Don'ts: ${uploadedBrief.donts.join(', ')} — never include these in the script
Product to feature: ${uploadedBrief.productToFeature}
Deliverables: ${uploadedBrief.deliverables} — match script length and format to these

The creator must be able to film this script and deliver it to the brand feeling completely confident that every requirement has been met. The brand should watch the finished video and feel that the creator read their brief carefully and understood exactly what they needed.
`;
      }

      const prompt = `You are a professional UGC (User Generated Content) script writer. Create a ${scriptStudioVideoLength} UGC script for the following:

Brand: ${scriptStudioBrandName}
Product: ${scriptStudioProductName}
Key Benefit: ${scriptStudioKeyBenefit}
Target Audience: ${scriptStudioTargetAudience}
Tone: ${scriptStudioTone}
Script Format: ${selectedFormat?.name} - ${selectedFormat?.description}
${briefRequirements}

Create a script with these exact sections:

HOOK: (First 3 seconds - must stop the scroll)
BODY: (Main content with natural product integration)
CTA SOFT: (Soft CTA option)
CTA MEDIUM: (Medium CTA option)
CTA STRONG: (Strong CTA option)
SCENE DIRECTION: (Brief visual guidance for filming)
ESTIMATED READ TIME: (Actual time in seconds)

HOOKS: Hooks must be maximum 8 words. Punchy. Curiosity-driven. No long sentences. Examples: "My skin is literally glowing", "POV: best moisturiser ever", "I cannot stop touching my face", "This changed everything for me".

DETECT FACELESS VS FACE FORWARD VIDEO TYPES:

For FACELESS video types (if format suggests voiceover or text-based content):
- Voiceover scripts should be conversational spoken word only with no face or body directions. Stage directions should only describe what the camera shows — the product, the background, close up shots.

For FACE FORWARD video types (direct-to-camera content):
- Include full body and face stage directions in brackets
- Script should be conversational and natural as if talking directly to camera

Never write a face forward style script for a faceless video type.

CTAs: Generate 3 CTAs that feel like the creator is naturally continuing the conversation with their viewer — not selling to them. Each CTA must be a complete sentence with energy, personality and a clear next step. Use these as style guides but always make them specific to the product and category:

Soft CTA — curiosity and community focused:
"Comment READY below and I will send you everything you need to get started"
"Drop a YES in the comments if you want me to do a full review of this"
"Comment LINK and I will personally DM you where to get this right now"
"Save this video — future you will be so glad you did"

Medium CTA — warm and personal with clear direction:
"For the full details and where to get yours visit the link in my bio right now"
"Everything you need to know including the link is waiting for you in my bio"
"I have left all the details in my bio — go check it out and thank me later"
"Head to my bio for the link — I promise it is worth the click"

Strong CTA — urgent, benefit-driven and impossible to ignore:
"Use my code [CODE] at checkout for 10% off — link in my bio and it expires soon"
"My exclusive discount is in my bio right now — grab it before it disappears"
"The deal I negotiated for you is in my bio — link is live right now go go go"
"Bio link is live — use code [CODE] and get yours before stock runs out again"

Rules for every CTA:
- Must be a complete sentence that makes total sense on its own
- Must feel like the creator is talking TO the viewer not AT them
- Must have energy — use dashes, natural pauses and conversational language
- Must tell the viewer exactly what to do AND what they will get by doing it
- Never end flat — end with momentum, urgency or warmth
- Maximum 20 words
- Always specific to the product being featured — never generic

SCRIPT LENGTH: Generate scripts that match these exact word counts based on video length:
15 second video — maximum 30 words for the full script body
30 second video — maximum 60 words for the full script body
60 second video — maximum 120 words for the full script body

Rules for every script regardless of length:
No waffle. No filler words. No slow intros.
Every sentence must earn its place — if it does not sell, educate or entertain cut it
The script body does not include the hook or CTA — those are separate
Stage directions in brackets do not count toward the word limit
Read the script out loud — if it takes longer than the target video length rewrite it shorter
Aim for short punchy sentences. Maximum 10 words per sentence.
No sentence should start with "I just wanted to" or "So basically" or "Hi guys"
Get to the point in the first sentence after the hook. Every time.

SCRIPT TONE AND AUTHENTICITY:
Make every generated script sound genuinely interesting, entertaining, relatable and human. Scripts must never sound like an advertisement. They must sound like a real person excitedly telling their best friend about something they discovered. Use natural language, contractions, personality and emotion. The viewer should feel something — curiosity, excitement, relatability or inspiration — within the first 5 seconds of the script.

Make it conversational, authentic, and optimized for ${scriptStudioVideoLength}. The body should feel natural, not salesy. Use the ${scriptStudioTone.toLowerCase()} tone throughout.

Format your response EXACTLY like this:

HOOK:
[hook text here]

BODY:
[body text here]

CTA SOFT:
[soft cta text here]

CTA MEDIUM:
[medium cta text here]

CTA STRONG:
[strong cta text here]

SCENE DIRECTION:
[scene direction here]

ESTIMATED READ TIME:
[time in seconds]`;

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      const hookMatch = responseText.match(/HOOK:\s*([\s\S]*?)(?=\n\nBODY:|$)/);
      const bodyMatch = responseText.match(/BODY:\s*([\s\S]*?)(?=\n\nCTA SOFT:|$)/);
      const ctaSoftMatch = responseText.match(/CTA SOFT:\s*([\s\S]*?)(?=\n\nCTA MEDIUM:|$)/);
      const ctaMediumMatch = responseText.match(/CTA MEDIUM:\s*([\s\S]*?)(?=\n\nCTA STRONG:|$)/);
      const ctaStrongMatch = responseText.match(/CTA STRONG:\s*([\s\S]*?)(?=\n\nSCENE DIRECTION:|$)/);
      const sceneMatch = responseText.match(/SCENE DIRECTION:\s*([\s\S]*?)(?=\n\nESTIMATED READ TIME:|$)/);
      const timeMatch = responseText.match(/ESTIMATED READ TIME:\s*([\s\S]*?)$/);

      const generatedScript = {
        hook: hookMatch ? hookMatch[1].trim() : '',
        body: bodyMatch ? bodyMatch[1].trim() : '',
        ctas: {
          soft: ctaSoftMatch ? ctaSoftMatch[1].trim() : '',
          medium: ctaMediumMatch ? ctaMediumMatch[1].trim() : '',
          strong: ctaStrongMatch ? ctaStrongMatch[1].trim() : ''
        },
        sceneDirection: sceneMatch ? sceneMatch[1].trim() : '',
        estimatedReadTime: timeMatch ? timeMatch[1].trim() : ''
      };

      setField('scriptStudioGeneratedScript', generatedScript);
      setSelectedCTA(null);
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Failed to generate script. Please check your API key and try again.');
    } finally {
      setField('scriptStudioIsGenerating', false);
    }
  };

  const copyScript = () => {
    if (!scriptStudioGeneratedScript || !selectedCTA) {
      alert('Please select a CTA first');
      return;
    }

    const fullScript = `HOOK:\n${scriptStudioGeneratedScript.hook}\n\nBODY:\n${scriptStudioGeneratedScript.body}\n\nCTA:\n${selectedCTA}\n\nSCENE DIRECTION:\n${scriptStudioGeneratedScript.sceneDirection}\n\nESTIMATED READ TIME:\n${scriptStudioGeneratedScript.estimatedReadTime}`;

    navigator.clipboard.writeText(fullScript);
    setShowCopiedFeedback(true);
    setTimeout(() => setShowCopiedFeedback(false), 2000);
  };

  const handleCopyCTA = () => {
    if (!selectedCTA) return;
    navigator.clipboard.writeText(selectedCTA);
    setCopiedItem('selected-cta');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const saveScript = () => {
    if (!scriptStudioGeneratedScript) return;

    const savedScript = {
      id: Date.now().toString(),
      brandName: scriptStudioBrandName,
      productName: scriptStudioProductName,
      format: scriptStudioFormat,
      hook: scriptStudioGeneratedScript.hook,
      body: scriptStudioGeneratedScript.body,
      ctas: scriptStudioGeneratedScript.ctas,
      sceneDirection: scriptStudioGeneratedScript.sceneDirection,
      estimatedReadTime: scriptStudioGeneratedScript.estimatedReadTime,
      savedAt: new Date().toISOString()
    };

    setField('scriptStudioSavedScripts', [...scriptStudioSavedScripts, savedScript]);
  };

  const deleteSavedScript = (id: string) => {
    const updated = scriptStudioSavedScripts.filter(script => script.id !== id);
    setField('scriptStudioSavedScripts', updated);
  };

  const loadSavedScript = (script: typeof scriptStudioSavedScripts[0]) => {
    setField('scriptStudioGeneratedScript', {
      hook: script.hook,
      body: script.body,
      ctas: script.ctas,
      sceneDirection: script.sceneDirection,
      estimatedReadTime: script.estimatedReadTime
    });
    setSelectedCTA(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Brand Deal Script Studio
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '16px' }}>
        For when brands hire you. Generate scripts for paid brand deals — whether the brand gives you a brief or gives you full creative freedom.
      </p>

      <div
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '32px',
          fontSize: '13px',
          color: '#d0c9e0',
          lineHeight: '1.6',
        }}
      >
        <strong style={{ color: '#e8c96a' }}>Note:</strong> Some brands will send you a full script to deliver. Others will give you creative freedom. This studio handles both.
      </div>

      <BriefUploader
        onBriefExtracted={(brief) => setUploadedBrief(brief)}
        onBriefCleared={() => setUploadedBrief(null)}
      />

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setHasCreativeFreedom(true)}
            style={{
              flex: 1,
              padding: '14px 24px',
              background: hasCreativeFreedom ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
              border: hasCreativeFreedom ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              color: hasCreativeFreedom ? '#0a0610' : '#9b8fb5',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            I have creative freedom
          </button>
          <button
            onClick={() => setHasCreativeFreedom(false)}
            style={{
              flex: 1,
              padding: '14px 24px',
              background: !hasCreativeFreedom ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
              border: !hasCreativeFreedom ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              color: !hasCreativeFreedom ? '#0a0610' : '#9b8fb5',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Brand gave me a brief
          </button>
        </div>

        {!hasCreativeFreedom && (
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
              Paste the Brand's Brief
            </h3>
            <p style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '12px', fontStyle: 'italic' }}>
              Paste the requirements, guidelines, or script the brand sent you. The AI will adapt it to sound natural.
            </p>
            <textarea
              value={brandBrief}
              onChange={(e) => setBrandBrief(e.target.value)}
              placeholder="Paste the brand's brief here..."
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
        )}
      </div>

      {/* Section 1: Brand Brief Input */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Brand Brief
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Fill in the details about the brand and product you're creating content for
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
              Brand Name *
            </label>
            <input
              type="text"
              value={scriptStudioBrandName}
              onChange={(e) => setField('scriptStudioBrandName', e.target.value)}
              placeholder="e.g., Glossier"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
              Product Name *
            </label>
            <input
              type="text"
              value={scriptStudioProductName}
              onChange={(e) => setField('scriptStudioProductName', e.target.value)}
              placeholder="e.g., Cloud Paint Blush"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
            Key Benefit to Highlight *
          </label>
          <input
            type="text"
            value={scriptStudioKeyBenefit}
            onChange={(e) => setField('scriptStudioKeyBenefit', e.target.value)}
            placeholder="e.g., Buildable, natural-looking color that lasts all day"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
            Target Audience *
          </label>
          <input
            type="text"
            value={scriptStudioTargetAudience}
            onChange={(e) => setField('scriptStudioTargetAudience', e.target.value)}
            placeholder="e.g., Women 25-35 who love clean beauty"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
              Tone
            </label>
            <select
              value={scriptStudioTone}
              onChange={(e) => setField('scriptStudioTone', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            >
              {toneOptions.map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9a84c', marginBottom: '8px', fontWeight: 600 }}>
              Video Length
            </label>
            <select
              value={scriptStudioVideoLength}
              onChange={(e) => setField('scriptStudioVideoLength', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            >
              {videoLengthOptions.map((length) => (
                <option key={length} value={length}>{length}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Script Format Selector */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Choose Your Script Format *
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Select the structure that best fits your content style
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {scriptFormats.map((format) => (
            <div
              key={format.id}
              onClick={() => setField('scriptStudioFormat', format.id)}
              style={{
                background: scriptStudioFormat === format.id ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                border: scriptStudioFormat === format.id ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                if (scriptStudioFormat !== format.id) {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (scriptStudioFormat !== format.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              {format.icon && <div style={{ fontSize: '32px', marginBottom: '12px' }}>{format.icon}</div>}
              <div style={{ fontSize: '16px', fontWeight: 700, color: scriptStudioFormat === format.id ? '#e8c96a' : '#f0ebff', marginBottom: '8px' }}>
                {format.name}
              </div>
              <div style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.5 }}>
                {format.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Generate Button */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <button
          onClick={generateScript}
          disabled={!canGenerate || scriptStudioIsGenerating}
          style={{
            padding: '18px 48px',
            background: canGenerate && !scriptStudioIsGenerating
              ? 'linear-gradient(135deg, #c9a84c, #8B6914)'
              : 'rgba(201,168,76,0.3)',
            color: canGenerate && !scriptStudioIsGenerating ? '#0a0610' : '#6c6c8e',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 700,
            cursor: canGenerate && !scriptStudioIsGenerating ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: canGenerate && !scriptStudioIsGenerating ? '0 4px 16px rgba(201,168,76,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          <Sparkles size={20} />
          {scriptStudioIsGenerating ? 'Generating Script...' : 'Generate My UGC Script →'}
        </button>
        {!canGenerate && (
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#ff6b6b' }}>
            Please fill in all required fields and select a script format
          </div>
        )}
      </div>

      {/* Section 4: Script Output */}
      {scriptStudioGeneratedScript && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
            border: '2px solid #c9a84c',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            position: 'relative',
          }}
        >
          {showCopiedFeedback && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#38d39f',
                color: '#0a0610',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                zIndex: 10,
              }}
            >
              Copied to clipboard!
            </div>
          )}

          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#f0ebff',
              marginBottom: '24px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            Your Generated Script
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}
              >
                Hook (First 3 Seconds)
              </div>
              <div
                style={{
                  background: 'rgba(10,6,16,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#f0ebff',
                  fontSize: '14px',
                  lineHeight: 1.7,
                }}
              >
                {scriptStudioGeneratedScript.hook}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}
              >
                Body
              </div>
              <div
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '13px', color: '#e8c96a', fontWeight: 600 }}>
                  Word Count: {countWords(scriptStudioGeneratedScript.body)} / {getTargetWordCount(scriptStudioVideoLength)}
                </span>
                <span style={{ fontSize: '12px', color: '#9b8fb5' }}>
                  {countWords(scriptStudioGeneratedScript.body) <= getTargetWordCount(scriptStudioVideoLength) ? 'On target' : 'Over limit'}
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(10,6,16,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#f0ebff',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {scriptStudioGeneratedScript.body}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}
              >
                Call To Action
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#c9a84c', marginBottom: '16px' }}>
                Pick ONE that feels right for this video
              </p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
                {Object.entries(scriptStudioGeneratedScript.ctas).map(([type, cta]) => {
                  const isSelected = selectedCTA === cta;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedCTA(cta)}
                      style={{
                        background: isSelected ? 'rgba(201,168,76,0.2)' : 'rgba(10,6,16,0.6)',
                        border: `2px solid ${isSelected ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        opacity: selectedCTA && !isSelected ? 0.4 : 1,
                        position: 'relative' as const,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#9b8fb5', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                            {type}
                          </div>
                          <div style={{ fontSize: '14px', color: '#f0ebff', lineHeight: '1.5' }}>{cta}</div>
                        </div>
                        {isSelected && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedCTA && (
                <button
                  onClick={handleCopyCTA}
                  style={{
                    padding: '12px 24px',
                    background: copiedItem === 'selected-cta' ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #c9a84c, #8B6914)',
                    border: copiedItem === 'selected-cta' ? '1px solid #22c55e' : 'none',
                    borderRadius: '100px',
                    color: copiedItem === 'selected-cta' ? '#22c55e' : '#0a0610',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
                    transition: 'all 0.2s',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  {copiedItem === 'selected-cta' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      CTA Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      CTA Selected — Copy It
                    </>
                  )}
                </button>
              )}
            </div>

            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}
              >
                Scene Direction
              </div>
              <div
                style={{
                  background: 'rgba(10,6,16,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#d4cee8',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}
              >
                {scriptStudioGeneratedScript.sceneDirection}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(201,168,76,0.2)',
                border: '1px solid #c9a84c',
                borderRadius: '8px',
                padding: '12px 16px',
                width: 'fit-content',
              }}
            >
              <Clock size={16} color="#c9a84c" />
              <div style={{ fontSize: '13px', color: '#e8c96a', fontWeight: 600 }}>
                Estimated Read Time: {scriptStudioGeneratedScript.estimatedReadTime}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={copyScript}
              style={{
                padding: '12px 24px',
                background: '#c9a84c',
                color: '#0a0610',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Copy size={16} />
              Copy Script
            </button>

            <button
              onClick={generateScript}
              disabled={scriptStudioIsGenerating}
              style={{
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.1)',
                color: '#f0ebff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: scriptStudioIsGenerating ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <RotateCcw size={16} />
              Regenerate
            </button>

            <button
              onClick={saveScript}
              style={{
                padding: '12px 24px',
                background: 'rgba(56,211,159,0.2)',
                color: '#38d39f',
                border: '1px solid rgba(56,211,159,0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Save size={16} />
              Save to Pack
            </button>
          </div>
        </div>
      )}

      {scriptStudioGeneratedScript && uploadedBrief && (
        <BriefRequirementsChecklist brief={uploadedBrief} />
      )}

      {/* Saved Scripts Section */}
      {scriptStudioSavedScripts.length > 0 && (
        <div
          style={{
            background: '#1c1a35',
            border: '1.5px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#f0ebff',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            Saved Scripts
          </h2>
          <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
            Your library of generated UGC scripts
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {scriptStudioSavedScripts.map((script) => {
              const formatObj = scriptFormats.find(f => f.id === script.format);
              return (
                <div
                  key={script.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0ebff', marginBottom: '4px' }}>
                        {script.brandName} - {script.productName}
                      </div>
                      <div style={{ fontSize: '13px', color: '#9b8fb5' }}>
                        {formatObj?.name} • Saved {new Date(script.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSavedScript(script.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ff6b6b',
                        padding: '4px',
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div
                    style={{
                      fontSize: '14px',
                      color: '#d4cee8',
                      marginBottom: '12px',
                      padding: '12px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #c9a84c',
                    }}
                  >
                    {script.hook}
                  </div>

                  <button
                    onClick={() => loadSavedScript(script)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(201,168,76,0.15)',
                      color: '#c9a84c',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    View Full Script
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
