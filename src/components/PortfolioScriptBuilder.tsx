import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Sparkles, Copy, RotateCcw, Save, CheckCircle2, Info } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  'Skincare & Beauty',
  'Health & Wellness',
  'Food & Drink',
  'Fitness & Supplements',
  'Home & Lifestyle',
  'Tech & Gadgets',
  'Fashion & Clothing',
  'Baby & Family',
  'Faith & Spiritual',
  'General/Any Product',
  'Pet Care',
  'Travel & Adventure',
];

const FACE_FORWARD_TYPES = [
  'Unboxing & First Reaction',
  'Honest Review',
  'Tutorial & How-To',
  'Before & After',
  'Get Ready With Me',
  'Lifestyle Showcase',
  'Testimonial Style',
  'Mini Commercial',
  'Day In My Life',
  'Comparison Video',
  'Problem & Solution',
  'Story Time',
];

const FACELESS_TYPES = [
  'Voiceover Ad',
  'Text on Screen',
];

const CONTENT_STYLES = [
  'Authentic & Raw',
  'Fun & Energetic',
  'Educational',
  'Inspirational',
  'Aesthetic & Visual',
  'Conversational & Chatty',
  'Empowering & Bold',
  'Calm & Trustworthy',
];

const VIDEO_LENGTHS = [
  '15 seconds',
  '30 seconds',
  '60 seconds',
];

interface PortfolioScript {
  id: string;
  category: string;
  product: string;
  videoType: string;
  style: string;
  videoLength: string;
  isFaceForward: boolean;
  hooks: string[];
  script: string;
  ctas: { soft: string; medium: string; strong: string };
  checklist: string[];
  confidenceNote: string;
  date: string;
  completed: boolean;
}

const getEditingTip = (videoType: string, isFaceForward: boolean): string => {
  const tips: Record<string, string> = {
    'Unboxing & First Reaction': 'In CapCut, cut between each item reveal — do not film one long take. Add a zoom effect when revealing the hero product using the keyframe feature. Use text overlay at the start: the product name and your first reaction word.',
    'Honest Review': 'In CapCut, cut out any pauses longer than half a second. Add captions using Auto Captions — reviews live and die by how clear the message is. Use a clean minimal filter — you want the focus on your face not the edit.',
    'Tutorial & How-To': 'In CapCut, use text overlays to number each step: Step 1, Step 2 etc. Speed up any waiting time during application using the Speed feature. Add a before and after side by side at the end using the split screen feature.',
    'Before & After': 'In CapCut, use the split screen feature to show before and after side by side. Add a transition between the before and after sections. Text overlay: "Before" on the left and "After" on the right.',
    'Get Ready With Me': 'In CapCut, use the speed feature to speed up the getting ready sections between talking to camera moments. Add trending audio as background music. Add text overlays for each product you feature.',
    'Mini Commercial': 'In CapCut, use the keyframe feature to create smooth zoom effects on the product. Match every cut to the beat of your background music. Colour grade more intentionally — mini commercials benefit from a stronger visual style.',
    'Voiceover Ad': 'In CapCut, record your voiceover using the Voiceover feature under Audio. Match your product shots to the rhythm of your voiceover — cut on the beat. Use text overlays to reinforce every key point you say.',
    'Text on Screen': 'In CapCut, use the Text Animate feature to make each line appear with a clean fade or typewriter effect. Time each text line to stay on screen for at least 2 seconds. Use a consistent font throughout — do not mix font styles. Add subtle background music at 10% volume.',
  };

  if (!isFaceForward && videoType === 'Text on Screen') {
    return tips['Text on Screen'];
  }
  if (!isFaceForward && videoType === 'Voiceover Ad') {
    return tips['Voiceover Ad'];
  }

  return tips[videoType] || 'In CapCut, trim all dead air, add auto captions for accessibility, and include subtle background music at 10-15% volume. Export in 1080p vertical format (9:16) without watermark.';
};

const countWords = (text: string): number => {
  return text
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
};

export default function PortfolioScriptBuilder() {
  const store = useCampaignStore();
  const {
    portfolioScriptCategory,
    portfolioScriptProduct,
    portfolioScriptVideoType,
    portfolioScriptStyle,
    portfolioScriptVideoLength,
    portfolioScripts,
    introCreatorName,
    introContentNiche,
    introContentStyle,
    introWhatMakesDifferent,
    ugcNiche,
    setField,
  } = store;

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<PortfolioScript | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedCTA, setSelectedCTA] = useState<string | null>(null);
  const [showIntroductionForm, setShowIntroductionForm] = useState(false);
  const [showPitchForm, setShowPitchForm] = useState(false);
  const [pitchBrand, setPitchBrand] = useState('');
  const [pitchOffer, setPitchOffer] = useState('');
  const [pitchFit, setPitchFit] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const isIntroduction = portfolioScriptVideoType === '🎬 Creator Introduction';
  const isPitch = portfolioScriptVideoType === 'Pitch Video';

  const handleGenerate = async () => {
    if (isIntroduction) {
      if (!introCreatorName || !introContentNiche || !introContentStyle || !introWhatMakesDifferent) {
        alert('Please fill in all fields before generating a script');
        return;
      }
    } else if (isPitch) {
      if (!pitchBrand || !pitchOffer || !pitchFit) {
        alert('Please fill in all fields before generating a script');
        return;
      }
    } else {
      if (!portfolioScriptCategory || !portfolioScriptProduct || !portfolioScriptVideoType || !portfolioScriptStyle || !portfolioScriptVideoLength) {
        alert('Please fill in all fields before generating a script');
        return;
      }
    }

    setIsGenerating(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-portfolio-script`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: isIntroduction ? 'Creator Introduction' : isPitch ? 'Pitch Video' : portfolioScriptCategory,
          product: isIntroduction ? 'N/A' : isPitch ? pitchBrand : portfolioScriptProduct,
          videoType: portfolioScriptVideoType,
          style: isIntroduction ? introContentStyle : portfolioScriptStyle,
          videoLength: isIntroduction ? '30-60 seconds' : isPitch ? '15-30 seconds' : portfolioScriptVideoLength,
          isIntroduction,
          isPitch,
          creatorName: isIntroduction ? introCreatorName : undefined,
          contentNiche: isIntroduction ? introContentNiche : undefined,
          contentStyle: isIntroduction ? introContentStyle : undefined,
          whatMakesDifferent: isIntroduction ? introWhatMakesDifferent : undefined,
          pitchBrand: isPitch ? pitchBrand : undefined,
          pitchOffer: isPitch ? pitchOffer : undefined,
          pitchFit: isPitch ? pitchFit : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();

      const newScript: PortfolioScript = {
        id: Date.now().toString(),
        category: portfolioScriptCategory,
        product: portfolioScriptProduct,
        videoType: portfolioScriptVideoType,
        style: portfolioScriptStyle,
        videoLength: portfolioScriptVideoLength,
        isFaceForward: !FACELESS_TYPES.includes(portfolioScriptVideoType),
        hooks: data.hooks || [],
        script: data.script || '',
        ctas: data.ctas || { soft: '', medium: '', strong: '' },
        checklist: data.checklist || [],
        confidenceNote: data.confidenceNote || '',
        date: new Date().toLocaleDateString(),
        completed: false,
      };

      setGeneratedScript(newScript);
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Failed to generate script. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveScript = () => {
    if (!generatedScript) return;

    const updatedScripts = [...(portfolioScripts || []), generatedScript];
    setField('portfolioScripts', updatedScripts);
    alert('Script saved to your library!');
  };

  const handleMarkComplete = () => {
    if (!generatedScript) return;

    const updatedScript = { ...generatedScript, completed: true };
    const updatedScripts = [...(portfolioScripts || []), updatedScript];
    setField('portfolioScripts', updatedScripts);
    setField('portfolioVideosTabState', 'my-videos');
  };

  const handleRegenerate = () => {
    setGeneratedScript(null);
    setSelectedCTA(null);
    handleGenerate();
  };

  const handleCopyCTA = () => {
    if (!selectedCTA) return;
    navigator.clipboard.writeText(selectedCTA);
    setCopiedItem('selected-cta');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const savedScriptsCount = (portfolioScripts || []).length;

  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
          border: '2px solid rgba(201,168,76,0.3)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <Info size={24} style={{ color: '#c9a84c', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
            ✍️ Write Your Script First — Then Film
          </div>
          <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', margin: 0 }}>
            Before you pick up your phone you need to know exactly what to say. Use this script builder to generate your word-for-word portfolio script, hooks, CTAs and filming checklist. Then switch to the My Videos tab to upload your finished content.
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        {!showIntroductionForm && !showPitchForm && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '16px' }}>
              Section 1 — Pick a Product Category
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '32px' }}>
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setField('portfolioScriptCategory', category)}
                  style={{
                    padding: '10px 20px',
                    background: portfolioScriptCategory === category ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${portfolioScriptCategory === category ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '100px',
                    color: portfolioScriptCategory === category ? '#0a0610' : '#d0c9e0',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
              Section 2 — Tell us about your practice product
            </h3>
            <p style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '12px', fontStyle: 'italic' }}>
              You do not need to buy anything new. Use products you already have at home. Brands want to see how you present ANY product — not a specific one.
            </p>
            <input
              type="text"
              value={portfolioScriptProduct || ''}
              onChange={(e) => setField('portfolioScriptProduct', e.target.value)}
              placeholder="e.g. my moisturiser, a water bottle I use, my protein powder, a kitchen gadget I own"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
                marginBottom: '32px',
              }}
            />
          </>
        )}

        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '16px' }}>
          Section 3 — What type of portfolio video are you filming?
        </h3>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '16px' }}>
            📍 You are in the right place
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a' }}>
                  🎬 Creator Introduction Video
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#c9a84c',
                    background: 'rgba(201,168,76,0.15)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  Portfolio Anchor
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#d0c9e0', marginBottom: '12px', lineHeight: '1.5' }}>
                This lives in your portfolio. Brands watch it when they open your portfolio link. It is your professional first impression.
              </div>
              <ul style={{ fontSize: '11px', color: '#9b8fb5', margin: '0 0 16px 0', paddingLeft: '16px', lineHeight: '1.6' }}>
                <li>Length: 30-60 seconds</li>
                <li>Audience: Brands already reviewing your portfolio</li>
                <li>Tone: Confident, warm and professional</li>
                <li>Goal: Make the brand feel like they already know and trust you</li>
              </ul>
              <button
                onClick={() => {
                  setShowIntroductionForm(!showIntroductionForm);
                  setShowPitchForm(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3d 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0a0610',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={16} />
                Generate My Introduction Script →
              </button>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a' }}>
                  📨 Pitch Video
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#c9a84c',
                    background: 'rgba(201,168,76,0.15)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  Outreach Tool
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#d0c9e0', marginBottom: '12px', lineHeight: '1.5' }}>
                This goes inside your cold outreach messages. Brands watch it before they visit your portfolio. It is your door opener.
              </div>
              <ul style={{ fontSize: '11px', color: '#9b8fb5', margin: '0 0 16px 0', paddingLeft: '16px', lineHeight: '1.6' }}>
                <li>Length: 15-30 seconds maximum</li>
                <li>Audience: Brands who do not know you yet</li>
                <li>Tone: Direct, punchy and impossible to ignore</li>
                <li>Goal: Get the brand to click your portfolio link</li>
              </ul>
              <button
                onClick={() => {
                  setShowPitchForm(!showPitchForm);
                  setShowIntroductionForm(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: '2px solid rgba(201,168,76,0.5)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={16} />
                Generate My Pitch Script →
              </button>
            </div>
          </div>
        </div>

        {showIntroductionForm && (
          <div
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '2px solid rgba(201,168,76,0.3)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '16px' }}>
              Creator Introduction — Tell us about yourself
            </h4>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                Your name or creator name
              </label>
              <input
                type="text"
                value={introCreatorName}
                onChange={(e) => setField('introCreatorName', e.target.value)}
                placeholder="e.g., Sarah or @sarahscreates"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                Your content niche
              </label>
              <input
                type="text"
                value={introContentNiche || ugcNiche}
                onChange={(e) => setField('introContentNiche', e.target.value)}
                placeholder="e.g., Skincare, Fitness, Lifestyle"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                Your content style
              </label>
              <input
                type="text"
                value={introContentStyle || portfolioScriptStyle}
                onChange={(e) => setField('introContentStyle', e.target.value)}
                placeholder="e.g., Authentic & Raw, Fun & Energetic"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                What makes you different
              </label>
              <textarea
                value={introWhatMakesDifferent}
                onChange={(e) => setField('introWhatMakesDifferent', e.target.value)}
                placeholder="e.g., I bring an authentic voice that resonates with millennial women who value honest product reviews"
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              onClick={() => {
                setField('portfolioScriptVideoType', '🎬 Creator Introduction');
                handleGenerate();
              }}
              disabled={!introCreatorName || !introContentNiche || !introContentStyle || !introWhatMakesDifferent || isGenerating}
              style={{
                width: '100%',
                padding: '12px',
                background: (!introCreatorName || !introContentNiche || !introContentStyle || !introWhatMakesDifferent || isGenerating)
                  ? 'rgba(201,168,76,0.3)'
                  : 'linear-gradient(135deg, #c9a84c 0%, #a88a3d 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#0a0610',
                fontSize: '14px',
                fontWeight: 700,
                cursor: (!introCreatorName || !introContentNiche || !introContentStyle || !introWhatMakesDifferent || isGenerating) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={16} />
              {isGenerating ? 'Generating...' : 'Write My Introduction Script →'}
            </button>
          </div>
        )}

        {showPitchForm && (
          <div
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '2px solid rgba(201,168,76,0.3)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '16px' }}>
              Pitch Video — Tell us about this opportunity
            </h4>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                Brand you are pitching to
              </label>
              <input
                type="text"
                value={pitchBrand}
                onChange={(e) => setPitchBrand(e.target.value)}
                placeholder="e.g., Glossier, Nike, HelloFresh"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                What you want to create for them
              </label>
              <input
                type="text"
                value={pitchOffer}
                onChange={(e) => setPitchOffer(e.target.value)}
                placeholder="e.g., 3 Instagram Reels showcasing your new serum line"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                Why you are a good fit for this brand
              </label>
              <textarea
                value={pitchFit}
                onChange={(e) => setPitchFit(e.target.value)}
                placeholder="e.g., I create authentic skincare content for women 25-35 and my audience matches your target demographic perfectly"
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              onClick={() => {
                setField('portfolioScriptVideoType', 'Pitch Video');
                setField('portfolioScriptProduct', pitchBrand);
                handleGenerate();
              }}
              disabled={!pitchBrand || !pitchOffer || !pitchFit || isGenerating}
              style={{
                width: '100%',
                padding: '12px',
                background: (!pitchBrand || !pitchOffer || !pitchFit || isGenerating)
                  ? 'rgba(201,168,76,0.3)'
                  : 'linear-gradient(135deg, #c9a84c 0%, #a88a3d 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#0a0610',
                fontSize: '14px',
                fontWeight: 700,
                cursor: (!pitchBrand || !pitchOffer || !pitchFit || isGenerating) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={16} />
              {isGenerating ? 'Generating...' : 'Write My Pitch Script →'}
            </button>
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#9b8fb5',
            margin: '24px 0',
            fontStyle: 'italic',
          }}
        >
          — or choose a video type below to generate a portfolio script —
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🎥 Face Forward — you appear on camera
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '24px' }}>
            {FACE_FORWARD_TYPES.map((type) => {
              const isSelected = portfolioScriptVideoType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setField('portfolioScriptVideoType', type);
                    setShowIntroductionForm(false);
                    setShowPitchForm(false);
                  }}
                  style={{
                    padding: '10px 20px',
                    background: isSelected ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${isSelected ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '100px',
                    color: isSelected ? '#0a0610' : '#d0c9e0',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🎭 Faceless — your face never appears on camera
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '12px' }}>
            {FACELESS_TYPES.map((type) => {
              const isSelected = portfolioScriptVideoType === type;
              return (
                <button
                  key={type}
                  onClick={() => setField('portfolioScriptVideoType', type)}
                  style={{
                    padding: '10px 20px',
                    background: isSelected ? 'rgba(155,143,181,0.25)' : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${isSelected ? '#9b8fb5' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '100px',
                    color: isSelected ? '#f0ebff' : '#d0c9e0',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic', lineHeight: '1.5' }}>
            Faceless content is perfect if you are camera shy or just starting out. Your voice or text tells the story — your face never appears.
          </p>
        </div>

        {!showIntroductionForm && !showPitchForm && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '16px' }}>
              Section 4 — Your Content Style
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '32px' }}>
              {CONTENT_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setField('portfolioScriptStyle', style)}
                  style={{
                    padding: '10px 20px',
                    background: portfolioScriptStyle === style ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${portfolioScriptStyle === style ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '100px',
                    color: portfolioScriptStyle === style ? '#0a0610' : '#d0c9e0',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  {style}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '16px' }}>
              Section 5 — Video Length
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', marginBottom: '32px' }}>
              {VIDEO_LENGTHS.map((length) => (
                <button
                  key={length}
                  onClick={() => setField('portfolioScriptVideoLength', length)}
                  style={{
                    padding: '10px 20px',
                    background: portfolioScriptVideoLength === length ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${portfolioScriptVideoLength === length ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '100px',
                    color: portfolioScriptVideoLength === length ? '#0a0610' : '#d0c9e0',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  {length}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {portfolioScriptVideoType && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#c9a84c',
                    width: 'fit-content',
                  }}
                >
                  {FACELESS_TYPES.includes(portfolioScriptVideoType) ? '🎭 Faceless Script' : '🎥 Face Forward Script'}
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  !portfolioScriptCategory || !portfolioScriptProduct || !portfolioScriptVideoType || !portfolioScriptStyle || !portfolioScriptVideoLength
                }
            style={{
              padding: '14px 32px',
              background: isGenerating ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              transition: 'all 0.2s',
            }}
          >
            <Sparkles size={18} />
            {isGenerating ? 'Generating...' : '✨ Write My Portfolio Script →'}
          </button>
        </div>
          </>
        )}
      </div>

      {generatedScript && (
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#e8c96a', marginBottom: '24px' }}>
            Your Portfolio Script
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f0ebff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Your Hook Options
            </h4>
            {generatedScript.hooks.map((hook, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '14px', color: '#d0c9e0', flex: 1 }}>{hook}</span>
                <button
                  onClick={() => handleCopy(hook, `hook-${idx}`)}
                  style={{
                    padding: '6px 12px',
                    background: copiedItem === `hook-${idx}` ? 'rgba(34,197,94,0.2)' : 'transparent',
                    border: `1px solid ${copiedItem === `hook-${idx}` ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '6px',
                    color: copiedItem === `hook-${idx}` ? '#22c55e' : '#9b8fb5',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedItem === `hook-${idx}` ? <><CheckCircle2 size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f0ebff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Your Full Script
              </h4>
              <button
                onClick={() => handleCopy(generatedScript.script, 'script')}
                style={{
                  padding: '6px 12px',
                  background: copiedItem === 'script' ? 'rgba(34,197,94,0.2)' : 'transparent',
                  border: `1px solid ${copiedItem === 'script' ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '6px',
                  color: copiedItem === 'script' ? '#22c55e' : '#9b8fb5',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {copiedItem === 'script' ? <><CheckCircle2 size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
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
                Word Count: {countWords(generatedScript.script)}
              </span>
              <span style={{ fontSize: '12px', color: '#9b8fb5' }}>
                Target: 30-60 words for portfolio scripts
              </span>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                color: '#d0c9e0',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{
                __html: generatedScript.script.replace(/\[(.*?)\]/g, '<span style="color: #c9a84c; font-style: italic;">[$1]</span>'),
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Your CTA Options
            </h4>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#c9a84c', marginBottom: '16px' }}>
              👇 Pick ONE that feels right for this video
            </p>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
              {Object.entries(generatedScript.ctas).map(([type, cta]) => {
                const isSelected = selectedCTA === cta;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedCTA(cta)}
                    style={{
                      background: isSelected ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.03)',
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
                        <div style={{ fontSize: '14px', color: '#d0c9e0', lineHeight: '1.5' }}>{cta}</div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={20} style={{ color: '#c9a84c', flexShrink: 0 }} />
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
                    <CheckCircle2 size={16} />
                    CTA Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    ✓ CTA Selected — Copy It →
                  </>
                )}
              </button>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f0ebff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Your Filming Checklist
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {generatedScript.checklist.map((item, idx) => (
                <li key={idx} style={{ fontSize: '14px', color: '#d0c9e0', marginBottom: '8px', lineHeight: '1.6' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#a78bfa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✂️ Editing Tip for this video type:
            </h4>
            <p style={{ fontSize: '14px', color: '#d0c9e0', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
              {getEditingTip(generatedScript.videoType, generatedScript.isFaceForward)}
            </p>
          </div>

          <div
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Your Confidence Note
            </h4>
            <p style={{ fontSize: '14px', color: '#d0c9e0', lineHeight: '1.6', margin: 0 }}>
              {generatedScript.confidenceNote}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleRegenerate}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                color: '#9b8fb5',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              <RotateCcw size={16} />
              Regenerate
            </button>
            <button
              onClick={handleSaveScript}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '100px',
                color: '#c9a84c',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              <Save size={16} />
              Save This Script
            </button>
            <button
              onClick={handleMarkComplete}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                border: 'none',
                borderRadius: '100px',
                color: '#0a0610',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
                transition: 'all 0.2s',
              }}
            >
              <CheckCircle2 size={16} />
              I Filmed This! →
            </button>
          </div>
        </div>
      )}

      {savedScriptsCount > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
              Your Script Library
            </h3>
            <div
              style={{
                padding: '8px 16px',
                background: savedScriptsCount >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.15)',
                border: `1px solid ${savedScriptsCount >= 5 ? 'rgba(34,197,94,0.3)' : 'rgba(201,168,76,0.3)'}`,
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                color: savedScriptsCount >= 5 ? '#22c55e' : '#c9a84c',
              }}
            >
              Scripts saved: {savedScriptsCount} — aim for at least 5
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {(portfolioScripts || []).map((script) => (
              <div
                key={script.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '4px' }}>{script.category}</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>{script.videoType}</div>
                <div style={{ fontSize: '12px', color: '#c9a84c', marginBottom: '8px' }}>{script.date}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      background: script.isFaceForward ? 'rgba(201,168,76,0.15)' : 'rgba(124,92,191,0.15)',
                      border: `1px solid ${script.isFaceForward ? 'rgba(201,168,76,0.3)' : 'rgba(124,92,191,0.3)'}`,
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: script.isFaceForward ? '#c9a84c' : '#7c5cbf',
                    }}
                  >
                    {script.isFaceForward ? '🎥 Face Forward' : '🎭 Faceless'}
                  </div>
                  {script.completed && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        background: 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        borderRadius: '100px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#22c55e',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      Filmed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
