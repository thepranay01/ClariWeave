import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4 text-red-500">Something went wrong.</h1>
          <div className="bg-zinc-900 p-6 rounded border border-white/10 max-w-2xl w-full overflow-auto">
            <details className="whitespace-pre-wrap">
              <summary className="cursor-pointer font-mono mb-2">Error Details</summary>
              <p className="font-mono text-red-400 mb-4">{this.state.error && this.state.error.toString()}</p>
              <p className="font-mono text-xs text-gray-500">{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
            </details>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
