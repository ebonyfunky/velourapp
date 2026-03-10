import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Check, ExternalLink, ChevronDown, ChevronUp, Music, Scissors, Type, Sparkles } from 'lucide-react';

const CHECKLIST_ITEMS = [
  'trim-dead-air',
  'cut-pauses',
  'add-captions',
  'add-music',
  'colour-graded',
  'export-1080p',
  'vertical-format',
  'product-visible',
  'text-overlays',
  'no-watermark',
];

const CHECKLIST_LABELS = {
  'trim-dead-air': 'Trimmed all dead air at the start and end of the video',
  'cut-pauses': 'Cut out any umms, pauses or mistakes between lines',
  'add-captions': 'Added captions or subtitles — 85% of viewers watch with sound off',
  'add-music': 'Added background music at low volume (10-15%) so it does not overpower your voice',
  'colour-graded': 'Colour graded — used a filter or adjusted brightness and contrast slightly',
  'export-1080p': 'Video is exported in 1080p or higher',
  'vertical-format': 'Video is in vertical format 9:16',
  'product-visible': 'Product is visible and in focus in the first 3 seconds',
  'text-overlays': 'Text overlays added to reinforce key points if needed',
  'no-watermark': 'Final export has no watermark — use CapCut\'s no-watermark export option',
};

const EDITING_STEPS = [
  {
    id: 'import',
    title: 'Step 1 — Import your footage',
    content: 'Open CapCut and tap New Project. Select all the clips you filmed for this video. CapCut will arrange them in order on the timeline at the bottom.',
  },
  {
    id: 'trim',
    title: 'Step 2 — Trim and cut',
    content: 'Tap each clip on the timeline to select it. Use the white handles on either side to trim the start and end. To cut out a section in the middle tap Split, move to the end of the section, tap Split again, then tap the section between the two cuts and delete it.',
  },
  {
    id: 'captions',
    title: 'Step 3 — Add auto captions',
    content: 'Tap Text at the bottom then tap Auto Captions. CapCut will automatically transcribe everything you said and add captions to your video. Review them for any errors. This is one of the most powerful things you can do for engagement.',
    tip: 'Auto captions can add up to 40% more watch time to your videos — always use them.',
  },
  {
    id: 'music',
    title: 'Step 4 — Add background music',
    content: 'Tap Audio then tap Sounds. Search for royalty free music that matches your content style. Set the volume to between 10-15% so it sits beneath your voice without competing with it.',
  },
  {
    id: 'color',
    title: 'Step 5 — Colour grade your video',
    content: 'Tap Filter and choose a subtle clean filter — avoid anything too heavy or dramatic. Then tap Adjust and slightly increase the brightness by 5-10 points and the contrast by 5 points. This makes your video look more professional without looking over-edited.',
  },
  {
    id: 'text',
    title: 'Step 6 — Add text overlays',
    content: 'Tap Text then tap Add Text. Use text to reinforce your hook at the start or your key benefit in the middle of the video. Keep it short — 3-5 words maximum per text overlay. Choose a clean readable font.',
  },
  {
    id: 'transitions',
    title: 'Step 7 — Add transitions (use sparingly)',
    content: 'Tap the small white square between two clips on the timeline to add a transition. Use Basic transitions only — Cut or Dissolve. Never use flashy dramatic transitions in UGC content. Clean and natural always wins.',
  },
  {
    id: 'export',
    title: 'Step 8 — Export without watermark',
    content: 'Tap the export arrow in the top right. Make sure resolution is set to 1080p and frame rate is 30fps. CapCut exports without a watermark automatically — you do not need to pay for anything.',
  },
];

const VIDEO_TYPE_TIPS: Record<string, string> = {
  'Unboxing Video': 'Cut between each item reveal — do not film one long take. Add a zoom effect when revealing the hero product. Use text overlay at the start: the product name and your first reaction word.',
  'Testimonial Video': 'Cut out any pauses longer than half a second. Add captions — testimonials live and die by how clear the message is. Use a clean minimal filter — you want the focus on your face not the edit.',
  'Tutorial & How-To': 'Use text overlays to number each step: Step 1, Step 2 etc. Speed up any waiting time during application. Add a before and after side by side at the end using CapCut\'s split screen feature.',
  'Before & After Transformation': 'Use CapCut\'s split screen feature to show before and after side by side. Add a transition between the before and after sections. Text overlay: "Before" on the left and "After" on the right.',
  'Voiceover Ad': 'Record your voiceover inside CapCut using the Voiceover feature under Audio. Match your product shots to the rhythm of your voiceover — cut on the beat. Use text overlays to reinforce every key point you say.',
  'Text on Screen Ad': 'Use CapCut\'s Text Animate feature to make each line appear with a clean fade or typewriter effect. Time each text line to stay on screen for at least 2 seconds. Use a consistent font throughout — do not mix font styles. Add subtle background music at 10% volume.',
  'Get Ready With Me': 'Use CapCut\'s speed feature to speed up the getting ready sections between talking to camera moments. Add trending audio as background music. Text overlays for each product you feature.',
  'Mini Commercial': 'Use CapCut\'s keyframe feature to create smooth zoom effects on the product. Match every cut to the beat of your background music. Colour grade more intentionally — mini commercials benefit from a stronger visual style.',
};

export default function CapCutEditingGuide() {
  const { capcutChecklistCompleted, setField } = useCampaignStore();
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [expandedTips, setExpandedTips] = useState<string[]>([]);

  const toggleChecklistItem = (itemId: string) => {
    const newCompleted = capcutChecklistCompleted.includes(itemId)
      ? capcutChecklistCompleted.filter(id => id !== itemId)
      : [...capcutChecklistCompleted, itemId];
    setField('capcutChecklistCompleted', newCompleted);
  };

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const toggleTip = (videoType: string) => {
    setExpandedTips(prev =>
      prev.includes(videoType) ? prev.filter(id => id !== videoType) : [...prev, videoType]
    );
  };

  const completedCount = capcutChecklistCompleted.length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ marginBottom: '48px' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
        }}
      >
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
          Edit Your Videos With CapCut — Free & Beginner Friendly
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px', lineHeight: '1.6' }}>
          Filming is only half the job. How you edit your video is what makes brands stop scrolling. CapCut is free, powerful and used by the world's top UGC creators.
        </p>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
            border: '2px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>
              Don't have CapCut yet?
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', margin: 0 }}>
              Download the free app to start editing like a pro
            </p>
          </div>
          <a
            href="https://www.capcut.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              border: 'none',
              borderRadius: '100px',
              color: '#0a0610',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              marginLeft: '16px',
            }}
          >
            Download CapCut Free →
          </a>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px' }}>
            Section A — CapCut Editing Checklist For Every UGC Video
          </h3>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '16px' }}>
            Before you export — check every one of these
          </p>

          <div
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#c9a84c' }}>
                Progress: {completedCount} / {totalCount}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8c96a' }}>
                {progressPercentage}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '100px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #c9a84c, #8B6914)',
                  borderRadius: '100px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CHECKLIST_ITEMS.map((itemId) => {
              const isCompleted = capcutChecklistCompleted.includes(itemId);
              return (
                <button
                  key={itemId}
                  onClick={() => toggleChecklistItem(itemId)}
                  style={{
                    background: isCompleted ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isCompleted ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      background: isCompleted ? '#22c55e' : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${isCompleted ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted && <Check size={14} style={{ color: '#0a0610', fontWeight: 900 }} />}
                  </div>
                  <span style={{ fontSize: '13px', color: isCompleted ? '#22c55e' : '#d0c9e0', lineHeight: '1.5' }}>
                    {CHECKLIST_LABELS[itemId as keyof typeof CHECKLIST_LABELS]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px' }}>
            Section B — CapCut Step By Step For UGC Beginners
          </h3>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '16px' }}>
            New to CapCut? Start here
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {EDITING_STEPS.map((step) => {
              const isExpanded = expandedSteps.includes(step.id);
              return (
                <div
                  key={step.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => toggleStep(step.id)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a' }}>
                      {step.title}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={18} style={{ color: '#c9a84c' }} />
                    ) : (
                      <ChevronDown size={18} style={{ color: '#9b8fb5' }} />
                    )}
                  </button>
                  {isExpanded && (
                    <div style={{ padding: '0 16px 16px' }}>
                      <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: step.tip ? '12px' : 0 }}>
                        {step.content}
                      </p>
                      {step.tip && (
                        <div
                          style={{
                            background: 'rgba(201,168,76,0.1)',
                            border: '1px solid rgba(201,168,76,0.2)',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            fontSize: '12px',
                            color: '#c9a84c',
                            fontStyle: 'italic',
                          }}
                        >
                          {step.tip}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px' }}>
            Section C — CapCut Editing Tips Specific To Each Video Type
          </h3>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '16px' }}>
            Editing tips for your video type
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(VIDEO_TYPE_TIPS).map(([videoType, tip]) => {
              const isExpanded = expandedTips.includes(videoType);
              return (
                <div key={videoType} style={{ width: '100%' }}>
                  <button
                    onClick={() => toggleTip(videoType)}
                    style={{
                      padding: '10px 16px',
                      background: isExpanded ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isExpanded ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '100px',
                      color: isExpanded ? '#e8c96a' : '#9b8fb5',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {videoType}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '12px 16px',
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#d0c9e0',
                        lineHeight: '1.6',
                      }}
                    >
                      {tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px' }}>
            Section D — CapCut Resources
          </h3>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '16px' }}>
            Learn more about CapCut
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
                CapCut App
              </div>
              <p style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '16px', lineHeight: '1.5' }}>
                Download the free app on iOS or Android
              </p>
              <a
                href="https://www.capcut.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                  border: 'none',
                  borderRadius: '100px',
                  color: '#0a0610',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                Download CapCut →
              </a>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
                CapCut Tutorial Library
              </div>
              <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.5', margin: 0 }}>
                Free video tutorials inside the CapCut app — tap the Learn tab after downloading
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
                CapCut Templates
              </div>
              <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.5', margin: 0 }}>
                Browse thousands of trending UGC video templates — tap Templates inside the app to find styles that match your content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
