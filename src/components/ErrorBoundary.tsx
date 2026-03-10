import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useCampaignStore } from '../store/campaignStore';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error boundary caught:', error, errorInfo);
  }

  handleRecovery = () => {
    useCampaignStore.getState().resetMode();
    this.setState({ hasError: false, error: null });
    window.scrollTo(0, 0);
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const err = this.state.error;
      const message = err?.message ?? String(err);
      const stack = err?.stack ?? '';
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#12102a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            color: '#f0ebff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#e8c96a' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '14px', color: '#e8a0a0', marginBottom: '8px', textAlign: 'center', maxWidth: '560px', wordBreak: 'break-word' }}>
            {message}
          </p>
          {stack && (
            <pre style={{ fontSize: '11px', color: '#6a5f80', textAlign: 'left', maxWidth: '560px', maxHeight: '200px', overflow: 'auto', marginBottom: '24px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {stack}
            </pre>
          )}
          <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px', textAlign: 'center', maxWidth: '400px' }}>
            You can go back to the home screen and try again.
          </p>
          <button
            type="button"
            onClick={this.handleRecovery}
            style={{
              padding: '14px 28px',
              background: '#c9a84c',
              color: '#0d0b1a',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
