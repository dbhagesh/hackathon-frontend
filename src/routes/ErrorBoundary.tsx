/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ErrorInfo, PropsWithChildren, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isFallbackRequired: boolean;
}

interface IState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<PropsWithChildren<IProps>, IState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    const win = window as any;
    if (win.nLogger?.logComponentErrors) {
      win.nLogger.logComponentErrors(
        `ErrorBoundary-${error.message}`,
        error.stack,
        errorInfo.componentStack,
        null,
        error
      );
    }
  }

  render() {
    if (this.state.errorInfo) {
      return this.props.isFallbackRequired ? <div>Error Page</div> : null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
