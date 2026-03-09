import { useState, useRef } from 'react';
import { X, Upload, Link2, Check } from 'lucide-react';

interface VideoUploadModalProps {
  onClose: () => void;
  onUpload: (data: { type: 'file' | 'link'; file?: File; link?: string; fileName?: string }) => void;
}

export default function VideoUploadModal({ onClose, onUpload }: VideoUploadModalProps) {
  const [selectedOption, setSelectedOption] = useState<'file' | 'link' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedLink, setPastedLink] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedOption('file');
    }
  };

  const handleConfirm = () => {
    if (selectedOption === 'file' && selectedFile) {
      onUpload({ type: 'file', file: selectedFile, fileName: selectedFile.name });
    } else if (selectedOption === 'link' && pastedLink) {
      onUpload({ type: 'link', link: pastedLink });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a0f2e 0%, #0a0610 100%)',
          border: '2px solid rgba(201,168,76,0.3)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} style={{ color: '#9b8fb5' }} />
        </button>

        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '24px',
            fontWeight: 600,
            color: '#f0ebff',
            marginBottom: '8px',
          }}
        >
          Upload Your Video
        </h2>
        <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '24px' }}>
          Choose how you'd like to add your portfolio video
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: selectedOption === 'file' ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${selectedOption === 'file' ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Upload size={24} style={{ color: '#c9a84c', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
                  📁 Upload from your device
                </div>
                <p style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '12px', fontStyle: 'italic' }}>
                  Select your video file from your phone or computer
                </p>
                {selectedFile && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(34,197,94,0.12)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                  >
                    <Check size={16} style={{ color: '#22c55e' }} />
                    <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>
                      {selectedFile.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.mov,.avi"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          <div
            style={{
              background: selectedOption === 'link' ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${selectedOption === 'link' ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <Link2 size={24} style={{ color: '#c9a84c', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
                  🔗 Paste a link instead
                </div>
                <p style={{ fontSize: '12px', color: '#9b8fb5', margin: 0, fontStyle: 'italic' }}>
                  Already uploaded to Google Drive, Canva or Dropbox? Paste your link here
                </p>
              </div>
            </div>
            <input
              type="url"
              value={pastedLink}
              onChange={(e) => {
                setPastedLink(e.target.value);
                if (e.target.value) setSelectedOption('link');
              }}
              placeholder="https://drive.google.com/..."
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
            {pastedLink && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginTop: '12px',
                }}
              >
                <Check size={16} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>Link saved</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#9b8fb5',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile && !pastedLink}
            style={{
              flex: 1,
              padding: '12px',
              background: selectedFile || pastedLink ? '#c9a84c' : 'rgba(201,168,76,0.2)',
              border: 'none',
              borderRadius: '8px',
              color: selectedFile || pastedLink ? '#0a0610' : '#9b8fb5',
              fontSize: '14px',
              fontWeight: 700,
              cursor: selectedFile || pastedLink ? 'pointer' : 'not-allowed',
              opacity: selectedFile || pastedLink ? 1 : 0.5,
            }}
          >
            Confirm Upload
          </button>
        </div>
      </div>
    </div>
  );
}
