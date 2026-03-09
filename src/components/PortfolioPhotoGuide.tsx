import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PhotoType {
  id: string;
  emoji: string;
  title: string;
  whyBrandsLove: string;
  howToShoot: string;
}

const photoTypes: PhotoType[] = [
  {
    id: '1',
    emoji: '🧴',
    title: 'Flat Lay Product Shot',
    whyBrandsLove: 'Clean, professional and shows the product clearly without distraction',
    howToShoot: 'Place the product on a clean white, marble or wooden surface. Shoot directly from above. Use natural window light from the side. Keep the background minimal and uncluttered.',
  },
  {
    id: '2',
    emoji: '🤳',
    title: 'Lifestyle Hold Shot',
    whyBrandsLove: 'Shows the product in real hands making it relatable and authentic',
    howToShoot: 'Hold the product naturally in your hand at chest height. Shoot against a clean background. Make sure your nails are clean and tidy. Natural light only — face a window.',
  },
  {
    id: '3',
    emoji: '😊',
    title: 'Face With Product Shot',
    whyBrandsLove: 'Puts a real person behind the product — builds instant trust',
    howToShoot: 'Hold the product next to your face or apply it while looking at the camera. Smile naturally. Sit near a window with the light hitting your face directly. No ring light.',
  },
  {
    id: '4',
    emoji: '🔍',
    title: 'Close Up Detail Shot',
    whyBrandsLove: 'Shows product texture, packaging and quality — great for beauty and food brands',
    howToShoot: 'Get as close as your phone camera allows without losing focus. Show the texture, the label, the colour. Tap the screen to focus before shooting. Natural light is essential for this shot.',
  },
  {
    id: '5',
    emoji: '📸',
    title: 'Before & After Photo Set',
    whyBrandsLove: 'Visual proof of results — the most powerful photo type for conversion',
    howToShoot: 'Take a photo before using the product in the same lighting and angle. Use the product for a few days then take the exact same photo in the same spot and light. Side by side these photos tell a story brands pay for.',
  },
  {
    id: '6',
    emoji: '🌿',
    title: 'In Context Lifestyle Shot',
    whyBrandsLove: 'Shows the product living in a real person\'s life — aspirational and authentic at the same time',
    howToShoot: 'Place or use the product in a natural setting that matches its purpose. Skincare on a bathroom shelf. Coffee on a morning desk. Supplement next to a gym bag. Shoot the scene naturally as if the product belongs there.',
  },
  {
    id: '7',
    emoji: '📦',
    title: 'Unboxing Flat Lay',
    whyBrandsLove: 'Shows the full brand experience from packaging to product — great for gifting and premium brands',
    howToShoot: 'Lay out the box, packaging, any inserts and the product itself in a neat arrangement on a clean surface. Shoot from above. Make it look like a magazine editorial.',
  },
  {
    id: '8',
    emoji: '✨',
    title: 'Texture & Application Shot',
    whyBrandsLove: 'Shows the product being used in real time — great for beauty, skincare and food',
    howToShoot: 'Apply a small amount of the product to your hand or skin and photograph the moment of application. Capture the texture, the colour, the way it blends. Get close and use natural light.',
  },
];

export default function PortfolioPhotoGuide() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
        5-10 Photos That Will Make Brands Stop And Hire You
      </h2>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '32px' }}>
        You do not need a professional camera. Your phone is enough. Here is exactly what to shoot.
      </p>

      <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
        {photoTypes.map((photo) => {
          const isExpanded = expandedCard === photo.id;
          return (
            <div
              key={photo.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => toggleCard(photo.id)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '24px' }}>{photo.emoji}</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
                      {photo.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic' }}>
                      {photo.whyBrandsLove}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} style={{ color: '#c9a84c', flexShrink: 0 }} />
                ) : (
                  <ChevronDown size={20} style={{ color: '#9b8fb5', flexShrink: 0 }} />
                )}
              </button>
              {isExpanded && (
                <div
                  style={{
                    padding: '0 20px 20px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#c9a84c', marginTop: '16px', marginBottom: '8px' }}>
                    How to shoot it:
                  </div>
                  <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', margin: 0 }}>
                    {photo.howToShoot}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '2px solid rgba(201,168,76,0.25)',
          borderRadius: '12px',
          padding: '20px 24px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '16px' }}>
          Before You Shoot — Read This
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Clean your background before every shoot — clutter kills great photos
          </li>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Always use natural light — sit near a window and turn off overhead lights
          </li>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Shoot in portrait mode on your phone for the best depth and focus
          </li>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Take at least 10 shots of each type and pick the best 2-3
          </li>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Edit with free apps like Lightroom Mobile or VSCO — just adjust brightness and contrast slightly
          </li>
          <li style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6' }}>
            Consistency matters — try to use similar lighting and backgrounds across your portfolio so it looks cohesive
          </li>
        </ul>
      </div>
    </div>
  );
}
