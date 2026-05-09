import { useCampaignStore } from '../store/campaignStore';

export default function HomeHeader() {
  const signOut = useCampaignStore((s) => s.signOut);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between py-4 px-6"
      style={{ background: 'transparent' }}
    >
      <div />
      <button
        type="button"
        onClick={() => void signOut()}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgba(212, 169, 60, 1)';
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.textShadow = '0 0 12px rgba(212, 169, 60, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(212, 169, 60, 1)';
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.textShadow = 'none';
        }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(212, 169, 60, 1)',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          opacity: 1,
          transition: 'opacity 200ms ease, color 200ms ease',
        }}
      >
        Log out
      </button>
    </header>
  );
}
