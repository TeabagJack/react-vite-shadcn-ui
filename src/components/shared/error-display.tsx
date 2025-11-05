import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorDisplay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('Error caught by ErrorDisplay:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-background p-6">
          <div className="max-w-md w-full">
            <div className="bg-destructive/10 border border-destructive/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-destructive mb-2">
                    Error Occurred
                  </h2>
                  <p className="text-sm text-foreground mb-4">
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </p>

                  {/* Error stack (collapsed by default) */}
                  <details className="text-xs text-muted-foreground mb-4">
                    <summary className="cursor-pointer hover:text-foreground">
                      View error details
                    </summary>
                    <pre className="mt-2 p-3 bg-background rounded border border-border overflow-auto max-h-48">
                      {this.state.error?.stack}
                    </pre>
                  </details>

                  <Button
                    onClick={this.handleReset}
                    variant="destructive"
                    size="sm"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
