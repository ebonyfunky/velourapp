import { useState, useEffect } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { FileText, Video } from 'lucide-react';
import PortfolioScriptBuilder from './PortfolioScriptBuilder';
import PortfolioVideosTab from './PortfolioVideosTab';

export default function PortfolioVideos() {
  const { portfolioVideosTabState, portfolioVideosDefaultTab, setField, portfolioPhotos, portfolioVideoLinks } = useCampaignStore();
  const [activeTab, setActiveTab] = useState<'script-builder' | 'my-videos'>(portfolioVideosDefaultTab || portfolioVideosTabState || 'script-builder');

  const handleNavigateToScriptBuilder = () => {
    setActiveTab('script-builder');
    setField('portfolioVideosTabState', 'script-builder');
    setField('portfolioScriptVideoType', 'Creator Introduction');
  };

  const handleNavigateToPitchScript = () => {
    setActiveTab('script-builder');
    setField('portfolioVideosTabState', 'script-builder');
    setField('portfolioScriptVideoType', 'Pitch Video');
  };

  useEffect(() => {
    if (portfolioVideosDefaultTab) {
      setActiveTab(portfolioVideosDefaultTab);
      setField('portfolioVideosTabState', portfolioVideosDefaultTab);
      setField('portfolioVideosDefaultTab', null);
    } else if (portfolioVideosTabState && portfolioVideosTabState !== activeTab) {
      setActiveTab(portfolioVideosTabState);
    }
  }, [portfolioVideosTabState, portfolioVideosDefaultTab]);

  const handleTabChange = (tab: 'script-builder' | 'my-videos') => {
    setActiveTab(tab);
    setField('portfolioVideosTabState', tab);
  };

  const totalPhotos = portfolioPhotos?.length || 0;
  const totalVideos = portfolioVideoLinks?.filter(v => v && v.link)?.length || 0;
  const totalPortfolioPieces = totalPhotos + totalVideos;

  const getReadinessMessage = () => {
    if (totalPortfolioPieces === 0) {
      return "Let's get started — brands need to see your work before they hire you";
    } else if (totalPortfolioPieces >= 1 && totalPortfolioPieces <= 2) {
      return "Let's get started — brands need to see your work before they hire you";
    } else if (totalPortfolioPieces >= 3 && totalPortfolioPieces <= 5) {
      return "Good start — keep adding more variety to strengthen your portfolio";
    } else if (totalPortfolioPieces >= 6 && totalPortfolioPieces <= 9) {
      return "Strong portfolio — you are ready to start reaching out to brands";
    } else if (totalPortfolioPieces >= 10 && totalPortfolioPieces <= 15) {
      return "Excellent portfolio — you have what it takes to land brand deals";
    } else {
      return "Outstanding — your portfolio is complete and you are ready to pitch any brand with full confidence";
    }
  };

  return (
    <div style={{ padding: '0 0 120px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '42px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '12px',
          }}
        >
          Portfolio Videos
        </h1>
        <p style={{ fontSize: '15px', color: '#9b8fb5', lineHeight: '1.6', marginBottom: '24px' }}>
          Create compelling portfolio videos that showcase your UGC skills and attract brand partnerships
        </p>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(139,105,20,0.08))',
            border: '2px solid rgba(201,168,76,0.25)',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a' }}>
              Brand Readiness Score
            </div>
            <div
              style={{
                padding: '6px 16px',
                background: totalPortfolioPieces >= 10 ? 'rgba(34,197,94,0.15)' : totalPortfolioPieces >= 6 ? 'rgba(201,168,76,0.15)' : 'rgba(239,68,68,0.15)',
                border: `1px solid ${totalPortfolioPieces >= 10 ? 'rgba(34,197,94,0.3)' : totalPortfolioPieces >= 6 ? 'rgba(201,168,76,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 700,
                color: totalPortfolioPieces >= 10 ? '#22c55e' : totalPortfolioPieces >= 6 ? '#c9a84c' : '#ef4444',
              }}
            >
              {totalPortfolioPieces} / 20 Pieces
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#d0c9e0', margin: 0 }}>
            {getReadinessMessage()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => handleTabChange('script-builder')}
            style={{
              padding: '14px 28px',
              background: activeTab === 'script-builder' ? 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'script-builder' ? '3px solid #c9a84c' : '3px solid transparent',
              color: activeTab === 'script-builder' ? '#e8c96a' : '#9b8fb5',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <FileText size={18} />
            📝 Script Builder
          </button>
          <button
            onClick={() => handleTabChange('my-videos')}
            style={{
              padding: '14px 28px',
              background: activeTab === 'my-videos' ? 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'my-videos' ? '3px solid #c9a84c' : '3px solid transparent',
              color: activeTab === 'my-videos' ? '#e8c96a' : '#9b8fb5',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <Video size={18} />
            My Videos
          </button>
        </div>
      </div>

      {activeTab === 'script-builder' && <PortfolioScriptBuilder />}
      {activeTab === 'my-videos' && <PortfolioVideosTab onNavigateToScriptBuilder={handleNavigateToScriptBuilder} onNavigateToPitchScript={handleNavigateToPitchScript} />}
    </div>
  );
}
