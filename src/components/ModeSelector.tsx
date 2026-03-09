import { useCampaignStore } from '../store/campaignStore';

export default function ModeSelector() {
  const { setField } = useCampaignStore();

  const handleModeSelect = (mode: string) => {
    setField('creatorMode', mode);
  };

  return (
    <div
      style={{
        background: '#12102a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '32px',
            fontWeight: 700,
            color: '#e8c96a',
            letterSpacing: '0.2em',
            marginBottom: '12px',
            lineHeight: '1.5',
            overflow: 'visible',
          }}
        >
          VELOUR
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#c9a84c',
            fontWeight: 500,
            marginBottom: '8px',
            lineHeight: '1.6',
            overflow: 'visible',
          }}
        >
          Where Creators Become Empires
        </p>
        <p style={{ fontSize: '13px', color: '#9a8fa8', marginTop: '12px', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', overflow: 'visible' }}>
          Choose your path — we will build the right experience for you
        </p>
      </div>

      <div
        style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px' }}
      >
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '32px',
            fontWeight: 600,
            color: '#f0ebff',
            marginBottom: '8px',
            lineHeight: '1.5',
            overflow: 'visible',
          }}
        >
          What brings you to Velour today?
        </h2>
      </div>

      <div
        style={{
          maxWidth: '700px',
          width: '100%',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div
          onClick={() => handleModeSelect('content-creator')}
          style={{
            background: '#1c1a35',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '20px',
            padding: '32px 24px',
            flex: '1 1 300px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c9a84c';
            e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(201,168,76,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
            e.currentTarget.style.background = '#1c1a35';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>🎯</div>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '26px',
              fontWeight: 600,
              color: '#f0ebff',
              marginBottom: '10px',
              lineHeight: '1.5',
              overflow: 'visible',
            }}
          >
            I'm a Content Creator
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6a5f80',
              lineHeight: '1.8',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              overflow: 'visible',
            }}
          >
            You promote your own product, service, affiliate offer, digital product, course or
            personal brand. You create content to attract customers and build your empire.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            {[
              'Own Your Audience',
              'Promote Your Offer',
              'Build Long-Term Income',
              'No Brand Approval Needed',
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#c9a84c',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '10px',
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.6',
                  overflow: 'visible',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              borderRadius: '100px',
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            Start Creating →
          </button>
        </div>

        <div
          onClick={() => handleModeSelect('ugc-creator')}
          style={{
            background: '#1c1a35',
            border: '1px solid rgba(46,139,87,0.2)',
            borderRadius: '20px',
            padding: '32px 24px',
            flex: '1 1 300px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2e8b57';
            e.currentTarget.style.background = 'rgba(46,139,87,0.06)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(46,139,87,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(46,139,87,0.2)';
            e.currentTarget.style.background = '#1c1a35';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>🤝</div>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '26px',
              fontWeight: 600,
              color: '#f0ebff',
              marginBottom: '10px',
              lineHeight: '1.5',
              overflow: 'visible',
            }}
          >
            I'm a UGC Creator
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6a5f80',
              lineHeight: '1.8',
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
              overflow: 'visible',
            }}
          >
            You get paid by brands to create authentic content for them. No massive following needed
            — just your phone, your niche and the ability to create genuine content that converts.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            {[
              'No Followers Needed',
              '$150-500 Per Video',
              'Brand Deals',
              'Work Anywhere',
              'Flexible Hours',
              'Any Niche',
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(46,139,87,0.08)',
                  border: '1px solid rgba(46,139,87,0.15)',
                  color: '#4ade80',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '10px',
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.6',
                  overflow: 'visible',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            style={{
              background: 'linear-gradient(135deg, #1a5c35, #2e8b57)',
              color: '#ffffff',
              borderRadius: '100px',
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              lineHeight: '1.6',
              overflow: 'visible',
            }}
          >
            Enter UGC Hub →
          </button>
        </div>
      </div>

      <p
        style={{
          fontSize: '11px',
          color: '#4a3f66',
          textAlign: 'center',
          marginTop: '24px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.6',
          overflow: 'visible',
        }}
      >
        Not sure? You can switch modes at any time from the sidebar.
      </p>
    </div>
  );
}
