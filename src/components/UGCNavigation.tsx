import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  stepNumber: number;
}

const NAVIGATION_ORDER: NavigationItem[] = [
  { id: 'ugc-dashboard', label: 'Dashboard', stepNumber: 1 },
  { id: 'ugc-niche', label: 'Find Your Niche', stepNumber: 2 },
  { id: 'ugc-rates', label: 'Rate Card', stepNumber: 3 },
  { id: 'ugc-portfolio-photos', label: 'Portfolio Photos', stepNumber: 4 },
  { id: 'ugc-portfolio-videos', label: 'Portfolio Videos', stepNumber: 5 },
  { id: 'ugc-portfolio', label: 'Organise Your Portfolio', stepNumber: 6 },
  { id: 'ugc-pack', label: 'UGC Pack', stepNumber: 7 },
  { id: 'ugc-outreach-brands', label: 'Where To Find Brands', stepNumber: 8 },
  { id: 'ugc-plan', label: 'Action Plan', stepNumber: 9 },
  { id: 'ugc-deal', label: 'You Landed a Deal', stepNumber: 10 },
  { id: 'ugc-brand-scripts', label: 'Brand Deal Script Studio', stepNumber: 11 },
  { id: 'ugc-income', label: 'Sustainable Income', stepNumber: 12 },
];

interface UGCNavigationProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export function UGCBreadcrumb({ currentSection }: { currentSection: string }) {
  // Don't show breadcrumb on the UGC Pack page
  if (currentSection === 'ugc-pack') {
    return null;
  }

  const current = NAVIGATION_ORDER.find(item => item.id === currentSection);

  if (!current) return null;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '16px 0',
        fontSize: '13px',
        color: '#7a6f8f',
        fontWeight: 500,
        letterSpacing: '0.5px',
      }}
    >
      Step {current.stepNumber} of 13 — {current.label}
    </div>
  );
}

export default function UGCNavigation({ currentSection, onNavigate }: UGCNavigationProps) {
  // Don't show navigation on the UGC Pack page (it's a download/final page)
  if (currentSection === 'ugc-pack') {
    return null;
  }

  const currentIndex = NAVIGATION_ORDER.findIndex(item => item.id === currentSection);
  const currentItem = NAVIGATION_ORDER[currentIndex];
  const prevItem = currentIndex > 0 ? NAVIGATION_ORDER[currentIndex - 1] : null;
  const nextItem = currentIndex < NAVIGATION_ORDER.length - 1 ? NAVIGATION_ORDER[currentIndex + 1] : null;

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === NAVIGATION_ORDER.length - 1;

  const handleBack = () => {
    if (prevItem) {
      onNavigate(prevItem.id);
    }
  };

  const handleNext = () => {
    if (nextItem) {
      onNavigate(nextItem.id);
    }
  };

  const handleDownloadPack = () => {
    onNavigate('ugc-pack');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '280px',
        right: 0,
        background: 'linear-gradient(to top, #0a0610 0%, rgba(10,6,16,0.98) 80%, rgba(10,6,16,0.95) 100%)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Back Button */}
      <div style={{ flex: '0 0 auto' }}>
        {!isFirstPage && (
          <button
            onClick={handleBack}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#9b8fb5',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
              e.currentTarget.style.color = '#c9a84c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#9b8fb5';
            }}
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}
        {isFirstPage && <div />}
      </div>

      {/* Next/Action Button */}
      <div style={{ flex: '0 0 auto' }}>
        {isFirstPage && (
          <button
            onClick={handleNext}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
            }}
          >
            Get Started
            <ChevronRight size={16} />
          </button>
        )}
        {isLastPage && (
          <button
            onClick={handleDownloadPack}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
            }}
          >
            Download My UGC Pack
            <Download size={16} />
          </button>
        )}
        {!isFirstPage && !isLastPage && (
          <button
            onClick={handleNext}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
