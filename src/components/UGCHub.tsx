import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import { X, Check, ChevronLeft, ChevronRight, ArrowLeft, Download, Mail, Globe, Info, Search as SearchIcon } from 'lucide-react';
import PortfolioBuilder from './PortfolioBuilder';
import DatePicker from './DatePicker';
import ScriptStudio from './ScriptStudio';
import ActionPlan from './ActionPlan';
import UGCPack from './UGCPack';
import ResetModal from './ResetModal';
import UGCNavigation, { UGCBreadcrumb } from './UGCNavigation';
import RateCardBuilder from './RateCardBuilder';
import PortfolioPhotosTab from './PortfolioPhotosTab';
import PortfolioVideos from './PortfolioVideos';
import IncomeCommandCentre from './IncomeCommandCentre';
import GlobalSearch from './GlobalSearch';
import WhereToFindBrands from './WhereToFindBrands';
import UGCGearGuide from './UGCGearGuide';

const UGC_SECTIONS = [
  { id: 'ugc-dashboard', icon: '🏠', label: 'Dashboard', sublabel: 'Your overview' },
  { id: 'ugc-niche', icon: '🎯', label: 'Find Your Niche', sublabel: 'Discover what fits you' },
  { id: 'ugc-rates', icon: '💰', label: 'Rate Card', sublabel: 'Set your prices' },
  { id: 'ugc-portfolio-photos', icon: '📸', label: 'Portfolio Photos', sublabel: 'Build photo portfolio' },
  { id: 'ugc-portfolio-videos', icon: '🎬', label: 'Portfolio Videos', sublabel: 'Build video portfolio' },
  { id: 'ugc-portfolio', icon: '📂', label: 'Organise Your Portfolio', sublabel: 'Organize your work' },
  { id: 'ugc-pack', icon: '📦', label: 'UGC Pack', sublabel: 'Download everything' },
  { id: 'ugc-outreach-brands', icon: '🔍', label: 'Where To Find Brands', sublabel: 'Find & pitch brands' },
  { id: 'ugc-plan', icon: '📅', label: 'Action Plan', sublabel: 'Day 1 to Day 30' },
  { id: 'ugc-deal', icon: '🎉', label: 'You Landed a Deal', sublabel: 'What happens next' },
  { id: 'ugc-brand-scripts', icon: '✍️', label: 'Brand Deal Script Studio', sublabel: 'Paid brand scripts' },
  { id: 'ugc-income', icon: '💸', label: 'Sustainable Income', sublabel: 'Long-term strategy' },
];

const NICHE_OPTIONS = [
  'Beauty & Skincare',
  'Wellness & Fitness',
  'Tech & Gadgets',
  'Food & Beverage',
  'Fashion & Style',
  'Home & Lifestyle',
  'Health & Supplements',
  'Pet Products',
  'Baby & Parenting',
  'Travel & Outdoors',
];

const PORTFOLIO_TYPES = [
  'Product Unboxing',
  'Before & After',
  'Get Ready With Me (GRWM)',
  'Day in the Life',
  'Product Tutorial',
  'Product Review',
  'Problem & Solution',
  'Comparison Video',
  'Testimonial Style',
  'Lifestyle Integration',
];

export default function UGCHub() {
  const store = useCampaignStore();
  const { ugcCurrentSection, setField, resetMode, reset } = store;
  const [activeSection, setActiveSection] = useState(ugcCurrentSection || 'ugc-dashboard');
  const [showResetModal, setShowResetModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setField('ugcCurrentSection', sectionId);
  };

  const handleBackToHome = () => {
    resetMode();
  };

  const handleGlobalReset = () => {
    reset();
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'ugc-dashboard':
        return <DashboardPage onNavigate={handleSectionChange} />;
      case 'ugc-niche':
        return <NichePage onNavigate={handleSectionChange} />;
      case 'ugc-rates':
        return <RateCardBuilder />;
      case 'ugc-portfolio-photos':
        return <PortfolioPhotosPage onNavigate={handleSectionChange} />;
      case 'ugc-portfolio-videos':
        return <PortfolioVideosPage onNavigate={handleSectionChange} />;
      case 'ugc-portfolio':
        return <PortfolioPage />;
      case 'ugc-pack':
        return <PackPage onNavigate={handleSectionChange} />;
      case 'ugc-outreach-brands':
        return <BrandsPage onNavigate={handleSectionChange} />;
      case 'ugc-plan':
        return <PlanPage />;
      case 'ugc-deal':
        return <DealPage />;
      case 'ugc-brand-scripts':
        return <BrandScriptsPage />;
      case 'ugc-income':
        return <IncomePage />;
      default:
        return <DashboardPage onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* UGC Sidebar */}
      <div
        style={{
          width: '280px',
          background: '#0d0b1a',
          borderRight: '1px solid rgba(201,168,76,0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 20px',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={handleBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              marginBottom: '20px',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#e8c96a')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#9b8fb5')}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '24px',
              fontWeight: 700,
              color: '#e8c96a',
              letterSpacing: '0.2em',
              textAlign: 'center',
              marginBottom: '4px',
            }}
          >
            VELOUR
          </h1>
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              margin: '12px 0 20px 0',
            }}
          />

          <GlobalSearch onNavigate={handleSectionChange} />
        </div>

        <button
          type="button"
          onClick={() => setField('creatorMode', '')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#c9a84c',
            cursor: 'pointer',
            textAlign: 'center',
            width: '100%',
            marginBottom: '24px',
            transition: 'all 0.2s',
            fontFamily: 'Syne, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
            e.currentTarget.style.borderColor = '#c9a84c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
          }}
        >
          ← Switch to Content Creator
        </button>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {UGC_SECTIONS.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionChange(section.id)}
                style={{
                  width: '100%',
                  background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #c9a84c' : '3px solid transparent',
                  padding: '16px 16px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '0 8px 8px 0',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '20px' }}>{section.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isActive ? '#f0ebff' : '#9b8fb5',
                      fontFamily: 'Syne, sans-serif',
                      marginBottom: '2px',
                    }}
                  >
                    {section.label}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6a5f80' }}>{section.sublabel}</div>
                </div>
                {isActive && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#c9a84c',
                      color: '#12102a',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {index + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#c9a84c',
            cursor: 'pointer',
            textAlign: 'center',
            width: '100%',
            marginTop: '16px',
            transition: 'all 0.2s',
            fontFamily: 'Syne, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
            e.currentTarget.style.borderColor = '#c9a84c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
          }}
        >
          Reset / Start Fresh
        </button>

        <p
          style={{
            fontSize: '10px',
            fontStyle: 'italic',
            color: '#4a3f66',
            textAlign: 'center',
            fontFamily: 'Syne, sans-serif',
            marginTop: '12px',
          }}
        >
          Where Creators Become Empires
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#12102a',
          position: 'relative',
        }}
      >
        {/* Mobile Search Button */}
        <button
          onClick={() => setShowMobileSearch(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            display: 'none',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
            border: 'none',
            color: '#0a0610',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
            zIndex: 1000,
          }}
          className="mobile-search-btn"
        >
          <SearchIcon size={20} />
        </button>

        {/* Breadcrumb */}
        <UGCBreadcrumb currentSection={activeSection} />

        {/* Content with bottom padding for fixed navigation */}
        <div style={{ padding: '0 48px 120px 48px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Navigation */}
        <UGCNavigation currentSection={activeSection} onNavigate={handleSectionChange} />
      </div>

      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleGlobalReset}
        type="global"
      />

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'flex-start',
            padding: '20px',
          }}
          onClick={() => setShowMobileSearch(false)}
        >
          <div
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1a0f2e 0%, #0a0610 100%)',
              borderRadius: '16px',
              padding: '20px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <GlobalSearch
              onNavigate={handleSectionChange}
              isMobile={true}
              onCloseMobile={() => setShowMobileSearch(false)}
            />
          </div>
        </div>
      )}

      <style>
        {`
          @media (max-width: 768px) {
            .mobile-search-btn {
              display: flex !important;
            }
          }
        `}
      </style>
    </div>
  );
}

function DashboardPage({ onNavigate }: { onNavigate: (section: string) => void }) {
  const {
    ugcSelectedNiche,
    ugcExperience,
    ugcRatePerVideo,
    ugcPortfolioChecklist,
    ugcPitches,
    rateCardPortfolioPieces,
    setField,
  } = useCampaignStore();

  const [showRatesModal, setShowRatesModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [showPortfolioTooltip, setShowPortfolioTooltip] = useState(false);

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '42px',
          fontWeight: 600,
          color: '#f0ebff',
          marginBottom: '12px',
        }}
      >
        UGC Creator Hub
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Your complete system for landing brand deals and getting paid to create
      </p>

      {/* Education Block - Now at the top */}
      <div
        style={{
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
          ✦ What is UGC and why do brands pay for it?
        </h3>
        <p style={{ fontSize: '13px', color: '#9b8fb5', lineHeight: '1.8', marginBottom: '16px' }}>
          UGC stands for User Generated Content. Brands pay everyday creators — people with no massive
          following — to make authentic videos and photos featuring their products. Why? Because real
          people trust real people. A genuine video from someone who looks like their customer converts
          10x better than a polished ad. You do not need 10,000 followers. You do not need expensive
          equipment. You need a phone, good lighting and the ability to talk about a product naturally.
          Velour handles the rest.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { num: '$150–$500', label: 'avg pay per video' },
            { num: '0', label: 'followers needed' },
            { num: '72hrs', label: 'avg brand response' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#17152e',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '16px',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  color: '#e8c96a',
                  fontWeight: 700,
                  marginBottom: '4px',
                }}
              >
                {stat.num}
              </div>
              <div style={{ fontSize: '11px', color: '#6a5f80' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Cards - Now below education block */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: 'Your Niche',
            value: ugcSelectedNiche || 'Not set',
            button: 'Define Now →',
            onClick: () => onNavigate('ugc-niche'),
          },
          {
            label: 'Portfolio Pieces',
            value: rateCardPortfolioPieces || '0',
            button: 'Set Rates →',
            onClick: () => onNavigate('ugc-rates'),
          },
          {
            label: 'Portfolio Progress',
            value: `${ugcPortfolioChecklist.length} / 10`,
            button: 'Build Portfolio →',
            onClick: () => setShowPortfolioModal(true),
          },
          {
            label: 'Pitches Sent',
            value: ugcPitches.length.toString(),
            button: '+ Add One',
            onClick: () => setShowPitchModal(true),
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: '#1c1a35',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#e8c96a',
                fontFamily: 'Cormorant Garamond, serif',
                marginBottom: '4px',
              }}
            >
              {card.value}
            </div>
            <div style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: card.label === 'Portfolio Pieces' ? '4px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              {card.label}
              {card.label === 'Portfolio Pieces' && (
                <div
                  style={{ position: 'relative', display: 'inline-flex' }}
                  onMouseEnter={() => setShowPortfolioTooltip(true)}
                  onMouseLeave={() => setShowPortfolioTooltip(false)}
                >
                  <Info size={14} style={{ color: '#c9a84c', cursor: 'help' }} />
                  {showPortfolioTooltip && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '120%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '280px',
                        padding: '12px',
                        background: '#252340',
                        border: '1.5px solid #c9a84c',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        fontSize: '11px',
                        color: '#d0c9e0',
                        lineHeight: '1.5',
                        textAlign: 'left',
                      }}
                    >
                      Portfolio pieces are completed content samples that show brands what you can create. Think of them as your work examples — videos, photos or any content you have made that demonstrates your skills. Brands review your portfolio before deciding to hire you. The more variety you have the better your chances of landing deals.
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #c9a84c',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {card.label === 'Portfolio Pieces' && (
              <div style={{ fontSize: '9px', color: '#9b8fb5', marginBottom: '12px', lineHeight: '1.4', fontStyle: 'italic' }}>
                Completed content samples that show brands what you can do
              </div>
            )}
            <button
              type="button"
              onClick={card.onClick}
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.2)',
                color: '#c9a84c',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>

      <UGCGearGuide />

      {/* Modals */}
      <RatesModal show={showRatesModal} onClose={() => setShowRatesModal(false)} />
      <PortfolioModal show={showPortfolioModal} onClose={() => setShowPortfolioModal(false)} />
      <PitchModal show={showPitchModal} onClose={() => setShowPitchModal(false)} />
    </div>
  );
}

function RatesModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { ugcExperience, ugcRatePerVideo, setField } = useCampaignStore();
  const [experience, setExperience] = useState(ugcExperience || '');
  const [rate, setRate] = useState(ugcRatePerVideo || '');

  if (!show) return null;

  const handleSave = () => {
    setField('ugcExperience', experience);
    setField('ugcRatePerVideo', rate);
    onClose();
  };

  const experienceLevels = [
    { id: 'Beginner', label: 'Beginner', range: '$50-$150/video', desc: 'Just starting, building portfolio' },
    { id: 'Intermediate', label: 'Intermediate', range: '$150-$300/video', desc: '5-10 videos in portfolio' },
    { id: 'Advanced', label: 'Advanced', range: '$300-$800/video', desc: 'Proven results, repeat clients' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1c1a35',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f0ebff', fontFamily: 'Cormorant Garamond, serif' }}>
            Set Your Rates
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '20px' }}>
          Select your experience level and set your rate per video.
        </p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '12px' }}>
            EXPERIENCE LEVEL
          </label>
          {experienceLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setExperience(level.id)}
              style={{
                width: '100%',
                background: experience === level.id ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                border: experience === level.id ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: experience === level.id ? '#e8c96a' : '#f0ebff' }}>
                  {level.label}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#c9a84c' }}>{level.range}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#9b8fb5' }}>{level.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            YOUR RATE PER VIDEO
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', color: '#9b8fb5' }}>$</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="150"
              style={{
                flex: 1,
                background: '#17152e',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '10px',
                padding: '12px',
                color: '#f0ebff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!experience || !rate}
          style={{
            width: '100%',
            padding: '14px',
            background: experience && rate ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(201,168,76,0.2)',
            color: experience && rate ? '#0a0610' : '#9b8fb5',
            border: 'none',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: experience && rate ? 'pointer' : 'not-allowed',
          }}
        >
          Save Rates
        </button>
      </div>
    </div>
  );
}

function PortfolioModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { ugcPortfolioChecklist, setField } = useCampaignStore();
  const [checklist, setChecklist] = useState<string[]>(ugcPortfolioChecklist || []);

  if (!show) return null;

  const toggleItem = (item: string) => {
    if (checklist.includes(item)) {
      setChecklist(checklist.filter((i) => i !== item));
    } else {
      setChecklist([...checklist, item]);
    }
  };

  const handleSave = () => {
    setField('ugcPortfolioChecklist', checklist);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1c1a35',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f0ebff', fontFamily: 'Cormorant Garamond, serif' }}>
            Build Your Portfolio
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '20px' }}>
          Check off the video types you've created. Aim for 10 diverse examples to show brands your range.
        </p>

        <div style={{ marginBottom: '24px' }}>
          {PORTFOLIO_TYPES.map((type) => {
            const isChecked = checklist.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleItem(type)}
                style={{
                  width: '100%',
                  background: isChecked ? 'rgba(46,139,87,0.08)' : 'rgba(255,255,255,0.03)',
                  border: isChecked ? '1px solid rgba(46,139,87,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: isChecked ? '#2e8b57' : 'transparent',
                    border: isChecked ? 'none' : '2px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isChecked && <Check size={14} color="#fff" />}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, color: isChecked ? '#4ade80' : '#f0ebff' }}>
                  {type}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.06)',
            borderLeft: '3px solid #c9a84c',
            padding: '12px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#9b8fb5', fontStyle: 'italic' }}>
            Progress: {checklist.length} / 10 completed
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
            color: '#0a0610',
            border: 'none',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Save Progress
        </button>
      </div>
    </div>
  );
}

function PitchModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { ugcPitches, setField } = useCampaignStore();
  const [brandName, setBrandName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState('Not Sent Yet');
  const [notes, setNotes] = useState('');

  if (!show) return null;

  const handleSave = () => {
    const newPitch = {
      id: Date.now().toString(),
      brandName,
      date,
      platform,
      status,
      notes,
    };
    setField('ugcPitches', [...ugcPitches, newPitch]);
    setBrandName('');
    setDate(new Date().toISOString().split('T')[0]);
    setPlatform('');
    setStatus('Not Sent Yet');
    setNotes('');
    onClose();
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'Not Sent Yet': return '#9b8fb5';
      case 'Sent': return '#c9a84c';
      case 'Replied': return '#4a9eff';
      case 'Negotiating': return '#ff8c42';
      case 'Closed': return '#38d39f';
      case 'Rejected': return '#ff6b6b';
      default: return '#9b8fb5';
    }
  };

  const getStatusTextColor = (statusValue: string) => {
    switch (statusValue) {
      case 'Not Sent Yet': return '#f0ebff';
      case 'Rejected': return '#ffffff';
      default: return '#0a0610';
    }
  };

  const platforms = ['Email', 'Instagram DM', 'TikTok DM', 'LinkedIn', 'Brand Website Form', 'Other'];
  const statuses = ['Not Sent Yet', 'Sent', 'Replied', 'Negotiating', 'Closed', 'Rejected'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1c1a35',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f0ebff', fontFamily: 'Cormorant Garamond, serif' }}>
            Log Brand Pitch
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9b8fb5',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            BRAND NAME
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. Glossier, Nike, HelloFresh"
            style={{
              width: '100%',
              background: '#17152e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '10px',
              padding: '12px',
              color: '#f0ebff',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            DATE SENT
          </label>
          <DatePicker
            value={date ? new Date(date) : new Date()}
            onChange={(newDate) => setDate(newDate.toISOString().split('T')[0])}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            PLATFORM
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                style={{
                  background: platform === p ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                  border: platform === p ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px',
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: platform === p ? 700 : 500,
                  color: platform === p ? '#e8c96a' : '#9b8fb5',
                  cursor: 'pointer',
                  width: '100%',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            NOTES
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes about this brand..."
            rows={3}
            style={{
              width: '100%',
              background: '#17152e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '10px',
              padding: '12px',
              color: '#f0ebff',
              fontSize: '13px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', display: 'block', marginBottom: '8px' }}>
            STATUS
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
            {statuses.map((s) => {
              const isSelected = status === s;
              const isPurple = s === 'Not Sent Yet';
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  style={{
                    background: isSelected ? getStatusColor(s) : 'rgba(255,255,255,0.03)',
                    border: isSelected
                      ? (isPurple ? '1.5px solid #9b8fb5' : `1.5px solid ${getStatusColor(s)}`)
                      : (isPurple ? '1px solid #9b8fb5' : '1px solid rgba(255,255,255,0.08)'),
                    borderRadius: '100px',
                    padding: '8px 14px',
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? getStatusTextColor(s) : (isPurple ? '#9b8fb5' : '#9b8fb5'),
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = isPurple ? '#9b8fb5' : getStatusColor(s);
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = isPurple ? '#9b8fb5' : 'rgba(255,255,255,0.08)';
                    }
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!brandName}
          style={{
            width: '100%',
            padding: '14px',
            background: brandName ? '#c9a84c' : 'rgba(255,255,255,0.05)',
            color: brandName ? '#0a0610' : '#6c6c8e',
            border: 'none',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: brandName ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          LOG PITCH
        </button>
      </div>
    </div>
  );
}

// Placeholder pages
function NichePage({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { ugcNicheQ1, ugcNicheQ2, ugcNicheQ3, ugcNicheQ4, ugcNicheQ5, ugcNicheResult, ugcSelectedNiche, setField } = useCampaignStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [q1, setQ1] = useState<string[]>(ugcNicheQ1 || []);
  const [q2, setQ2] = useState<string[]>(Array.isArray(ugcNicheQ2) ? ugcNicheQ2 : ugcNicheQ2 ? [ugcNicheQ2] : []);
  const [q3, setQ3] = useState<string[]>(ugcNicheQ3 || []);
  const [q4, setQ4] = useState(ugcNicheQ4 || '');
  const [q5, setQ5] = useState(ugcNicheQ5 || '');
  const [result, setResult] = useState(ugcNicheResult || '');

  const questions = [
    {
      step: 1,
      title: 'What topics do you naturally talk about or enjoy?',
      helperText: 'Choose up to 2 topics',
      successMessage: "You've picked your top 2 niches — focused creators get hired faster.",
      maxSelections: 2,
      options: [
        'Beauty & Skincare',
        'Health & Wellness',
        'Fitness',
        'Food & Cooking',
        'Tech & Gadgets',
        'Fashion & Style',
        'Home & Lifestyle',
        'Faith & Spirituality',
        'Parenting',
        'Finance & Money',
        'Travel',
        'Personal Development',
      ],
      isMultiple: true,
    },
    {
      step: 2,
      title: 'What type of content feels most natural to you?',
      helperText: 'Choose up to 2 content types',
      successMessage: 'Perfect — 2 content types keeps your portfolio sharp and consistent.',
      maxSelections: 2,
      options: [
        'Talking to camera',
        'Voiceover only',
        'Text on screen',
        'Demonstration & tutorials',
        'Unboxing & reviews',
        'Before & after transformations',
      ],
      isMultiple: true,
    },
    {
      step: 3,
      title: 'What kind of brands would you love to work with?',
      helperText: 'Choose up to 3 brand categories',
      successMessage: 'Great — 3 brand categories gives you focus without limiting your opportunities.',
      maxSelections: 3,
      options: [
        'Beauty brands',
        'Health & supplement companies',
        'Food & beverage',
        'Tech companies',
        'Fashion & clothing',
        'Home & decor',
        'Fitness & wellness',
        'Faith-based brands',
        'Baby & family products',
      ],
      isMultiple: true,
    },
    {
      step: 4,
      title: 'What is your content style?',
      helperText: 'Choose your one signature style',
      options: [
        'Relatable & raw',
        'Polished & professional',
        'Funny & entertaining',
        'Educational & informative',
        'Inspirational & motivational',
        'Aesthetic & visual',
      ],
      isMultiple: false,
    },
    {
      step: 5,
      title: 'What is your availability for brand work?',
      helperText: 'Select your availability',
      options: [
        '1-2 videos per week',
        '3-5 videos per week',
        'Full time — open to multiple brands',
        'Project by project basis',
      ],
      isMultiple: false,
    },
  ];

  const currentQuestion = questions[currentStep - 1];

  const toggleMultipleChoice = (option: string, setter: React.Dispatch<React.SetStateAction<string[]>>, current: string[], maxSelections?: number) => {
    if (current.includes(option)) {
      setter(current.filter((item) => item !== option));
    } else {
      if (maxSelections && current.length >= maxSelections) {
        return;
      }
      setter([...current, option]);
    }
  };

  const getMaxSelections = (step: number) => {
    const question = questions.find(q => q.step === step);
    return question?.maxSelections;
  };

  const getSuccessMessage = (step: number) => {
    const question = questions.find(q => q.step === step);
    return question?.successMessage;
  };

  const isMaxReached = (step: number) => {
    const max = getMaxSelections(step);
    if (!max) return false;
    if (step === 1) return q1.length >= max;
    if (step === 2) return q2.length >= max;
    if (step === 3) return q3.length >= max;
    return false;
  };

  const canProceed = () => {
    if (currentStep === 1) return q1.length > 0;
    if (currentStep === 2) return q2.length > 0;
    if (currentStep === 3) return q3.length > 0;
    if (currentStep === 4) return q4 !== '';
    if (currentStep === 5) return q5 !== '';
    return false;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResult();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResult = () => {
    const topicsText = q1.length > 0 ? q1[0] : 'your chosen topics';
    const styleText = q4.toLowerCase();
    const brandText = q3.length > 0 ? q3[0].toLowerCase() : 'brand';
    const availabilityText = q5.toLowerCase();

    const generatedResult = `You are a ${styleText} UGC creator in the ${topicsText} space, ideal for ${brandText} — available for ${availabilityText}.`;

    setField('ugcNicheQ1', q1);
    setField('ugcNicheQ2', q2);
    setField('ugcNicheQ3', q3);
    setField('ugcNicheQ4', q4);
    setField('ugcNicheQ5', q5);
    setField('ugcNicheResult', generatedResult);
    setResult(generatedResult);

    setCurrentStep(6);
  };

  const handleSaveNiche = () => {
    setField('ugcSelectedNiche', result);
    setCurrentStep(1);
    onNavigate('ugc-dashboard');
  };

  const handleReset = () => {
    setQ1([]);
    setQ2([]);
    setQ3([]);
    setQ4('');
    setQ5('');
    setResult('');
    setCurrentStep(1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Find Your UGC Niche
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '8px' }}>
        {currentStep < 6 ? 'Answer 5 quick questions to discover your ideal UGC niche' : 'Your personalized niche recommendation'}
      </p>

      {currentStep < 6 && (
        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '13px', color: '#e8c96a', lineHeight: '1.6', margin: 0 }}>
            <strong style={{ fontWeight: 700 }}>What's a niche?</strong> It's the specific topic or category you'll create content about — like beauty, fitness, or tech. Finding your niche helps brands know exactly what you're good at and makes it easier to get hired.
          </p>
        </div>
      )}

      {currentStep < 6 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  height: '6px',
                  background: step <= currentStep ? 'linear-gradient(90deg, #c9a84c, #e8c96a)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  transition: 'all 0.3s',
                  boxShadow: step <= currentStep ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#9b8fb5', textAlign: 'right', fontWeight: 600 }}>
            Question {currentStep} of 5
          </div>
        </div>
      )}

      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {currentStep < 6 ? (
          <>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px', lineHeight: '1.5' }}>
              {currentQuestion.title}
            </h3>

            <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '24px' }}>
              {currentQuestion.helperText}
            </p>

            {currentQuestion.step === 4 && (
              <p style={{ fontSize: '11px', color: '#c9a84c', marginBottom: '20px', lineHeight: '1.6' }}>
                Your content style is your signature — own one style and master it.
              </p>
            )}

            {isMaxReached(currentStep) && currentQuestion.successMessage && (
              <div style={{
                background: 'rgba(46,139,87,0.08)',
                border: '1px solid rgba(46,139,87,0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
              }}>
                <p style={{ fontSize: '12px', color: '#2e8b57', fontWeight: 600, margin: 0 }}>
                  {currentQuestion.successMessage}
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {currentQuestion.options.map((option) => {
                let isSelected = false;
                let onClick = () => {};
                let isDisabled = false;
                let currentSelections: string[] = [];

                if (currentStep === 1) {
                  isSelected = q1.includes(option);
                  currentSelections = q1;
                  const maxReached = getMaxSelections(1) && q1.length >= getMaxSelections(1)!;
                  isDisabled = maxReached && !isSelected;
                  onClick = () => !isDisabled && toggleMultipleChoice(option, setQ1, q1, getMaxSelections(1));
                } else if (currentStep === 2) {
                  isSelected = q2.includes(option);
                  currentSelections = q2;
                  const maxReached = getMaxSelections(2) && q2.length >= getMaxSelections(2)!;
                  isDisabled = maxReached && !isSelected;
                  onClick = () => !isDisabled && toggleMultipleChoice(option, setQ2, q2, getMaxSelections(2));
                } else if (currentStep === 3) {
                  isSelected = q3.includes(option);
                  currentSelections = q3;
                  const maxReached = getMaxSelections(3) && q3.length >= getMaxSelections(3)!;
                  isDisabled = maxReached && !isSelected;
                  onClick = () => !isDisabled && toggleMultipleChoice(option, setQ3, q3, getMaxSelections(3));
                } else if (currentStep === 4) {
                  isSelected = q4 === option;
                  onClick = () => setQ4(option);
                } else if (currentStep === 5) {
                  isSelected = q5 === option;
                  onClick = () => setQ5(option);
                }

                return (
                  <button
                    key={option}
                    onClick={onClick}
                    disabled={isDisabled}
                    style={{
                      padding: '14px 18px',
                      background: isSelected ? 'rgba(201,168,76,0.15)' : isDisabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid #c9a84c' : isDisabled ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.1)',
                      color: isSelected ? '#e8c96a' : isDisabled ? 'rgba(200,191,229,0.4)' : '#c8bfe5',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: isSelected ? 600 : 500,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                      boxShadow: isSelected ? '0 0 12px rgba(201,168,76,0.3)' : 'none',
                      opacity: isDisabled ? 0.4 : 1,
                      position: 'relative',
                    }}
                    onMouseOver={(e) => {
                      if (isSelected) {
                        const hint = document.createElement('div');
                        hint.id = `hint-${option}`;
                        hint.style.cssText = 'position: absolute; top: -8px; right: -8px; background: #c9a84c; color: #12102a; font-size: 9px; padding: 3px 6px; border-radius: 4px; font-weight: 700; pointer-events: none;';
                        hint.textContent = 'Click to swap';
                        e.currentTarget.appendChild(hint);
                      } else if (!isDisabled) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      const hint = document.getElementById(`hint-${option}`);
                      if (hint) hint.remove();
                      if (!isSelected && !isDisabled) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }
                    }}
                  >
                    {isSelected && <Check size={14} style={{ display: 'inline', marginRight: '6px' }} />}
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '32px',
              }}
            >
              <div style={{ fontSize: '14px', color: '#c9a84c', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Your UGC Niche
              </div>
              <p style={{ fontSize: '18px', color: '#f0ebff', lineHeight: '1.7', fontWeight: 500 }}>
                {result}
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '14px', color: '#c9a84c', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Your Selections
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '13px', color: '#9b8fb5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#e8c96a' }}>Topics:</strong> {q1.join(', ')}
                </div>
                <div style={{ fontSize: '13px', color: '#9b8fb5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#e8c96a' }}>Content Type:</strong> {q2}
                </div>
                <div style={{ fontSize: '13px', color: '#9b8fb5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#e8c96a' }}>Brands:</strong> {q3.join(', ')}
                </div>
                <div style={{ fontSize: '13px', color: '#9b8fb5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#e8c96a' }}>Style:</strong> {q4}
                </div>
                <div style={{ fontSize: '13px', color: '#9b8fb5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#e8c96a' }}>Availability:</strong> {q5}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#9b8fb5',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                Start Over
              </button>
              <button
                onClick={handleSaveNiche}
                style={{
                  flex: 2,
                  padding: '16px',
                  background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                  color: '#0a0610',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
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
                Save My Niche →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RatesPage() {
  const {
    rateCardCreatorName,
    rateCardCreatorTitle,
    rateCardEmail,
    rateCardPortfolioLink,
    rateCardPortfolioPieces,
    rateCardContentRates,
    rateCardTurnaround,
    rateCardRevisions,
    setField,
  } = useCampaignStore();

  const previewRef = useRef<HTMLDivElement>(null);

  const updateContentRate = (field: string, value: string) => {
    setField('rateCardContentRates', { ...rateCardContentRates, [field]: value });
  };

  const getInitials = (name: string) => {
    if (!name) return 'UC';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#1c1a35',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${rateCardCreatorName || 'creator'}-rate-card.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadPNG = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: '#1c1a35',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${rateCardCreatorName || 'creator'}-rate-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Rate Card Builder
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Create a professional rate card for your UGC services
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Form Section */}
        <div
          style={{
            background: '#1c1a35',
            border: '1.5px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '32px',
            height: 'fit-content',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0ebff', marginBottom: '24px' }}>Your Information</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Creator Name
              </label>
              <input
                type="text"
                value={rateCardCreatorName}
                onChange={(e) => setField('rateCardCreatorName', e.target.value)}
                placeholder="Your full name"
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
                Title/Label
              </label>
              <input
                type="text"
                value={rateCardCreatorTitle}
                onChange={(e) => setField('rateCardCreatorTitle', e.target.value)}
                placeholder="e.g., UGC Creator, Content Creator"
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
                Email Address
              </label>
              <input
                type="email"
                value={rateCardEmail}
                onChange={(e) => setField('rateCardEmail', e.target.value)}
                placeholder="your@email.com"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '4px', fontWeight: 600 }}>
                Portfolio Link
              </label>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '8px', fontStyle: 'italic' }}>
                Google Drive, Canva Portfolio, Dropbox, or any link where your work lives
              </p>
              <input
                type="text"
                value={rateCardPortfolioLink}
                onChange={(e) => setField('rateCardPortfolioLink', e.target.value)}
                placeholder="https://drive.google.com/..."
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
              <p style={{ fontSize: '11px', color: '#c9a84c', marginTop: '8px', lineHeight: '1.5' }}>
                You do not need a social media account to be a UGC creator. Brands hire you to create content they post on their own channels. Your portfolio link is all you need.
              </p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Portfolio Pieces
              </label>
              <input
                type="number"
                value={rateCardPortfolioPieces}
                onChange={(e) => setField('rateCardPortfolioPieces', e.target.value)}
                placeholder="0"
                min="0"
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

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginTop: '16px', marginBottom: '8px' }}>
              Content Type Rates
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Short Form Video (under 60 seconds)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.shortFormVideo}
                    onChange={(e) => updateContentRate('shortFormVideo', e.target.value)}
                    placeholder="150"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Long Form Video (60 seconds and above)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.longFormVideo}
                    onChange={(e) => updateContentRate('longFormVideo', e.target.value)}
                    placeholder="250"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Photo Package (3-5 images)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.photoPackage}
                    onChange={(e) => updateContentRate('photoPackage', e.target.value)}
                    placeholder="100"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Unboxing & Review Video
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.unboxingReview}
                    onChange={(e) => updateContentRate('unboxingReview', e.target.value)}
                    placeholder="200"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Testimonial Video
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.testimonial}
                    onChange={(e) => updateContentRate('testimonial', e.target.value)}
                    placeholder="175"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Tutorial & How-To Video
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.tutorialHowTo}
                    onChange={(e) => updateContentRate('tutorialHowTo', e.target.value)}
                    placeholder="200"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', fontWeight: 600 }}>
                  Bundle Package (Video + Photos)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                  <input
                    type="text"
                    value={rateCardContentRates.bundlePackage}
                    onChange={(e) => updateContentRate('bundlePackage', e.target.value)}
                    placeholder="300"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Turnaround Time
              </label>
              <input
                type="text"
                value={rateCardTurnaround}
                onChange={(e) => setField('rateCardTurnaround', e.target.value)}
                placeholder="5-7 business days"
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
                Revision Policy
              </label>
              <input
                type="text"
                value={rateCardRevisions}
                onChange={(e) => setField('rateCardRevisions', e.target.value)}
                placeholder="2 revisions included"
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
        </div>

        {/* Live Preview Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0ebff' }}>Live Preview</h3>
            <button
              onClick={downloadPDF}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                color: '#0a0610',
                border: 'none',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
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
              <Download size={16} />
              Download Rate Card →
            </button>
          </div>

          {/* Rate Card Preview */}
          <div
            ref={previewRef}
            style={{
              background: '#faf8f3',
              borderRadius: '12px',
              padding: '48px',
              minHeight: '800px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {/* Monogram */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid #c9a84c',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#8B6914',
                  marginBottom: '16px',
                }}
              >
                {getInitials(rateCardCreatorName)}
              </div>
              <h1
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#2a2420',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}
              >
                {rateCardCreatorName || 'Your Name'}
              </h1>
              <div
                style={{
                  fontSize: '14px',
                  color: '#8B6914',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: 600,
                }}
              >
                {rateCardCreatorTitle}
              </div>
            </div>

            <div style={{ borderTop: '2px solid #c9a84c', marginTop: '32px', marginBottom: '32px' }} />

            {/* Contact Info and Photo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', marginBottom: '32px' }}>
              <div>
                <h3
                  style={{
                    fontSize: '12px',
                    color: '#8B6914',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  Get In Touch
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rateCardEmail && (
                    <div style={{ fontSize: '13px', color: '#4a4340' }}>
                      <Mail size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                      {rateCardEmail}
                    </div>
                  )}
                  {rateCardWebsite && (
                    <div style={{ fontSize: '13px', color: '#4a4340' }}>
                      <Globe size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                      {rateCardWebsite}
                    </div>
                  )}
                </div>
              </div>
              {rateCardProfilePhoto && (
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '3px solid #c9a84c',
                  }}
                >
                  <img
                    src={rateCardProfilePhoto}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Services */}
            {rateCardServices.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '12px',
                    color: '#8B6914',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  Services
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {rateCardServices.map((service) => (
                    <div
                      key={service}
                      style={{
                        fontSize: '13px',
                        color: '#4a4340',
                        padding: '8px 12px',
                        background: 'rgba(201,168,76,0.1)',
                        borderRadius: '6px',
                        border: '1px solid rgba(139,105,20,0.2)',
                      }}
                    >
                      <Check size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: '#8B6914' }} />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rate Table */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '12px',
                  color: '#8B6914',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Rate Card
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #c9a84c' }}>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '12px 8px',
                        fontSize: '11px',
                        color: '#8B6914',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700,
                      }}
                    >
                      Platform
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '12px 8px',
                        fontSize: '11px',
                        color: '#8B6914',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700,
                      }}
                    >
                      Video
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '12px 8px',
                        fontSize: '11px',
                        color: '#8B6914',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700,
                      }}
                    >
                      Photo
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '12px 8px',
                        fontSize: '11px',
                        color: '#8B6914',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700,
                      }}
                    >
                      Followers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateCardPlatformRates.map((rate, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                      <td style={{ padding: '16px 8px', fontSize: '14px', color: '#2a2420', fontWeight: 600 }}>{rate.platform}</td>
                      <td style={{ padding: '16px 8px', fontSize: '14px', color: '#4a4340', textAlign: 'right' }}>
                        {rate.videoRate || '—'}
                      </td>
                      <td style={{ padding: '16px 8px', fontSize: '14px', color: '#4a4340', textAlign: 'right' }}>
                        {rate.photoRate || '—'}
                      </td>
                      <td style={{ padding: '16px 8px', fontSize: '14px', color: '#4a4340', textAlign: 'right' }}>
                        {rate.followers || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <div
              style={{
                background: 'rgba(201,168,76,0.1)',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid rgba(139,105,20,0.2)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#8B6914',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    Turnaround
                  </div>
                  <div style={{ fontSize: '13px', color: '#4a4340' }}>{rateCardTurnaround}</div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#8B6914',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    Revisions
                  </div>
                  <div style={{ fontSize: '13px', color: '#4a4340' }}>{rateCardRevisions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPhotosPage({ onNavigate }: { onNavigate: (section: string) => void }) {
  const handleNavigateToScriptBuilder = () => {
    onNavigate('ugc-portfolio-videos');
    const store = useCampaignStore.getState();
    store.setField('portfolioVideosDefaultTab', 'script-builder');
    store.setField('portfolioScriptVideoType', '🎬 Creator Introduction');
  };

  const handleNavigateToPitchScript = () => {
    onNavigate('ugc-portfolio-videos');
    const store = useCampaignStore.getState();
    store.setField('portfolioVideosDefaultTab', 'script-builder');
    store.setField('portfolioScriptVideoType', 'Pitch Video');
  };

  return <PortfolioPhotosTab onNavigateToScriptBuilder={handleNavigateToScriptBuilder} onNavigateToPitchScript={handleNavigateToPitchScript} />;
}

function PortfolioPage() {
  return <PortfolioBuilder />;
}

function PortfolioVideosPage({ onNavigate }: { onNavigate: (section: string) => void }) {
  const handleNavigateToScriptBuilder = () => {
    const store = useCampaignStore.getState();
    store.setField('portfolioVideosDefaultTab', 'script-builder');
    store.setField('portfolioScriptVideoType', '🎬 Creator Introduction');
  };

  return <PortfolioVideos />;
}

function BrandsPage({ onNavigate }: { onNavigate: (section: string) => void }) {
  return <WhereToFindBrands onNavigate={onNavigate} />;
}

function DealPage() {
  return <IncomeCommandCentre />;
}

function BrandScriptsPage() {
  return <ScriptStudio />;
}

function IncomePage() {
  const [activeTab, setActiveTab] = React.useState<'mindset' | 'income'>('mindset');

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '48px' }}>
        Talent gets you started. Resilience keeps you going.
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={() => setActiveTab('mindset')}
          style={{
            padding: '16px 24px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'mindset' ? '2px solid #c9a84c' : '2px solid transparent',
            color: activeTab === 'mindset' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🧠 Mindset
        </button>
        <button
          onClick={() => setActiveTab('income')}
          style={{
            padding: '16px 24px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'income' ? '2px solid #c9a84c' : '2px solid transparent',
            color: activeTab === 'income' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          💰 Sustainable Income
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'mindset' && (
        <div>
          <p style={{ color: '#d4cee8' }}>Mindset content coming soon...</p>
        </div>
      )}

      {activeTab === 'income' && (
        <div>
          <p style={{ color: '#d4cee8' }}>Income content coming soon...</p>
        </div>
      )}
    </div>
  );
}

function PlanPage() {
  return <ActionPlan />;
}

function PackPage({ onNavigate }: { onNavigate: (section: string) => void }) {
  return <UGCPack onNavigate={onNavigate} />;
}
