import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Upload, Trash2, Check, Sparkles, Star } from 'lucide-react';
import BeforeYouRecord from './BeforeYouRecord';
import CapCutEditingGuide from './CapCutEditingGuide';
import VideoUploadModal from './VideoUploadModal';

const VIDEO_PLATFORMS = [
  'Google Drive',
  'Canva Portfolio',
  'Dropbox',
  'WeTransfer',
  'Direct Video Link',
  'Other',
];

const FACE_FORWARD_TYPES = [
  'Unboxing Video',
  'Testimonial Video',
  'Tutorial & How-To',
  'Before & After Transformation',
  'Get Ready With Me',
  'Honest Product Review',
  'Lifestyle Showcase',
  'Mini Commercial',
];

const FACELESS_TYPES = [
  'Voiceover Ad',
  'Text on Screen Ad',
];

interface PortfolioVideosTabProps {
  onNavigateToScriptBuilder?: () => void;
  onNavigateToPitchScript?: () => void;
}

export default function PortfolioVideosTab({ onNavigateToScriptBuilder, onNavigateToPitchScript }: PortfolioVideosTabProps) {
  const { portfolioVideoLinks, portfolioPhotos, introVideoUploaded, introVideoLink, introVideoPlatform, introVideoFileName, pitchVideoUploaded, pitchVideoLink, pitchVideoPlatform, pitchVideoFileName, setField } = useCampaignStore();
  const [uploadModalIndex, setUploadModalIndex] = useState<number | null>(null);
  const [introUploadModalOpen, setIntroUploadModalOpen] = useState(false);
  const [pitchUploadModalOpen, setPitchUploadModalOpen] = useState(false);

  const handleAddVideo = () => {
    const newVideos = [
      ...portfolioVideoLinks,
      {
        id: Date.now().toString(),
        link: '',
        platform: '',
        videoType: '',
        productName: '',
        notes: '',
        isFaceForward: true,
        fileName: '',
      },
    ];
    setField('portfolioVideoLinks', newVideos);
  };

  const handleUpload = (index: number, data: { type: 'file' | 'link'; file?: File; link?: string; fileName?: string }) => {
    const newVideos = [...portfolioVideoLinks];

    if (!newVideos[index]) {
      newVideos[index] = {
        id: Date.now().toString(),
        link: '',
        platform: '',
        videoType: '',
        productName: '',
        notes: '',
        isFaceForward: true,
        fileName: '',
      };
    }

    if (data.type === 'file' && data.fileName) {
      newVideos[index] = {
        ...newVideos[index],
        fileName: data.fileName,
        link: `[File: ${data.fileName}]`,
        platform: 'Local File',
      };
    } else if (data.type === 'link' && data.link) {
      newVideos[index] = {
        ...newVideos[index],
        link: data.link,
        fileName: '',
      };
    }

    setField('portfolioVideoLinks', newVideos);
  };

  const handleDeleteVideo = (index: number) => {
    const newVideos = [...portfolioVideoLinks];
    newVideos.splice(index, 1);
    setField('portfolioVideoLinks', newVideos);
  };

  const handleUpdateVideo = (index: number, field: string, value: string | boolean) => {
    const newVideos = [...portfolioVideoLinks];
    if (newVideos[index]) {
      newVideos[index] = { ...newVideos[index], [field]: value };
      setField('portfolioVideoLinks', newVideos);
    }
  };

  const handleIntroUpload = (data: { type: 'file' | 'link'; file?: File; link?: string; fileName?: string }) => {
    if (data.type === 'file' && data.fileName) {
      setField('introVideoFileName', data.fileName);
      setField('introVideoLink', `[File: ${data.fileName}]`);
      setField('introVideoPlatform', 'Local File');
      setField('introVideoUploaded', true);
    } else if (data.type === 'link' && data.link) {
      setField('introVideoLink', data.link);
      setField('introVideoFileName', '');
      setField('introVideoUploaded', true);
    }
  };

  const handleDeleteIntroVideo = () => {
    setField('introVideoUploaded', false);
    setField('introVideoLink', '');
    setField('introVideoPlatform', '');
    setField('introVideoFileName', '');
  };

  const handlePitchUpload = (data: { type: 'file' | 'link'; file?: File; link?: string; fileName?: string }) => {
    if (data.type === 'file' && data.fileName) {
      setField('pitchVideoFileName', data.fileName);
      setField('pitchVideoLink', `[File: ${data.fileName}]`);
      setField('pitchVideoPlatform', 'Local File');
      setField('pitchVideoUploaded', true);
    } else if (data.type === 'link' && data.link) {
      setField('pitchVideoLink', data.link);
      setField('pitchVideoFileName', '');
      setField('pitchVideoUploaded', true);
    }
  };

  const handleDeletePitchVideo = () => {
    setField('pitchVideoUploaded', false);
    setField('pitchVideoLink', '');
    setField('pitchVideoPlatform', '');
    setField('pitchVideoFileName', '');
  };

  const validVideosCount = portfolioVideoLinks.filter(v => v && v.link).length;
  const totalPhotos = portfolioPhotos?.length || 0;
  const totalVideos = validVideosCount;
  const totalPortfolioPieces = totalPhotos + totalVideos;

  const videoSlots = [...portfolioVideoLinks];
  while (videoSlots.length < 10) {
    videoSlots.push({
      id: `temp-${videoSlots.length}`,
      link: '',
      platform: '',
      videoType: '',
      productName: '',
      notes: '',
      isFaceForward: true,
    });
  }

  const getReadinessMessage = () => {
    if (totalPortfolioPieces === 0 || totalPortfolioPieces <= 2) {
      return "Let's get started - brands need to see your work before they hire you";
    } else if (totalPortfolioPieces >= 3 && totalPortfolioPieces <= 5) {
      return "Good start - keep adding more variety to strengthen your portfolio";
    } else if (totalPortfolioPieces >= 6 && totalPortfolioPieces <= 9) {
      return "Strong portfolio - you are ready to start reaching out to brands";
    } else if (totalPortfolioPieces >= 10 && totalPortfolioPieces <= 15) {
      return "Excellent portfolio - you have what it takes to land brand deals";
    } else {
      return "Outstanding - your portfolio is complete and you are ready to pitch any brand with full confidence";
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
          Your Two Foundation Videos
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>
          Film these first before anything else. Scripts for both are in the Script Builder tab.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)',
              border: '2px solid #c9a84c',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Upload size={24} style={{ color: '#c9a84c' }} />
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#e8c96a',
                  margin: 0,
                }}
              >
                Upload Your Introduction Video
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '12px', fontStyle: 'italic' }}>
              The anchor of your entire portfolio - brands watch this first
            </p>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(201,168,76,0.2)',
                border: '1px solid #c9a84c',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#e8c96a',
                marginBottom: '16px',
              }}
            >
              Portfolio Anchor
            </div>

          {introVideoUploaded ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(201,168,76,0.4)',
                borderRadius: '12px',
                padding: '20px',
                position: 'relative' as const,
              }}
            >
              <div
                style={{
                  position: 'absolute' as const,
                  top: '12px',
                  right: '12px',
                  background: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  borderRadius: '50%',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={16} style={{ color: '#c9a84c', fill: '#c9a84c' }} />
              </div>
              <button
                onClick={handleDeleteIntroVideo}
                style={{
                  padding: '6px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'absolute' as const,
                  top: '52px',
                  right: '12px',
                }}
              >
                <Trash2 size={16} style={{ color: '#ef4444' }} />
              </button>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  {introVideoFileName ? 'File Name' : 'Video Link'}
                </label>
                {introVideoFileName ? (
                  <div
                    style={{
                      padding: '8px 10px',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '6px',
                      color: '#e8c96a',
                      fontSize: '12px',
                      wordBreak: 'break-all',
                    }}
                  >
                    {introVideoFileName}
                  </div>
                ) : (
                  <input
                    type="url"
                    value={introVideoLink || ''}
                    onChange={(e) => setField('introVideoLink', e.target.value)}
                    placeholder="Paste your video link..."
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#f0ebff',
                      fontSize: '12px',
                    }}
                  />
                )}
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Hosting Platform
                </label>
                <select
                  value={introVideoPlatform || ''}
                  onChange={(e) => setField('introVideoPlatform', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                  }}
                >
                  <option value="">Select platform...</option>
                  {VIDEO_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: '#c9a84c',
                  fontStyle: 'italic',
                  background: 'rgba(201,168,76,0.1)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                Creator Introduction - Portfolio Anchor
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIntroUploadModalOpen(true)}
              style={{
                width: '100%',
                padding: '32px',
                background: 'rgba(255,255,255,0.03)',
                border: '2px dashed rgba(201,168,76,0.5)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Upload size={32} style={{ color: '#c9a84c' }} />
              <span style={{ fontSize: '14px', color: '#e8c96a', fontWeight: 700 }}>
                Click to Upload
              </span>
            </button>
          )}
          <button
            onClick={onNavigateToScriptBuilder}
            style={{
              marginTop: '12px',
              padding: '0',
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'block',
            }}
          >
            Need the script?  Go to Script Builder
          </button>
        </div>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,191,0.15) 0%, rgba(124,92,191,0.05) 100%)',
              border: '2px solid #7c5cbf',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Upload size={24} style={{ color: '#7c5cbf' }} />
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#9b8fb5',
                  margin: 0,
                }}
              >
                Upload Your Pitch Video
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '12px', fontStyle: 'italic' }}>
              Goes inside your outreach messages - opens the door with brands
            </p>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(201,168,76,0.2)',
                border: '1px solid #c9a84c',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#e8c96a',
                marginBottom: '16px',
              }}
            >
              Outreach Tool
            </div>

          {pitchVideoUploaded ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(201,168,76,0.4)',
                borderRadius: '12px',
                padding: '20px',
                position: 'relative' as const,
              }}
            >
              <div
                style={{
                  position: 'absolute' as const,
                  top: '12px',
                  right: '12px',
                  background: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  borderRadius: '50%',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={16} style={{ color: '#c9a84c', fill: '#c9a84c' }} />
              </div>
              <button
                onClick={handleDeletePitchVideo}
                style={{
                  padding: '6px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'absolute' as const,
                  top: '52px',
                  right: '12px',
                }}
              >
                <Trash2 size={16} style={{ color: '#ef4444' }} />
              </button>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  {pitchVideoFileName ? 'File Name' : 'Video Link'}
                </label>
                {pitchVideoFileName ? (
                  <div
                    style={{
                      padding: '8px 10px',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '6px',
                      color: '#e8c96a',
                      fontSize: '12px',
                      wordBreak: 'break-all',
                    }}
                  >
                    {pitchVideoFileName}
                  </div>
                ) : (
                  <input
                    type="url"
                    value={pitchVideoLink || ''}
                    onChange={(e) => setField('pitchVideoLink', e.target.value)}
                    placeholder="Paste your video link..."
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#f0ebff',
                      fontSize: '12px',
                    }}
                  />
                )}
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Hosting Platform
                </label>
                <select
                  value={pitchVideoPlatform || ''}
                  onChange={(e) => setField('pitchVideoPlatform', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#f0ebff',
                    fontSize: '12px',
                  }}
                >
                  <option value="">Select platform...</option>
                  {VIDEO_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: '#c9a84c',
                  fontStyle: 'italic',
                  background: 'rgba(201,168,76,0.1)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                Pitch Video - Outreach Tool
              </div>
            </div>
          ) : (
            <button
              onClick={() => setPitchUploadModalOpen(true)}
              style={{
                width: '100%',
                padding: '32px',
                background: 'rgba(255,255,255,0.03)',
                border: '2px dashed rgba(124,92,191,0.5)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Upload size={32} style={{ color: '#7c5cbf' }} />
              <span style={{ fontSize: '14px', color: '#9b8fb5', fontWeight: 700 }}>
                Click to Upload
              </span>
            </button>
          )}
          <button
            onClick={onNavigateToPitchScript}
            style={{
              marginTop: '12px',
              padding: '0',
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'block',
            }}
          >
            Need the script?  Go to Script Builder
          </button>
        </div>
        </div>
      </div>

      <BeforeYouRecord />

      <CapCutEditingGuide />

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
          Your Portfolio Videos
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px', fontStyle: 'italic' }}>
          Add at least 5 videos covering different formats and styles
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div
            style={{
              padding: '8px 16px',
              background: validVideosCount >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.15)',
              border: `1px solid ${validVideosCount >= 5 ? 'rgba(34,197,94,0.3)' : 'rgba(201,168,76,0.3)'}`,
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 600,
              color: validVideosCount >= 5 ? '#22c55e' : '#c9a84c',
            }}
          >
            Videos added: {validVideosCount} / 10 - aim for at least 5 different video types
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {videoSlots.slice(0, 10).map((video, index) => {
            const hasLink = video && video.link;

            return (
              <div
                key={video.id || index}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: hasLink ? '2px solid rgba(201,168,76,0.4)' : '2px dashed #c9a84c',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '320px',
                  position: 'relative',
                }}
              >
                {hasLink ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(34,197,94,0.2)',
                          border: '1px solid rgba(34,197,94,0.4)',
                          borderRadius: '50%',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={16} style={{ color: '#22c55e' }} />
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(index)}
                        style={{
                          padding: '6px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '52px',
                          right: '12px',
                        }}
                      >
                        <Trash2 size={16} style={{ color: '#ef4444' }} />
                      </button>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        {video.fileName ? 'File Name' : 'Video Link'}
                      </label>
                      {video.fileName ? (
                        <div
                          style={{
                            padding: '8px 10px',
                            background: 'rgba(201,168,76,0.1)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            borderRadius: '6px',
                            color: '#e8c96a',
                            fontSize: '12px',
                            wordBreak: 'break-all',
                          }}
                        >
                          {video.fileName}
                        </div>
                      ) : (
                        <input
                          type="url"
                          value={video.link || ''}
                          onChange={(e) => handleUpdateVideo(index, 'link', e.target.value)}
                          placeholder="Paste your video link..."
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#f0ebff',
                            fontSize: '12px',
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        Hosting Platform
                      </label>
                      <select
                        value={video.platform || ''}
                        onChange={(e) => handleUpdateVideo(index, 'platform', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#f0ebff',
                          fontSize: '12px',
                        }}
                      >
                        <option value="">Select platform...</option>
                        {VIDEO_PLATFORMS.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        Video Type
                      </label>
                      <select
                        value={video.videoType || ''}
                        onChange={(e) => handleUpdateVideo(index, 'videoType', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#f0ebff',
                          fontSize: '12px',
                        }}
                      >
                        <option value="">Select type...</option>
                        <optgroup label="Face Forward">
                          {FACE_FORWARD_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Faceless">
                          {FACELESS_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        Face Forward or Faceless?
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleUpdateVideo(index, 'isFaceForward', true)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: video.isFaceForward ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${video.isFaceForward ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '6px',
                            color: video.isFaceForward ? '#c9a84c' : '#9b8fb5',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Face Forward
                        </button>
                        <button
                          onClick={() => handleUpdateVideo(index, 'isFaceForward', false)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: !video.isFaceForward ? 'rgba(124,92,191,0.2)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${!video.isFaceForward ? '#7c5cbf' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '6px',
                            color: !video.isFaceForward ? '#7c5cbf' : '#9b8fb5',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Faceless
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        What product did you feature?
                      </label>
                      <input
                        type="text"
                        value={video.notes || ''}
                        onChange={(e) => handleUpdateVideo(index, 'notes', e.target.value)}
                        placeholder="e.g., my moisturizer, protein powder..."
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#f0ebff',
                          fontSize: '12px',
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setUploadModalIndex(index)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                      padding: '32px',
                    }}
                  >
                    <Upload size={32} style={{ color: '#c9a84c' }} />
                    <span style={{ fontSize: '13px', color: '#d0c9e0', textAlign: 'center', fontWeight: 600 }}>
                      Upload Your Video
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(139,105,20,0.08))',
          border: '2px solid rgba(201,168,76,0.25)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '16px' }}>
          Portfolio Readiness
        </h3>
        <p style={{ fontSize: '14px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '12px' }}>
          {getReadinessMessage()}
        </p>
        <p style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic', margin: 0 }}>
          Tip: Include at least one Faceless video in your portfolio - brands that run paid ads specifically look for faceless content creators.
        </p>
      </div>

      {uploadModalIndex !== null && (
        <VideoUploadModal
          onClose={() => setUploadModalIndex(null)}
          onUpload={(data) => {
            handleUpload(uploadModalIndex, data);
            setUploadModalIndex(null);
          }}
        />
      )}

      {introUploadModalOpen && (
        <VideoUploadModal
          onClose={() => setIntroUploadModalOpen(false)}
          onUpload={(data) => {
            handleIntroUpload(data);
            setIntroUploadModalOpen(false);
          }}
        />
      )}

      {pitchUploadModalOpen && (
        <VideoUploadModal
          onClose={() => setPitchUploadModalOpen(false)}
          onUpload={(data) => {
            handlePitchUpload(data);
            setPitchUploadModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
