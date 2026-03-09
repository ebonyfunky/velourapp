import { useEffect } from 'react';
import { useCampaignStore } from '../store/campaignStore';

export default function Toast() {
  const { toastMessage, toastVisible, setField } = useCampaignStore();

  useEffect(() => {
    if (toastVisible && toastMessage) {
      const timer = setTimeout(() => {
        setField('toastVisible', false);
        setTimeout(() => {
          setField('toastMessage', null);
        }, 500);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [toastVisible, toastMessage, setField]);

  const handleClose = () => {
    setField('toastVisible', false);
    setTimeout(() => {
      setField('toastMessage', null);
    }, 500);
  };

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        minWidth: '400px',
        maxWidth: '600px',
        width: 'calc(100% - 48px)',
        opacity: toastVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in, opacity 0.5s ease-out',
        pointerEvents: toastVisible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: '#12102a',
          borderLeft: '4px solid #c9a84c',
          borderRadius: '12px',
          padding: '16px 48px 16px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: '#c9a84c',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: '1',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ✕
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>✍️</span>
          <p
            style={{
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 500,
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            {toastMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
