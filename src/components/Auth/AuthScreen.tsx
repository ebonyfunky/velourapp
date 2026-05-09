import { useCallback, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { useCampaignStore } from '../../store/campaignStore';

const GOLD = '#D4A93C';
const MIDNIGHT_TEXT = '#1A1F4A';
const INPUT_BG = '#17152e';
const CARD_BG = '#252B5F';

type AuthMode = 'signup' | 'login' | 'forgot';

type InlineErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validateEmail(email: string): boolean {
  const t = email.trim();
  return t.length > 0 && t.includes('@');
}

export default function AuthScreen() {
  const setAuthError = useCampaignStore((s) => s.setAuthError);
  const authError = useCampaignStore((s) => s.authError);

  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [inlineErrors, setInlineErrors] = useState<InlineErrors>({});

  const clearAuthError = useCallback(() => setAuthError(null), [setAuthError]);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setForgotSent(false);
    clearAuthError();
    setInlineErrors({});
    if (next !== 'forgot') {
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    clearAuthError();
    const errs: InlineErrors = {};
    if (!validateEmail(email)) errs.email = 'Please enter a valid email.';
    if ((password ?? '').length < 8) errs.password = 'Password must be at least 8 characters.';
    if ((confirmPassword ?? '') !== password) errs.confirmPassword = 'Passwords do not match.';
    setInlineErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPending(true);
    const { error, data } = await supabase.auth.signUp({ email: email.trim(), password });
    setPending(false);

    if (error) {
      let msg = error.message;
      const low = msg.toLowerCase();
      if (
        low.includes('already registered') ||
        low.includes('user already') ||
        low.includes('already been registered')
      ) {
        msg = `${msg} Try logging in instead.`;
      }
      setAuthError(msg);
      return;
    }

    if (!data.session) {
      setAuthError(
        'Confirm your email to finish signing up, then come back here to log in.'
      );
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearAuthError();
    const errs: InlineErrors = {};
    if (!validateEmail(email)) errs.email = 'Please enter a valid email.';
    if ((password ?? '').length < 8) errs.password = 'Password must be at least 8 characters.';
    setInlineErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPending(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setPending(false);
    if (error) setAuthError(error.message);
  };

  const handleForgotSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearAuthError();
    const errs: InlineErrors = {};
    if (!validateEmail(email)) errs.email = 'Please enter a valid email.';
    setInlineErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPending(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    setPending(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setForgotSent(true);
  };

  const inputBase =
    'w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none ring-2 ring-transparent transition-shadow focus:border-[#D4A93C]/80 focus:ring-[#D4A93C]';
  const inputStyle: CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    background: INPUT_BG,
    borderColor: 'rgba(212, 169, 60, 0.35)',
    color: '#f0ebff',
  };

  const softRed = 'text-sm font-medium text-[rgba(236,162,162,0.95)]';

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden px-5 pb-10 pt-10 md:px-10"
      style={{
        background: 'linear-gradient(180deg, #222A58 0%, #1A1F4A 48%, #151A40 100%)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col items-center pt-8">
        <LogoBlock />

        <p
          className="mb-10 text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(240,235,255,0.62)',
            letterSpacing: '0.06em',
          }}
        >
          by Charlen Maison
        </p>

        <div
          className="relative mt-14 w-full rounded-[20px] border px-7 py-9 md:px-10 md:py-10"
          style={{
            background: CARD_BG,
            borderColor: 'rgba(212, 169, 60, 0.22)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          }}
        >
          {forgotSent && mode === 'forgot' ? (
            <div className="text-center">
              <p
                className="mb-6 text-[15px] leading-relaxed text-white/82"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Check your email for a reset link.
              </p>
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="mx-auto rounded-lg border bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em]"
                style={{ borderColor: 'rgba(212,169,60,0.5)', color: GOLD, fontFamily: 'Inter, sans-serif' }}
              >
                Back to log in
              </button>
            </div>
          ) : mode === 'signup' ? (
            <form onSubmit={handleSignUp} noValidate>
              <Heading title="Welcome to Velour" subtitle="Create your account to start building scroll-stopping content." />
              {authError ? <p className={`mb-4 ${softRed}`} style={{ fontFamily: 'Inter, sans-serif' }}>{authError}</p> : null}
              <Field label="Email" error={inlineErrors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setInlineErrors((o) => ({ ...o, email: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <Field label="Password" error={inlineErrors.password}>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                    setInlineErrors((o) => ({ ...o, password: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <Field label="Confirm password" error={inlineErrors.confirmPassword}>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(ev) => {
                    setConfirmPassword(ev.target.value);
                    setInlineErrors((o) => ({ ...o, confirmPassword: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <SubmitButton pending={pending} label="Create Account" pendingLabel="Creating account..." />
              <ToggleRow>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="border-0 bg-transparent p-0 font-semibold underline decoration-[rgba(212,169,60,0.45)] underline-offset-2"
                  style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
                >
                  Log in
                </button>
              </ToggleRow>
            </form>
          ) : mode === 'login' ? (
            <form onSubmit={handleLogin} noValidate>
              <Heading title="Welcome back" subtitle="Sign in to continue creating with Velour." />
              {authError ? <p className={`mb-4 ${softRed}`} style={{ fontFamily: 'Inter, sans-serif' }}>{authError}</p> : null}
              <Field label="Email" error={inlineErrors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setInlineErrors((o) => ({ ...o, email: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <Field label="Password" error={inlineErrors.password}>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                    setInlineErrors((o) => ({ ...o, password: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <SubmitButton pending={pending} label="Log In" pendingLabel="Signing in..." />
              <ToggleRow>
                <button
                  type="button"
                  onClick={() => {
                    switchMode('forgot');
                    setForgotSent(false);
                  }}
                  className="border-0 bg-transparent p-0 text-[13px] font-medium underline decoration-white/25 underline-offset-2 text-white/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Forgot password?
                </button>
              </ToggleRow>
              <ToggleRow>
                New to Velour?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="border-0 bg-transparent p-0 font-semibold underline decoration-[rgba(212,169,60,0.45)] underline-offset-2"
                  style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
                >
                  Sign up
                </button>
              </ToggleRow>
            </form>
          ) : (
            <form onSubmit={handleForgotSubmit} noValidate>
              <Heading title="Reset your password" subtitle="Enter your email and we'll send you a link to reset it." />
              {authError ? <p className={`mb-4 ${softRed}`} style={{ fontFamily: 'Inter, sans-serif' }}>{authError}</p> : null}
              <Field label="Email" error={inlineErrors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setInlineErrors((o) => ({ ...o, email: undefined }));
                    clearAuthError();
                  }}
                  className={inputBase}
                  style={inputStyle}
                />
              </Field>
              <SubmitButton pending={pending} label="Send Reset Link" pendingLabel="Sending..." />
              <ToggleRow>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="border-0 bg-transparent p-0 text-[13px] font-semibold underline decoration-[rgba(212,169,60,0.45)] underline-offset-2"
                  style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
                >
                  Back to log in
                </button>
              </ToggleRow>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function LogoBlock() {
  return (
    <img
      src="/velour-logo.png"
      alt="Velour by Charlen Maison"
      className="relative mx-auto mb-8 block h-auto w-full max-w-[200px]"
      style={{ filter: 'drop-shadow(0 0 28px rgba(212, 169, 60, 0.32))' }}
    />
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h1
        className="mb-2 text-center text-[clamp(26px,4vw,32px)] font-normal tracking-[-0.02em]"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
      >
        {title}
      </h1>
      <p
        className="mb-8 text-center text-sm leading-relaxed text-white/72"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {subtitle}
      </p>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(212,169,60,0.85)]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm font-medium text-[rgba(236,162,162,0.95)]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-2 w-full rounded-lg border-0 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-[opacity,transform,box-shadow] ${pending ? 'animate-pulse opacity-95' : ''}`}
      style={{
        fontFamily: 'Inter, sans-serif',
        background: GOLD,
        color: MIDNIGHT_TEXT,
        cursor: pending ? 'wait' : 'pointer',
        boxShadow: pending ? '0 4px 20px rgba(212,169,60,0.2)' : '0 8px 32px rgba(212,169,60,0.35)',
        opacity: pending ? 0.85 : 1,
      }}
      onMouseEnter={(e) => {
        if (pending) return;
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,169,60,0.5)';
      }}
      onMouseLeave={(e) => {
        if (pending) return;
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,169,60,0.35)';
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function ToggleRow({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-center text-[13px] text-white/55" style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </p>
  );
}
