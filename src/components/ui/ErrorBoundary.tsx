'use client';

import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service in production
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-tg-destructive/10 flex items-center justify-center mb-5">
            <AlertTriangle className="w-8 h-8 text-tg-destructive" />
          </div>
          <h2 className="text-lg font-semibold text-tg-text mb-2">
            Что-то пошло не так
          </h2>
          <p className="text-sm text-tg-hint mb-6 max-w-[260px]">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </p>
          <Button
            variant="primary"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
          >
            Попробовать снова
          </Button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="mt-4 p-3 bg-tg-secondary-bg rounded-xl text-xs text-left overflow-x-auto max-w-full text-tg-hint">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
