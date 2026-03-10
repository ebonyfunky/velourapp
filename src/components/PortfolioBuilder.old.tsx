import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Check, ChevronDown, ChevronUp, Star, Copy, Trash2, Plus, TrendingUp, Camera, Video, X, Link as LinkIcon } from 'lucide-react';

interface VideoGuide {
  id: string;
  type: string;
  purpose: string;
  whyBrandsPay: string;
  shotList: string[];
  scriptStarter: string;
  lightingSetup: string;
  mistakes: string[];
  brandAppeal: number;
}

const videoGuides: VideoGuide[] = [
  {
    id: '1',
    type: 'Unboxing Video',
    purpose: 'First impression and excitement',
    whyBrandsPay: 'Creates authentic anticipation and shows product packaging quality in a relatable way',
    shotList: [
      'Box on table, natural light from side',
      'Hands opening box (close-up)',
      'Reveal product with genuine reaction',
      'Hold product up to camera with packaging visible',
      'Close-up of key product features'
    ],
    scriptStarter: 'I\'ve been waiting for this to arrive and I\'m so excited to finally unbox it. Let\'s see what\'s inside...',
    lightingSetup: 'Sit facing a window. Place the product between you and the window for soft natural backlight',
    mistakes: [
      'Starting with "Hey guys" instead of jumping straight to the unboxing',
      'Showing the product in dim lighting or with harsh overhead shadows'
    ],
    brandAppeal: 4
  },
  {
    id: '2',
    type: 'Testimonial Video',
    purpose: 'Build trust through personal story',
    whyBrandsPay: 'Real customer stories convert better than any ad copy brands can write themselves',
    shotList: [
      'Direct to camera, close-up framing',
      'Show "before" state or problem',
      'Demonstrate product in use',
      'Show results or transformation',
      'End with confident recommendation'
    ],
    scriptStarter: 'I was struggling with [problem] until I found this. Here\'s what actually happened...',
    lightingSetup: 'Face a large window. Camera should be at eye level, 3-4 feet away',
    mistakes: [
      'Reading from a script instead of speaking naturally',
      'Not showing the actual product until the end'
    ],
    brandAppeal: 5
  },
  {
    id: '3',
    type: 'Tutorial & How-To',
    purpose: 'Educate while demonstrating value',
    whyBrandsPay: 'Shows the product solving a real problem with step-by-step proof it works',
    shotList: [
      'Show the end result first',
      'Introduce the product as the solution',
      'Close-up of each step',
      'Hands doing the process',
      'Final result with product visible'
    ],
    scriptStarter: 'Want to know how I [achieved result]? Here\'s the exact method I use...',
    lightingSetup: 'Overhead phone mount with ring light, or side window light for flat lays',
    mistakes: [
      'Making steps too complicated or talking too fast',
      'Not keeping the product visible throughout the tutorial'
    ],
    brandAppeal: 5
  },
  {
    id: '4',
    type: 'Before & After Transformation',
    purpose: 'Visual proof of results',
    whyBrandsPay: 'Nothing sells like visible transformation - it removes all doubt the product works',
    shotList: [
      'Show "before" state clearly',
      'Quick montage of using product',
      'Reveal "after" with same lighting and angle',
      'Side-by-side comparison',
      'Close-up of the improvement'
    ],
    scriptStarter: 'This is what [problem area] looked like before. Watch what happened after using this for [timeframe]...',
    lightingSetup: 'Identical lighting for before and after. Natural window light works best for consistency',
    mistakes: [
      'Using different lighting or angles for before vs after',
      'Not giving a specific timeframe for the transformation'
    ],
    brandAppeal: 5
  },
  {
    id: '5',
    type: 'Get Ready With Me',
    purpose: 'Lifestyle integration and relatability',
    whyBrandsPay: 'Shows the product fitting seamlessly into real daily routines, making it feel essential',
    shotList: [
      'Start with morning or routine setup',
      'Reach for the product naturally',
      'Use product while talking',
      'Show result in mirror or on skin',
      'End with full routine complete'
    ],
    scriptStarter: 'Let me show you my morning routine. This product has become my non-negotiable...',
    lightingSetup: 'Bathroom or bedroom with natural window light. Avoid yellow artificial lights',
    mistakes: [
      'Mentioning too many products and losing focus',
      'Not explaining why this specific product is essential'
    ],
    brandAppeal: 4
  },
  {
    id: '6',
    type: 'Honest Product Review',
    purpose: 'Build credibility with balanced opinion',
    whyBrandsPay: 'Honest reviews feel trustworthy. Brands know that showing 1-2 cons makes the pros more believable',
    shotList: [
      'Product in hand, direct eye contact',
      'Show packaging and what\'s included',
      'Demonstrate key features',
      'Share what you love and what could improve',
      'Final verdict with product visible'
    ],
    scriptStarter: 'I\'ve been testing this for [timeframe] and here\'s my completely honest take...',
    lightingSetup: 'Sit directly facing a window. Camera at eye level with product between you and camera',
    mistakes: [
      'Only saying positive things - it feels fake',
      'Reviewing a product after only one use'
    ],
    brandAppeal: 5
  },
  {
    id: '7',
    type: 'Lifestyle Showcase',
    purpose: 'Aspirational content and aesthetic appeal',
    whyBrandsPay: 'Makes the product look desirable by associating it with an attractive lifestyle',
    shotList: [
      'Wide shot of aesthetic environment',
      'Product in lifestyle context (coffee table, car, gym)',
      'You using product in the scene',
      'Close-up of product detail',
      'End with product as part of the aesthetic'
    ],
    scriptStarter: 'This has been my go-to for [activity]. Let me show you why it fits my lifestyle so well...',
    lightingSetup: 'Golden hour (early morning or late afternoon) near windows for warm natural glow',
    mistakes: [
      'Cluttered background that distracts from the product',
      'Product appears for less than half the video duration'
    ],
    brandAppeal: 4
  },
  {
    id: '8',
    type: 'Voiceover Ad (faceless)',
    purpose: 'Product-focused storytelling',
    whyBrandsPay: 'Keeps 100% focus on the product with cinematic feel - perfect for paid media',
    shotList: [
      'Product beauty shot from multiple angles',
      'Hands interacting with product',
      'Close-up of textures and details',
      'Product in use (no face needed)',
      'End with product and branding visible'
    ],
    scriptStarter: 'If you\'ve been looking for [solution], this is the one thing that actually works. Here\'s why...',
    lightingSetup: 'Diffused window light from the side. Product should have no harsh shadows',
    mistakes: [
      'Voiceover that doesn\'t match the pace of the visuals',
      'Shaky handheld footage - use a tripod or stable surface'
    ],
    brandAppeal: 5
  },
  {
    id: '9',
    type: 'Text on Screen Ad (faceless)',
    purpose: 'Fast-paced problem-solution format',
    whyBrandsPay: 'High retention format that works on mute - perfect for scrolling audiences',
    shotList: [
      'Hook text over product shot',
      'Quick cuts of product features',
      'Text overlays explaining benefits',
      'Transition shots between key points',
      'CTA text with product in frame'
    ],
    scriptStarter: 'POV: You just found the solution to [problem] | Here\'s what makes it different | [3 key benefits]',
    lightingSetup: 'Bright even lighting. Product should be well-lit from at least two angles to avoid shadows',
    mistakes: [
      'Text that\'s too small to read on mobile',
      'More than 5 words per text slide'
    ],
    brandAppeal: 5
  },
  {
    id: '10',
    type: 'Mini Commercial',
    purpose: 'Polished brand-ready content',
    whyBrandsPay: 'Looks professional enough to run as paid ads - saves brands money on production',
    shotList: [
      'Attention-grabbing opening shot',
      'Problem statement (visual)',
      'Product introduction',
      '3 key benefits shown in action',
      'Strong CTA with product prominently displayed'
    ],
    scriptStarter: 'You need to see this. [Product] just changed the way I [activity]. Watch...',
    lightingSetup: 'Soft box or ring light for controlled even lighting. Or outdoors in open shade',
    mistakes: [
      'Making it longer than 30 seconds',
      'No clear call-to-action at the end'
    ],
    brandAppeal: 5
  }
];

function PortfolioPhotosSection() {
  const { portfolioPhotos, setField } = useCampaignStore();
  const [photoInputs, setPhotoInputs] = useState<Array<{ id: string; url: string; productName: string }>>(
    portfolioPhotos || Array.from({ length: 10 }, (_, i) => ({ id: `photo-${i + 1}`, url: '', productName: '' }))
  );

  const handlePhotoChange = (id: string, field: 'url' | 'productName', value: string) => {
    const updated = photoInputs.map((photo) =>
      photo.id === id ? { ...photo, [field]: value } : photo
    );
    setPhotoInputs(updated);
    setField('portfolioPhotos', updated.filter((p) => p.url));
  };

  const handleRemovePhoto = (id: string) => {
    const updated = photoInputs.map((photo) =>
      photo.id === id ? { ...photo, url: '', productName: '' } : photo
    );
    setPhotoInputs(updated);
    setField('portfolioPhotos', updated.filter((p) => p.url));
  };

  const filledPhotosCount = photoInputs.filter((p) => p.url).length;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
          Your Portfolio Photos
        </h3>
        <div
          style={{
            padding: '8px 16px',
            background: filledPhotosCount >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.15)',
            border: `1px solid ${filledPhotosCount >= 5 ? 'rgba(34,197,94,0.3)' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 600,
            color: filledPhotosCount >= 5 ? '#22c55e' : '#c9a84c',
          }}
        >
          Photos: {filledPhotosCount} / 10 — aim for at least 5
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {photoInputs.map((photo) => (
          <div
            key={photo.id}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: photo.url ? '1px solid rgba(201,168,76,0.3)' : '2px dashed rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              position: 'relative',
            }}
          >
            {photo.url ? (
              <>
                <img
                  src={photo.url}
                  alt="Portfolio"
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '12px',
                  }}
                />
                <button
                  onClick={() => handleRemovePhoto(photo.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '6px',
                    background: 'rgba(220, 38, 38, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={14} />
                </button>
                <input
                  type="text"
                  value={photo.productName}
                  onChange={(e) => handlePhotoChange(photo.id, 'productName', e.target.value)}
                  placeholder="What product is this?"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                  }}
                />
              </>
            ) : (
              <div
                style={{
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <Camera size={32} style={{ color: '#9b8fb5' }} />
                <input
                  type="text"
                  value={photo.url}
                  onChange={(e) => handlePhotoChange(photo.id, 'url', e.target.value)}
                  placeholder="Paste image URL"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#9b8fb5', textAlign: 'center' }}>Upload a photo</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioVideosSection() {
  const { portfolioVideoLinks, setField } = useCampaignStore();
  const [videoInputs, setVideoInputs] = useState<Array<{ id: string; link: string; videoType: string; productName: string }>>(
    portfolioVideoLinks || Array.from({ length: 10 }, (_, i) => ({ id: `video-${i + 1}`, link: '', videoType: '', productName: '' }))
  );

  const VIDEO_TYPES = [
    'Unboxing & First Reaction',
    'Honest Review',
    'Tutorial & How-To',
    'Before & After',
    'Get Ready With Me',
    'Lifestyle Showcase',
    'Voiceover Ad',
    'Text on Screen',
    'Testimonial Style',
    'Mini Commercial',
  ];

  const handleVideoChange = (id: string, field: 'link' | 'videoType' | 'productName', value: string) => {
    const updated = videoInputs.map((video) =>
      video.id === id ? { ...video, [field]: value } : video
    );
    setVideoInputs(updated);
    setField('portfolioVideoLinks', updated.filter((v) => v.link));
  };

  const handleRemoveVideo = (id: string) => {
    const updated = videoInputs.map((video) =>
      video.id === id ? { ...video, link: '', videoType: '', productName: '' } : video
    );
    setVideoInputs(updated);
    setField('portfolioVideoLinks', updated.filter((v) => v.link));
  };

  const filledVideosCount = videoInputs.filter((v) => v.link).length;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
          Your Portfolio Videos
        </h3>
        <div
          style={{
            padding: '8px 16px',
            background: filledVideosCount >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.15)',
            border: `1px solid ${filledVideosCount >= 5 ? 'rgba(34,197,94,0.3)' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 600,
            color: filledVideosCount >= 5 ? '#22c55e' : '#c9a84c',
          }}
        >
          Videos: {filledVideosCount} / 10 — aim for at least 5
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {videoInputs.map((video) => (
          <div
            key={video.id}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: video.link ? '1px solid rgba(201,168,76,0.3)' : '2px dashed rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              position: 'relative',
            }}
          >
            {video.link ? (
              <>
                <div
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Video size={24} style={{ color: '#c9a84c' }} />
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      fontSize: '12px',
                      color: '#e8c96a',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {video.link}
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveVideo(video.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '6px',
                    background: 'rgba(220, 38, 38, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={14} />
                </button>
                <select
                  value={video.videoType}
                  onChange={(e) => handleVideoChange(video.id, 'videoType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <option value="">Select video type</option>
                  {VIDEO_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={video.productName}
                  onChange={(e) => handleVideoChange(video.id, 'productName', e.target.value)}
                  placeholder="What product did you feature?"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                  }}
                />
              </>
            ) : (
              <div
                style={{
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <Video size={32} style={{ color: '#9b8fb5' }} />
                <input
                  type="text"
                  value={video.link}
                  onChange={(e) => handleVideoChange(video.id, 'link', e.target.value)}
                  placeholder="Paste video link"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#9b8fb5', textAlign: 'center', lineHeight: '1.4' }}>
                  Google Drive, Canva, Dropbox,<br />WeTransfer, or any link
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioReadinessBanner() {
  const { portfolioPhotos, portfolioVideoLinks } = useCampaignStore();

  const photoCount = (portfolioPhotos || []).filter((p) => p.url).length;
  const videoCount = (portfolioVideoLinks || []).filter((v) => v.link).length;
  const totalPieces = photoCount + videoCount;

  let message = '';
  let color = '';
  let bgColor = '';
  let borderColor = '';

  if (totalPieces === 0) {
    message = 'Keep going — brands need to see at least 5 pieces of content to consider hiring you';
    color = '#ff6b6b';
    bgColor = 'rgba(255,107,107,0.1)';
    borderColor = 'rgba(255,107,107,0.3)';
  } else if (totalPieces <= 2) {
    message = 'Keep going — brands need to see at least 5 pieces of content to consider hiring you';
    color = '#ff6b6b';
    bgColor = 'rgba(255,107,107,0.1)';
    borderColor = 'rgba(255,107,107,0.3)';
  } else if (totalPieces <= 4) {
    message = 'Almost there — add a few more pieces to make your portfolio competitive';
    color = '#ffa94d';
    bgColor = 'rgba(255,169,77,0.1)';
    borderColor = 'rgba(255,169,77,0.3)';
  } else if (totalPieces <= 7) {
    message = 'Good portfolio — you are ready to start reaching out to brands';
    color = '#c9a84c';
    bgColor = 'rgba(201,168,76,0.1)';
    borderColor = 'rgba(201,168,76,0.3)';
  } else {
    message = 'Outstanding portfolio — you are ready to pitch any brand with confidence';
    color = '#22c55e';
    bgColor = 'rgba(34,197,94,0.1)';
    borderColor = 'rgba(34,197,94,0.3)';
  }

  return (
    <div
      style={{
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          fontSize: '32px',
          lineHeight: 1,
        }}
      >
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color, marginBottom: '4px' }}>
          Portfolio Status: {totalPieces} pieces uploaded
        </div>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', margin: 0 }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioBuilder() {
  const {
    portfolioVideos,
    portfolioLinks,
    portfolioNiche,
    portfolioAvailability,
    setField,
  } = useCampaignStore();

  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [showFormula, setShowFormula] = useState(true);
  const [newLink, setNewLink] = useState({ platform: 'TikTok', link: '', videoType: '' });

  const toggleCard = (id: string) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter((cardId) => cardId !== id));
    } else {
      setExpandedCards([...expandedCards, id]);
    }
  };

  const toggleVideoComplete = (id: string) => {
    const updated = portfolioVideos.map((video) =>
      video.id === id ? { ...video, completed: !video.completed } : video
    );
    setField('portfolioVideos', updated);
  };

  const updateVideoLink = (id: string, link: string) => {
    const updated = portfolioVideos.map((video) =>
      video.id === id ? { ...video, link } : video
    );
    setField('portfolioVideos', updated);
  };

  const addPortfolioLink = () => {
    if (!newLink.link || !newLink.videoType) return;
    const link = {
      id: Date.now().toString(),
      platform: newLink.platform,
      link: newLink.link,
      videoType: newLink.videoType,
    };
    setField('portfolioLinks', [...portfolioLinks, link]);
    setNewLink({ platform: 'TikTok', link: '', videoType: '' });
  };

  const removePortfolioLink = (id: string) => {
    setField('portfolioLinks', portfolioLinks.filter((link) => link.id !== id));
  };

  const calculateScore = () => {
    const completedVideos = portfolioVideos.filter((v) => v.completed).length;
    const videoScore = (completedVideos / 10) * 60;

    const videosWithLinks = portfolioVideos.filter((v) => v.link.trim() !== '').length;
    const linkScore = (videosWithLinks / 10) * 20;

    const varietyScore = portfolioLinks.length >= 5 ? 10 : (portfolioLinks.length / 5) * 10;
    const nicheScore = portfolioNiche.trim() !== '' ? 10 : 0;

    return Math.round(videoScore + linkScore + varietyScore + nicheScore);
  };

  const calculateSubScores = () => {
    const varietyScore = Math.round((portfolioLinks.length / 10) * 100);
    const qualityScore = Math.round((portfolioVideos.filter((v) => v.completed).length / 10) * 100);
    const nicheScore = portfolioNiche.trim() !== '' ? 100 : 0;

    return { varietyScore, qualityScore, nicheScore };
  };

  const generatePortfolioStatement = () => {
    const completedTypes = portfolioVideos
      .filter((v) => v.completed)
      .slice(0, 3)
      .map((v) => v.type)
      .join(', ');

    const niche = portfolioNiche || '[your niche]';
    const types = completedTypes || '[video types]';

    return `I am a ${niche} UGC creator specialising in ${types}. I create authentic content that converts for ${niche} brands. ${portfolioAvailability}.`;
  };

  const copyStatement = () => {
    navigator.clipboard.writeText(generatePortfolioStatement());
  };

  const totalScore = calculateScore();
  const subScores = calculateSubScores();

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Portfolio Builder
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '16px' }}>
        Your complete training ground for brand-ready UGC content
      </p>

      <div
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '24px', lineHeight: 1 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
            Use Scripts to Film Your Portfolio
          </div>
          <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', margin: 0 }}>
            Use the scripts you generated in the Portfolio Script Builder to film your content. Upload your finished videos and photos here to build your brand-ready portfolio.
          </p>
        </div>
      </div>

      {/* Portfolio Photos Section */}
      <PortfolioPhotosSection />

      {/* Portfolio Videos Section */}
      <PortfolioVideosSection />

      {/* Portfolio Readiness Banner */}
      <PortfolioReadinessBanner />

      {/* Section 1: Portfolio Score Dashboard */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
          border: '2px solid #c9a84c',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.1 }}>
          <TrendingUp size={120} strokeWidth={1} style={{ color: '#c9a84c' }} />
        </div>

        <div style={{ display: 'flex', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '8px solid #c9a84c',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10,6,16,0.6)',
                boxShadow: '0 8px 32px rgba(201,168,76,0.3)',
              }}
            >
              <div style={{ fontSize: '56px', fontWeight: 700, color: '#e8c96a' }}>{totalScore}</div>
              <div style={{ fontSize: '18px', color: '#9b8fb5' }}>/100</div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0ebff', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Brand Readiness Score
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                background: 'rgba(255,107,107,0.15)',
                border: '1.5px solid rgba(255,107,107,0.4)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontSize: '14px', color: '#ffb3b3', fontWeight: 600, lineHeight: 1.6 }}>
                Brands review your portfolio in under 8 seconds. Every video must stop the scroll immediately.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>{subScores.varietyScore}</div>
                <div style={{ fontSize: '12px', color: '#9b8fb5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Content Variety
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>{subScores.qualityScore}</div>
                <div style={{ fontSize: '12px', color: '#9b8fb5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Production Quality
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>{subScores.nicheScore}</div>
                <div style={{ fontSize: '12px', color: '#9b8fb5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Niche Clarity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: The UGC Winning Formula */}
      <div
        style={{
          background: 'rgba(28,26,53,0.6)',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <button
          onClick={() => setShowFormula(!showFormula)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: '#f0ebff',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif' }}>
            What Brands Actually Look For
          </h2>
          {showFormula ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
        </button>

        {showFormula && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {[
              { title: 'Hook in 2 seconds', desc: 'Your first frame must create instant curiosity or emotion. No slow intros.' },
              { title: 'Natural lighting always wins', desc: 'Ring lights look fake. Sit near a window. Soft natural light reads as authentic.' },
              { title: 'Audio is non-negotiable', desc: 'Bad audio kills great video. Use earphones as a mic if you have nothing else.' },
              { title: 'Shoot vertical 9:16', desc: 'Always. Every time. No exceptions for TikTok and Reels.' },
              { title: 'Feature the product in the first 3 seconds', desc: 'Brands pay for product visibility not your personality alone.' },
            ].map((principle, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>{principle.title}</div>
                <div style={{ fontSize: '13px', color: '#b8b0cc', lineHeight: 1.5 }}>{principle.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 3: Your 10 Portfolio Videos */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '16px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Your 10 Portfolio Videos — Full Production Guide
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Master these 10 formats and you'll have everything brands are looking for
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {videoGuides.map((guide) => {
            const video = portfolioVideos.find((v) => v.id === guide.id);
            const isExpanded = expandedCards.includes(guide.id);
            const isCompleted = video?.completed || false;

            return (
              <div
                key={guide.id}
                style={{
                  background: isCompleted ? 'rgba(201,168,76,0.1)' : '#1c1a35',
                  border: isCompleted ? '2px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleCard(guide.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: isCompleted ? '#c9a84c' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '16px',
                        color: isCompleted ? '#0a0610' : '#9b8fb5',
                      }}
                    >
                      {isCompleted ? <Check size={24} /> : guide.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: isCompleted ? '#e8c96a' : '#f0ebff', marginBottom: '4px' }}>
                        {guide.type}
                      </div>
                      <div style={{ fontSize: '13px', color: '#9b8fb5' }}>{guide.purpose}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {Array.from({ length: guide.brandAppeal }).map((_, i) => (
                        <Star key={i} size={16} fill="#c9a84c" color="#c9a84c" />
                      ))}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#c9a84c',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                          }}
                        >
                          Why Brands Pay For This
                        </div>
                        <div style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.6 }}>{guide.whyBrandsPay}</div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#c9a84c',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                          }}
                        >
                          Shot List
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {guide.shotList.map((shot, i) => (
                            <li key={i} style={{ fontSize: '14px', color: '#d4cee8', marginBottom: '6px', lineHeight: 1.5 }}>
                              {shot}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#c9a84c',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                          }}
                        >
                          Script Starter
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            color: '#e8c96a',
                            fontStyle: 'italic',
                            background: 'rgba(201,168,76,0.1)',
                            padding: '12px',
                            borderRadius: '8px',
                            borderLeft: '3px solid #c9a84c',
                          }}
                        >
                          "{guide.scriptStarter}"
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#c9a84c',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                          }}
                        >
                          Lighting Setup
                        </div>
                        <div style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.6 }}>{guide.lightingSetup}</div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#ff6b6b',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                          }}
                        >
                          Common Mistakes To Avoid
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {guide.mistakes.map((mistake, i) => (
                            <li key={i} style={{ fontSize: '14px', color: '#ffb3b3', marginBottom: '6px', lineHeight: 1.5 }}>
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoComplete(guide.id);
                          }}
                          style={{
                            padding: '12px 24px',
                            background: isCompleted ? '#c9a84c' : 'rgba(201,168,76,0.15)',
                            color: isCompleted ? '#0a0610' : '#e8c96a',
                            border: isCompleted ? 'none' : '1.5px solid #c9a84c',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                          }}
                        >
                          {isCompleted && <Check size={18} />}
                          {isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                        <input
                          type="text"
                          placeholder="Paste video link here"
                          value={video?.link || ''}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateVideoLink(guide.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            flex: 1,
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Winning Portfolio Examples */}
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
          The Difference Between Ignored and Paid
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          What separates portfolios that get responses from those that get ghosted
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #c9a84c' }}>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '13px',
                    color: '#ff6b6b',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 700,
                  }}
                >
                  Weak Portfolio
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '13px',
                    color: '#4ecdc4',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 700,
                  }}
                >
                  Winning Portfolio
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { weak: 'Same video style repeated', strong: 'Variety of formats and moods' },
                { weak: 'Dark or blurry footage', strong: 'Bright, clear, well-lit shots' },
                { weak: 'No hook in first 2 seconds', strong: 'Immediate scroll-stopping opening' },
                { weak: 'Only selfie-style videos', strong: 'Mix of close-ups, angles, lifestyle' },
                { weak: 'No niche focus', strong: 'Clear consistent theme and audience' },
                { weak: 'Generic captions', strong: 'Benefit-driven on-screen text' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#d4cee8' }}>{row.weak}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#d4cee8', fontWeight: 600 }}>{row.strong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 5: Your Portfolio Links Gallery */}
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
          Your Live Portfolio
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          These links auto-populate into your Campaign Pack and brand pitch emails
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <select
            value={newLink.platform}
            onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
            }}
          >
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
          </select>
          <input
            type="text"
            placeholder="Video type (e.g., Unboxing)"
            value={newLink.videoType}
            onChange={(e) => setNewLink({ ...newLink, videoType: e.target.value })}
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
              width: '200px',
            }}
          />
          <input
            type="text"
            placeholder="Paste video link"
            value={newLink.link}
            onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f0ebff',
              fontSize: '14px',
            }}
          />
          <button
            onClick={addPortfolioLink}
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
            <Plus size={18} />
            Add
          </button>
        </div>

        {portfolioLinks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px',
              color: '#9b8fb5',
              fontSize: '14px',
              border: '2px dashed rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
          >
            No portfolio links yet. Add your best work above to build your gallery.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {portfolioLinks.map((link) => (
              <div
                key={link.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#e8c96a',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {link.platform}
                  </div>
                  <button
                    onClick={() => removePortfolioLink(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ff6b6b',
                      padding: '4px',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div style={{ fontSize: '13px', color: '#9b8fb5' }}>{link.videoType}</div>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12px',
                    color: '#c9a84c',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.link}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 6: Your Pitch-Ready Summary */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
          border: '2px solid #c9a84c',
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
          Your Pitch-Ready Summary
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Use this in emails, DMs, and your media kit
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
              Your Niche
            </label>
            <input
              type="text"
              value={portfolioNiche}
              onChange={(e) => setField('portfolioNiche', e.target.value)}
              placeholder="e.g., skincare, fitness, home decor"
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
            <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
              Availability
            </label>
            <input
              type="text"
              value={portfolioAvailability}
              onChange={(e) => setField('portfolioAvailability', e.target.value)}
              placeholder="e.g., Available for paid collaborations"
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

        <div
          style={{
            background: 'rgba(10,6,16,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '16px', color: '#f0ebff', lineHeight: 1.8, fontStyle: 'italic' }}>
            {generatePortfolioStatement()}
          </div>
        </div>

        <button
          onClick={copyStatement}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
            color: '#0a0610',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
          }}
        >
          <Copy size={20} />
          Copy My Portfolio Statement →
        </button>
      </div>
    </div>
  );
}
