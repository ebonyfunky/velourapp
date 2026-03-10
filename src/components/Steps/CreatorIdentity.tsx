import { useState } from 'react';
import { useCampaignStore } from '../../store/campaignStore';
import Anthropic from '@anthropic-ai/sdk';

interface CreatorIdentityProps {
  onNext: () => void;
  onBack: () => void;
}

const personaOptions = [
  { id: 'teacher', title: 'The Teacher', description: 'You educate and break things down simply' },
  { id: 'friend', title: 'The Friend', description: 'You share your journey like talking to a bestie' },
  { id: 'coach', title: 'The Coach', description: 'You push people to take action' },
  { id: 'expert', title: 'The Expert', description: 'You lead with authority and results' },
  { id: 'storyteller', title: 'The Storyteller', description: 'You connect through real personal stories' },
  { id: 'rebel', title: 'The Rebel', description: 'You challenge the mainstream and speak hard truths' },
];

const styleOptions = [
  { id: 'natural', title: 'Natural and Authentic', description: 'Real, raw, unfiltered' },
  { id: 'bold', title: 'Bold and Confident', description: 'Strong opinions, strong presence' },
  { id: 'minimal', title: 'Minimal and Clean', description: 'Simple, clear, focused' },
  { id: 'luxury', title: 'Luxury and Premium', description: 'Elevated, aspirational, polished' },
  { id: 'casual', title: 'Casual and Relatable', description: 'Everyday, human, and warm' },
  { id: 'power', title: 'Power and Authority', description: 'Commanding, credible, results-focused' },
];

export default function CreatorIdentity({ onNext, onBack }: CreatorIdentityProps) {
  const { setField } = useCampaignStore();

  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [niche, setNiche] = useState('');
  const [storyPart1, setStoryPart1] = useState('');
  const [storyPart2, setStoryPart2] = useState('');
  const [storyPart3, setStoryPart3] = useState('');
  const [identityCard, setIdentityCard] = useState<{
    statement: string;
    voice: string;
    audience: string;
    themes: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const storyPreview = storyPart1 && storyPart2 && storyPart3
    ? `I used to ${storyPart1} until I ${storyPart2}. Now I show ${storyPart3}.`
    : '';

  const canGenerate = selectedPersona && selectedStyle && niche && storyPart1 && storyPart2 && storyPart3;
  const canProceed = canGenerate && identityCard;

  const generateIdentityCard = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        alert('Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
        setIsGenerating(false);
        return;
      }

      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const persona = personaOptions.find(p => p.id === selectedPersona);
      const style = styleOptions.find(s => s.id === selectedStyle);

      const prompt = `You are a creator identity strategist. Based on the following creator inputs, generate a powerful Creator Identity Card.

Persona: ${persona?.title} - ${persona?.description}
Content Style: ${style?.title} - ${style?.description}
Niche: ${niche}
Creator Story: I used to ${storyPart1} until I ${storyPart2}. Now I show ${storyPart3}.

Generate a Creator Identity Card with these 4 sections:

1. Identity Statement (1 powerful sentence that combines their persona, style, and mission)
2. Content Voice (2-3 sentences describing how they communicate and show up online)
3. Target Audience (1 clear sentence defining who they serve)
4. Three Content Themes (3 specific content pillars they should focus on)

Return the response in this exact JSON format:
{
  "statement": "string",
  "voice": "string",
  "audience": "string",
  "themes": ["theme1", "theme2", "theme3"]
}`;

      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type === 'text') {
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setIdentityCard(parsed);

          setField('creatorIdentityPersona', selectedPersona);
          setField('creatorIdentityStyle', selectedStyle);
          setField('creatorIdentityNiche', niche);
          setField('creatorIdentityStory', storyPreview);
          setField('creatorIdentityCard', parsed);
        }
      }
    } catch (error) {
      console.error('Error generating identity card:', error);
      alert('Failed to generate identity card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ color: 'white', fontFamily: 'Inter, sans-serif' }} className="pb-20">
      <h1 style={{ color: '#c9a84c', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
        Step 1 — Creator Identity
      </h1>
      <p style={{ color: '#9a8fa8', fontSize: '14px', marginBottom: '32px' }}>
        Build your creator brand foundation in 4 steps
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 1 — YOUR PERSONA
          </h3>
          <p style={{ color: '#9a8fa8', fontSize: '12px', marginBottom: '16px' }}>
            How do you show up as a creator?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {personaOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPersona(option.id)}
                style={{
                  padding: '16px',
                  background: selectedPersona === option.id ? 'rgba(201,168,76,0.15)' : '#1c1a35',
                  border: selectedPersona === option.id ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedPersona === option.id ? '0 0 20px rgba(201,168,76,0.3)' : 'none',
                }}
              >
                <div style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                  {option.title}
                </div>
                <div style={{ color: '#9a8fa8', fontSize: '12px' }}>
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 2 — YOUR CONTENT STYLE
          </h3>
          <p style={{ color: '#9a8fa8', fontSize: '12px', marginBottom: '16px' }}>
            What vibe do you bring to your content?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {styleOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedStyle(option.id)}
                style={{
                  padding: '16px',
                  background: selectedStyle === option.id ? 'rgba(201,168,76,0.15)' : '#1c1a35',
                  border: selectedStyle === option.id ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedStyle === option.id ? '0 0 20px rgba(201,168,76,0.3)' : 'none',
                }}
              >
                <div style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                  {option.title}
                </div>
                <div style={{ color: '#9a8fa8', fontSize: '12px' }}>
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 3 — YOUR NICHE
          </h3>
          <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '8px' }}>
            What do you create content about?
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. digital income for 9-5 professionals"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#1c1a35',
              border: '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 4 — YOUR STORY IN ONE LINE
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                I used to...
              </label>
              <input
                type="text"
                value={storyPart1}
                onChange={(e) => setStoryPart1(e.target.value)}
                placeholder="struggle with money while working full time"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                Until I...
              </label>
              <input
                type="text"
                value={storyPart2}
                onChange={(e) => setStoryPart2(e.target.value)}
                placeholder="discovered digital income"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                Now I show...
              </label>
              <input
                type="text"
                value={storyPart3}
                onChange={(e) => setStoryPart3(e.target.value)}
                placeholder="burnt-out professionals earn online"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          {storyPreview && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '8px',
            }}>
              <div style={{ color: '#9a8fa8', fontSize: '11px', marginBottom: '8px', fontWeight: 600 }}>
                PREVIEW:
              </div>
              <div style={{ color: '#c9a84c', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                {storyPreview}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 5 — GENERATE YOUR IDENTITY CARD
          </h3>
          <button
            onClick={generateIdentityCard}
            disabled={!canGenerate || isGenerating}
            style={{
              width: '100%',
              padding: '16px',
              background: canGenerate && !isGenerating ? '#c9a84c' : '#666',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '14px',
              fontWeight: 700,
              cursor: canGenerate && !isGenerating ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            {isGenerating ? 'Generating Your Identity...' : 'Generate Identity Card'}
          </button>

          {identityCard && (
            <div style={{
              marginTop: '24px',
              padding: '24px',
              background: 'rgba(201,168,76,0.08)',
              border: '2px solid #c9a84c',
              borderRadius: '12px',
              boxShadow: '0 0 30px rgba(201,168,76,0.2)',
            }}>
              <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.1em' }}>
                YOUR CREATOR IDENTITY CARD
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                  IDENTITY STATEMENT
                </div>
                <div style={{ color: '#f0ebff', fontSize: '16px', fontWeight: 700, lineHeight: '1.5' }}>
                  {identityCard.statement}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                  CONTENT VOICE
                </div>
                <div style={{ color: '#d4cce8', fontSize: '14px', lineHeight: '1.6' }}>
                  {identityCard.voice}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                  TARGET AUDIENCE
                </div>
                <div style={{ color: '#d4cce8', fontSize: '14px', lineHeight: '1.6' }}>
                  {identityCard.audience}
                </div>
              </div>

              <div>
                <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                  3 CONTENT THEMES TO FOCUS ON
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {identityCard.themes.map((theme, idx) => (
                    <div key={idx} style={{
                      padding: '10px 14px',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '6px',
                      color: '#c9a84c',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>
                      {idx + 1}. {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.15)] bg-[#1c1a35] z-[100] md:left-[240px]"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-lg font-bold border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
        >
          Back
        </button>
        <div className="w-24" />
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-3 rounded-lg font-bold border-0 transition-all next-btn-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4a4560] disabled:shadow-none bg-[#c9a84c] text-[#0d0b1a] hover:bg-[#e8c96a] shadow-[0_0_20px_rgba(201,168,76,0.25)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
