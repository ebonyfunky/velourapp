import { useCampaignStore } from '../store/campaignStore';

interface HomeHeaderProps {
  /** Post-login Welcome: BACK only (no header logo); returns user to Auth by signing out. */
  showBack?: boolean;
  /** Larger crest for profile Steps 1-7; other screens keep the compact mark. */
  headerLogoSize?: 'default' | 'profile';
}

export default function HomeHeader({ showBack = false, headerLogoSize = 'default' }: HomeHeaderProps) {
  const signOut = useCampaignStore((s) => s.signOut);

  const profileFlowHeader = !showBack && headerLogoSize === 'profile';

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 ${profileFlowHeader ? 'min-h-[6.5rem]' : 'min-h-[4.75rem]'}`}
      style={{ background: 'transparent' }}
    >
      <div className="pointer-events-none absolute left-8 top-6 z-10 flex items-center gap-5">
        {showBack ? (
          <button
            type="button"
            onClick={() => {
              void signOut();
            }}
            className="pointer-events-auto border-0 bg-transparent p-0 text-sm tracking-wider text-[#D4A93C] transition-opacity hover:opacity-80"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            BACK
          </button>
        ) : (
          <img
            src="/velour-logo.png"
            alt="Velour by Charlen Maison"
            className={`w-auto shrink-0 ${headerLogoSize === 'profile' ? 'h-20' : 'h-14'}`}
          />
        )}
      </div>

      <button
        type="button"
        className="pointer-events-auto absolute right-10 top-6 border-0 bg-transparent p-0"
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
