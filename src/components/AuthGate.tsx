import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useCampaignStore } from '../store/campaignStore';
import AuthScreen from './Auth/AuthScreen';

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const session = useCampaignStore((s) => s.session);
  const authLoading = useCampaignStore((s) => s.authLoading);
  const setSession = useCampaignStore((s) => s.setSession);
  const setAuthLoading = useCampaignStore((s) => s.setAuthLoading);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setAuthLoading(true);
      const {
        data: { session: current },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(current);
      setAuthLoading(false);
    };

    void run();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setAuthLoading]);

  if (authLoading) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-5 px-6"
        style={{
          background: 'linear-gradient(180deg, #222A58 0%, #1A1F4A 48%, #151A40 100%)',
        }}
      >
        <div
          className="h-11 w-11 shrink-0 rounded-full border-[3px] border-transparent border-t-[rgba(212,169,60,0.95)] border-r-[rgba(212,169,60,0.35)]"
          style={{
            animation: 'velourspin 0.85s linear infinite',
          }}
          role="status"
          aria-label="Loading"
        />
        <p
          className="text-center text-sm tracking-[0.02em]"
          style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(240,235,255,0.65)' }}
        >
          Loading Velour...
        </p>
        <style>{`
          @keyframes velourspin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return <>{children}</>;
}
