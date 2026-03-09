import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Camera, Trash2, Upload, Sparkles, X } from 'lucide-react';
import PortfolioPhotoGuide from './PortfolioPhotoGuide';

const PHOTO_TYPES = [
  'Flat Lay Product Shot',
  'Lifestyle Hold Shot',
  'Face With Product Shot',
  'Close Up Detail Shot',
  'Before & After Photo Set',
  'In Context Lifestyle Shot',
  'Unboxing Flat Lay',
  'Texture & Application Shot',
  'Other',
];

interface PortfolioPhotosTabProps {
  onNavigateToScriptBuilder?: () => void;
}

interface PortfolioPhotosTabProps {
  onNavigateToScriptBuilder?: () => void;
  onNavigateToPitchScript?: () => void;
}

export default function PortfolioPhotosTab({ onNavigateToScriptBuilder, onNavigateToPitchScript }: PortfolioPhotosTabProps) {
  const { portfolioPhotos, portfolioPhotosBannerDismissed, setField } = useCampaignStore();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIndex(index);

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhotos = [...portfolioPhotos];
      if (newPhotos[index]) {
        newPhotos[index] = {
          ...newPhotos[index],
          url: reader.result as string,
        };
      } else {
        newPhotos[index] = {
          id: Date.now().toString() + index,
          url: reader.result as string,
          photoType: '',
          productName: '',
        };
      }
      setField('portfolioPhotos', newPhotos);
      setUploadingIndex(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...portfolioPhotos];
    newPhotos.splice(index, 1);
    setField('portfolioPhotos', newPhotos);
  };

  const handleUpdatePhotoType = (index: number, photoType: string) => {
    const newPhotos = [...portfolioPhotos];
    if (newPhotos[index]) {
      newPhotos[index] = { ...newPhotos[index], photoType };
      setField('portfolioPhotos', newPhotos);
    }
  };

  const handleUpdateProductName = (index: number, productName: string) => {
    const newPhotos = [...portfolioPhotos];
    if (newPhotos[index]) {
      newPhotos[index] = { ...newPhotos[index], productName };
      setField('portfolioPhotos', newPhotos);
    }
  };

  const uploadedCount = portfolioPhotos.filter(p => p && p.url).length;
  const uniqueTypes = new Set(portfolioPhotos.filter(p => p && p.photoType).map(p => p.photoType)).size;

  return (
    <div>
      {!portfolioPhotosBannerDismissed && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)',
            border: '2px solid rgba(201,168,76,0.4)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            position: 'relative' as const,
          }}
        >
          <button
            onClick={() => setField('portfolioPhotosBannerDismissed', true)}
            style={{
              position: 'absolute' as const,
              top: '16px',
              right: '16px',
              padding: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9b8fb5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <Sparkles size={28} style={{ color: '#c9a84c', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#e8c96a',
                  margin: '0 0 12px 0',
                }}
              >
                🎬 Before you upload a single photo — you need two videos first
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#d0c9e0',
                  margin: '0 0 20px 0',
                }}
              >
                Your Creator Introduction Video and your Pitch Video are the two most important pieces of content you will ever make as a UGC creator. They are generated in the Portfolio Videos page inside the Script Builder tab. Go there first, generate both scripts, film them, then come back here to build your photo portfolio.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={onNavigateToScriptBuilder}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3d 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0a0610',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Generate My Introduction Script →
                </button>
                <button
                  onClick={onNavigateToPitchScript}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '2px solid rgba(201,168,76,0.4)',
                    borderRadius: '8px',
                    color: '#c9a84c',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Generate My Pitch Video Script →
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#9b8fb5',
              fontStyle: 'italic',
              textAlign: 'center',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Already done? Dismiss this banner and continue building your photo portfolio.
          </div>
        </div>
      )}

      <PortfolioPhotoGuide />

      <div style={{ marginTop: '48px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
            Your Photo Uploads
          </h2>
          <div
            style={{
              padding: '8px 16px',
              background: uploadedCount >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.15)',
              border: `1px solid ${uploadedCount >= 5 ? 'rgba(34,197,94,0.3)' : 'rgba(201,168,76,0.3)'}`,
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 600,
              color: uploadedCount >= 5 ? '#22c55e' : '#c9a84c',
            }}
          >
            Photos uploaded: {uploadedCount} / 10 — aim for at least 5 different photo types
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {Array.from({ length: 10 }).map((_, index) => {
            const photo = portfolioPhotos[index];
            const hasPhoto = photo && photo.url;

            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {hasPhoto ? (
                  <>
                    <div
                      style={{
                        width: '100%',
                        height: '180px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative' as const,
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Portfolio ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <button
                        onClick={() => handleDeletePhoto(index)}
                        style={{
                          position: 'absolute' as const,
                          top: '8px',
                          right: '8px',
                          padding: '8px',
                          background: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash2 size={16} style={{ color: '#ef4444' }} />
                      </button>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        Photo Type
                      </label>
                      <select
                        value={photo.photoType || ''}
                        onChange={(e) => handleUpdatePhotoType(index, e.target.value)}
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
                        {PHOTO_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                        Product Name (optional)
                      </label>
                      <input
                        type="text"
                        value={photo.productName || ''}
                        onChange={(e) => handleUpdateProductName(index, e.target.value)}
                        placeholder="e.g., my moisturizer"
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
                  <label
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      cursor: uploadingIndex === index ? 'wait' : 'pointer',
                      padding: '32px',
                    }}
                  >
                    {uploadingIndex === index ? (
                      <>
                        <Upload size={32} style={{ color: '#c9a84c', animation: 'pulse 1.5s ease-in-out infinite' }} />
                        <span style={{ fontSize: '13px', color: '#c9a84c', fontWeight: 600 }}>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Camera size={32} style={{ color: '#9b8fb5' }} />
                        <span style={{ fontSize: '13px', color: '#d0c9e0', textAlign: 'center' }}>Upload your photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(index, file);
                          }}
                          style={{ display: 'none' }}
                        />
                      </>
                    )}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
