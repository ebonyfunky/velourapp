import { useState } from 'react';
import { useCampaignStore } from '../../store/campaignStore';
import Anthropic from '@anthropic-ai/sdk';

interface AudienceAvatarProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AudienceAvatar({ onNext, onBack }: AudienceAvatarProps) {
  const { setField } = useCampaignStore();

  const [oneRealPerson, setOneRealPerson] = useState('');
  const [helpPeopleWho, setHelpPeopleWho] = useState('');
  const [theyFeel, setTheyFeel] = useState('');
  const [theyWant, setTheyWant] = useState('');
  const [theyTried, setTheyTried] = useState('');
  const [biggestFear, setBiggestFear] = useState('');
  const [secretHope, setSecretHope] = useState('');
  const [innerVoice, setInnerVoice] = useState('');
  const [audienceStatement, setAudienceStatement] = useState('');
  const [generatedAvatar, setGeneratedAvatar] = useState<{
    name: string;
    age: number;
    dailyLife: string;
    emotionalTriggers: string[];
    searchWords: string[];
    contentHooks: string[];
    scrollTestQuestion: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const canGenerate = oneRealPerson && helpPeopleWho && theyFeel && theyWant && theyTried && biggestFear && secretHope && innerVoice && audienceStatement;
  const canProceed = audienceStatement.trim().length > 0;

  const generateAvatar = async () => {
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

      const prompt = `You are an audience psychology expert. Based on the following inputs about a content creator's target audience, generate a detailed audience avatar profile.

ONE REAL PERSON: ${oneRealPerson}

INNER WORLD:
- I show people who are: ${helpPeopleWho}
- They feel: ${theyFeel}
- They want: ${theyWant}
- They have tried: ${theyTried}
- Their biggest fear: ${biggestFear}
- What they secretly hope: ${secretHope}

THEIR INNER VOICE: ${innerVoice}

AUDIENCE STATEMENT: ${audienceStatement}

Generate a complete audience avatar profile with these sections:

1. Name and Age (give them a realistic name and age that fits the profile)
2. Daily Life Snapshot (2-3 sentences describing a typical day in their life)
3. Emotional Triggers (5 specific emotional triggers that make them take action)
4. Search Words (5 exact phrases they would type when searching for help)
5. Content Hooks (5 scroll-stopping hooks written in their voice that would make them stop scrolling)
6. Scroll Test Question (one powerful question this person would stop scrolling for)

Return the response in this exact JSON format:
{
  "name": "string",
  "age": number,
  "dailyLife": "string",
  "emotionalTriggers": ["trigger1", "trigger2", "trigger3", "trigger4", "trigger5"],
  "searchWords": ["phrase1", "phrase2", "phrase3", "phrase4", "phrase5"],
  "contentHooks": ["hook1", "hook2", "hook3", "hook4", "hook5"],
  "scrollTestQuestion": "string"
}`;

      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type === 'text') {
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setGeneratedAvatar(parsed);

          const fullAvatarData = {
            oneRealPerson,
            helpPeopleWho,
            theyFeel,
            theyWant,
            theyTried,
            biggestFear,
            secretHope,
            innerVoice,
            audienceStatement,
            generated: parsed,
          };

          setField('audienceAvatar', fullAvatarData);
        }
      }
    } catch (error) {
      console.error('Error generating avatar:', error);
      alert('Failed to generate avatar. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#c9a84c', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
        Step 2 — Audience Avatar
      </h1>
      <p style={{ color: '#9a8fa8', fontSize: '14px', marginBottom: '32px' }}>
        Define the one real person you create content for
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 1 — THE ONE REAL PERSON
          </h3>
          <div style={{
            padding: '20px',
            background: '#1c1a35',
            borderLeft: '4px solid #c9a84c',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            <div style={{ color: '#f0ebff', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
              Who Are You Really Talking To?
            </div>
            <div style={{ color: '#9a8fa8', fontSize: '13px', lineHeight: '1.6' }}>
              Think of one real person — someone a few steps behind where you are now. Not a crowd. One person.
            </div>
          </div>
          <div>
            <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '8px' }}>
              Describe this person in one sentence
            </label>
            <input
              type="text"
              value={oneRealPerson}
              onChange={(e) => setOneRealPerson(e.target.value)}
              placeholder="e.g. A burnt-out 9-5 mum who wants more income but has no idea where to start"
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

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 2 — DEFINE HER INNER WORLD
          </h3>
          <div style={{ color: '#9a8fa8', fontSize: '13px', marginBottom: '16px' }}>
            Complete each line honestly — this becomes the emotional core of your brand.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                I show people who are...
              </label>
              <input
                type="text"
                value={helpPeopleWho}
                onChange={(e) => setHelpPeopleWho(e.target.value)}
                placeholder="Burnt-out 9-5 professionals and parents who feel trapped"
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
                They feel...
              </label>
              <input
                type="text"
                value={theyFeel}
                onChange={(e) => setTheyFeel(e.target.value)}
                placeholder="Exhausted, frustrated, overwhelmed, guilty, mentally drained"
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
                They want...
              </label>
              <input
                type="text"
                value={theyWant}
                onChange={(e) => setTheyWant(e.target.value)}
                placeholder="Extra income, time freedom, peace of mind, more time with their kids"
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
                They have tried...
              </label>
              <input
                type="text"
                value={theyTried}
                onChange={(e) => setTheyTried(e.target.value)}
                placeholder="Budgeting harder, side hustles, free trainings, YouTube videos"
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
                Their biggest fear...
              </label>
              <input
                type="text"
                value={biggestFear}
                onChange={(e) => setBiggestFear(e.target.value)}
                placeholder="What if I try again and still fail?"
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
                What they secretly hope...
              </label>
              <input
                type="text"
                value={secretHope}
                onChange={(e) => setSecretHope(e.target.value)}
                placeholder="I just want something simple that actually works"
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
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 3 — GIVE THEM A VOICE
          </h3>
          <div style={{ color: '#9a8fa8', fontSize: '13px', marginBottom: '16px' }}>
            How does this person talk in their head? Your content must sound like this voice — not marketing language.
          </div>
          <textarea
            value={innerVoice}
            onChange={(e) => setInnerVoice(e.target.value)}
            placeholder="e.g. I am tired of working so hard and still being broke. I barely see my kids and I still cannot breathe financially. I do not want hype. I just want something that makes sense."
            rows={5}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#1c1a35',
              border: '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              lineHeight: '1.6',
            }}
          />
          <div style={{
            marginTop: '12px',
            padding: '12px 16px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '8px',
            color: '#c9a84c',
            fontSize: '12px',
            fontWeight: 600,
          }}>
            💡 Your content must sound like this voice — not marketing language.
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 4 — YOUR AUDIENCE STATEMENT
          </h3>
          <div style={{ color: '#9a8fa8', fontSize: '13px', marginBottom: '16px' }}>
            This one sentence guides every piece of content you create.
          </div>
          <div>
            <label style={{ color: '#9a8fa8', fontSize: '12px', display: 'block', marginBottom: '8px' }}>
              Write your one sentence audience statement
            </label>
            <textarea
              value={audienceStatement}
              onChange={(e) => setAudienceStatement(e.target.value)}
              placeholder="I show burnt-out 9-5 professionals who feel frustrated and stuck because they want more income and time with their kids but they are tired of living paycheck to paycheck and trying things that do not work."
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#1c1a35',
                border: '1.5px solid rgba(201,168,76,0.2)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                lineHeight: '1.6',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '20px',
              color: '#c9a84c',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              📌 Pin this to your desk
            </div>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '20px',
              color: '#c9a84c',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              ✍️ Add this to your bio
            </div>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '20px',
              color: '#c9a84c',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              📖 Read this before every post
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.05em' }}>
            SECTION 5 — GENERATE AVATAR PROFILE
          </h3>
          <button
            onClick={generateAvatar}
            disabled={!canGenerate || isGenerating}
            style={{
              width: '100%',
              padding: '18px',
              background: canGenerate && !isGenerating ? '#c9a84c' : '#666',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '15px',
              fontWeight: 700,
              cursor: canGenerate && !isGenerating ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            {isGenerating ? 'Generating Your Audience Avatar...' : 'Generate My Audience Avatar'}
          </button>

          {generatedAvatar && (
            <>
              <div style={{
                marginTop: '24px',
                padding: '28px',
                background: '#1c1a35',
                border: '2px solid #c9a84c',
                borderRadius: '12px',
                boxShadow: '0 0 30px rgba(201,168,76,0.2)',
              }}>
                <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 700, marginBottom: '20px', letterSpacing: '0.1em' }}>
                  YOUR AUDIENCE AVATAR
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ color: '#c9a84c', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                    {generatedAvatar.name}, {generatedAvatar.age}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    DAILY LIFE SNAPSHOT
                  </div>
                  <div style={{ color: '#d4cce8', fontSize: '14px', lineHeight: '1.7' }}>
                    {generatedAvatar.dailyLife}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    EMOTIONAL TRIGGERS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {generatedAvatar.emotionalTriggers.map((trigger, idx) => (
                      <div key={idx} style={{
                        padding: '8px 12px',
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        borderRadius: '6px',
                        color: '#d4cce8',
                        fontSize: '13px',
                      }}>
                        • {trigger}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    SEARCH WORDS THEY USE
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {generatedAvatar.searchWords.map((word, idx) => (
                      <div key={idx} style={{
                        padding: '6px 12px',
                        background: 'rgba(201,168,76,0.15)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: '16px',
                        color: '#c9a84c',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}>
                        "{word}"
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    5 CONTENT HOOKS IN THEIR VOICE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {generatedAvatar.contentHooks.map((hook, idx) => (
                      <div key={idx} style={{
                        padding: '12px 14px',
                        background: 'rgba(201,168,76,0.05)',
                        border: '1px solid rgba(201,168,76,0.25)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                      }}>
                        {idx + 1}. {hook}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9a8fa8', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    SCROLL TEST QUESTION
                  </div>
                  <div style={{
                    padding: '14px 16px',
                    background: 'rgba(201,168,76,0.12)',
                    border: '2px solid rgba(201,168,76,0.4)',
                    borderRadius: '8px',
                    color: '#c9a84c',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '1.6',
                  }}>
                    {generatedAvatar.scrollTestQuestion}
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '16px',
                padding: '20px',
                background: 'rgba(201,168,76,0.08)',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '12px',
              }}>
                <div style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
                  The Scroll Test
                </div>
                <div style={{ color: '#d4cce8', fontSize: '13px', marginBottom: '14px', lineHeight: '1.6' }}>
                  Before posting ask yourself: Would THIS version of {generatedAvatar.name} stop scrolling for this?
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'rgba(34,197,94,0.2)',
                    border: '1.5px solid rgba(34,197,94,0.5)',
                    borderRadius: '8px',
                    color: '#22c55e',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                    ✓ Yes — post it confidently
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'rgba(239,68,68,0.2)',
                    border: '1.5px solid rgba(239,68,68,0.5)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                    ✗ No — rewrite or delete
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '14px',
            background: 'transparent',
            border: '1px solid #c9a84c',
            borderRadius: '8px',
            color: '#c9a84c',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            flex: 2,
            padding: '14px',
            background: canProceed ? '#c9a84c' : '#666',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontSize: '14px',
            fontWeight: 700,
            cursor: canProceed ? 'pointer' : 'not-allowed',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
