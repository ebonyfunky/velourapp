import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';

const GEAR_CARDS = [
  {
    id: 'email',
    title: 'Your UGC Business Email',
    description: 'A dedicated professional email for all brand communications. Never pitch from your personal email - it signals amateur immediately.',
    tip: 'Create a free Gmail - yourname.ugc@gmail.com or yourname.creates@gmail.com',
    points: [
      'Keep it simple - your name plus ugc or creates',
      'Use Gmail - most universally trusted by brands',
      'Add your portfolio link to your email signature',
      'Check it every single day once you start pitching',
    ],
  },
  {
    id: 'phone',
    title: 'Your Phone',
    description: 'The only camera you need. Use the back camera - always higher quality than the front.',
    tip: 'Set to 1080p HD at 60fps before every single shoot.',
    points: [
      'Always use the back camera - never the front',
      'Set resolution to 1080p HD at 60fps in your camera settings',
      'Clean your lens before every shoot - a fingerprint destroys sharpness',
      'Film vertical 9:16 always - never horizontal for UGC content',
    ],
  },
  {
    id: 'lighting',
    title: 'Lighting',
    description: 'Natural window light is free and beats most ring lights. Face the window - never have it behind you.',
    tip: 'No window? Search \'LED video panel light\' on Amazon. Anti-glare only - avoid harsh shadows.',
    points: [
      'Face the window directly - light should hit your face not your back',
      'Soft overcast daylight is ideal - avoid harsh midday sun',
      'Morning and late afternoon light is the most flattering',
      'If filming at night search \'LED video panel light\' - more natural than a ring light',
    ],
  },
  {
    id: 'tripod',
    title: 'Phone Stand or Tripod',
    description: 'Your phone must be stable and at eye level. A stack of books works perfectly when starting out.',
    tip: 'Search \'adjustable phone tripod\' on Amazon when you are ready to upgrade - under $25.',
    points: [
      'Eye level always - never film looking up or down at yourself',
      'A stack of hardcover books is free and works perfectly',
      'An adjustable tripod that reaches 150cm lets you film standing up',
      'Stability matters more than any other gear upgrade',
    ],
  },
  {
    id: 'microphone',
    title: 'Microphone (Optional but Recommended)',
    description: 'Your earphones already have a mic - plug them in for an instant audio upgrade. In noisy environments a noise cancelling clip mic is a game changer.',
    tip: 'If background noise is unavoidable search \'noise cancelling clip mic for phone\' on Amazon.',
    points: [
      'Earphones with a mic - free, already in your drawer, good enough to start',
      'Noise cancelling clip mic - essential if you live in a noisy home or city environment',
      'Record a 10 second test before every shoot and play it back - catch problems before filming',
      'Turn off every fan, TV and air conditioning you can control before pressing record',
    ],
    goldNote: 'Brands need audio clean enough for paid ads. Bad audio gets you rejected faster than anything else.',
  },
  {
    id: 'teleprompter',
    title: 'Teleprompter App',
    description: 'Read your Velour script naturally without memorising a single word. Eyes stay on the lens - not on a piece of paper.',
    tip: 'Search \'teleprompter app\' in your App Store. Free tier is enough. Copy your Velour script and paste straight in.',
    points: [
      'Search \'teleprompter app\' in App Store or Google Play - most have a free tier',
      'Copy your script directly from Velour and paste it in before every shoot',
      'Adjust the scroll speed to match your natural speaking pace',
      'Position your phone or tablet at eye level beside your filming phone so your eyes stay on the lens',
    ],
    goldNote: 'Velour scripts are written in short punchy sentences specifically so they are easy to read from a teleprompter and still sound completely natural.',
  },
  {
    id: 'capcut',
    title: 'CapCut',
    description: 'The free editing app that turns raw phone footage into brand-ready content. Used by creators worldwide.',
    tip: 'Download free from your App Store or capcut.com. Your full CapCut editing guide is in the section below.',
    points: [
      'Download free from App Store Google Play or capcut.com',
      'Use Auto Captions - adds subtitles automatically, increases watch time significantly',
      'Export at 1080p with no watermark - CapCut allows this for free',
      'Full step by step editing guide is in the CapCut section below this card',
    ],
  },
];

const PRIORITY_LIST = [
  'Set up your UGC business email - do this first',
  'Your phone - back camera 1080p 60fps',
  'Find your best window - face it directly',
  'Download a teleprompter app - paste your Velour script in',
  'Plug in your earphones - instant audio upgrade',
  'Stabilise your phone - books or tripod',
  'Edit in CapCut - free and beginner friendly',
];

export default function UGCGearGuide() {
  const { gearCardExpanded, setField } = useCampaignStore();

  const toggleCard = (cardId: string) => {
    setField('gearCardExpanded', {
      ...gearCardExpanded,
      [cardId]: !gearCardExpanded[cardId as keyof typeof gearCardExpanded],
    });
  };

  return (
    <div
      style={{
        background: 'rgba(201,168,76,0.04)',
        border: '2px solid rgba(201,168,76,0.25)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#e8c96a',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Your UGC Creator Gear Guide
        </h3>
        <p style={{ fontSize: '15px', color: '#f0ebff', marginBottom: '4px' }}>
          Everything you need to start filming today
        </p>
        <p style={{ fontSize: '13px', color: '#c9a84c', fontStyle: 'italic' }}>
          Simple. Affordable. No excuses.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {GEAR_CARDS.map((card) => {
          const isExpanded = gearCardExpanded[card.id as keyof typeof gearCardExpanded];
          return (
            <div
              key={card.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(201,168,76,0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              {card.icon && <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>}
              <h4
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#e8c96a',
                  marginBottom: '8px',
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  color: '#d0c9e0',
                  lineHeight: '1.6',
                  marginBottom: '12px',
                }}
              >
                {card.description}
              </p>
              <div
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#c9a84c',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Tip
                </div>
                <div style={{ fontSize: '12px', color: '#f0ebff', lineHeight: '1.5' }}>
                  {card.tip}
                </div>
              </div>

              <button
                onClick={() => toggleCard(card.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginBottom: isExpanded ? '12px' : '0',
                }}
              >
                {isExpanded ? (
                  <>
                    Hide Details <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show Details <ChevronDown size={16} />
                  </>
                )}
              </button>

              {isExpanded && (
                <div>
                  <ul
                    style={{
                      margin: '0',
                      padding: '0 0 0 16px',
                      listStyle: 'disc',
                      marginBottom: card.goldNote ? '12px' : '0',
                    }}
                  >
                    {card.points.map((point, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '11px',
                          color: '#9b8fb5',
                          lineHeight: '1.6',
                          marginBottom: '6px',
                        }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  {card.goldNote && (
                    <div
                      style={{
                        background: 'rgba(201,168,76,0.1)',
                        border: '1.5px solid #c9a84c',
                        borderRadius: '8px',
                        padding: '12px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#e8c96a',
                          lineHeight: '1.6',
                          fontStyle: 'italic',
                        }}
                      >
                        {card.goldNote}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#e8c96a',
            marginBottom: '16px',
          }}
        >
          The order that matters most:
        </h4>
        <ol
          style={{
            margin: '0',
            padding: '0 0 0 20px',
            listStyle: 'decimal',
          }}
        >
          {PRIORITY_LIST.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: '13px',
                color: '#d0c9e0',
                lineHeight: '1.8',
                marginBottom: '8px',
              }}
            >
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '2px solid #c9a84c',
          borderRadius: '12px',
          padding: '16px',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: '#f0ebff',
            lineHeight: '1.7',
            margin: 0,
          }}
        >
          Creators are landing $500 brand deals with nothing but a phone, a window and a professional
          email. Your gear is not holding you back. Your portfolio and your pitch are.
        </p>
      </div>
    </div>
  );
}
