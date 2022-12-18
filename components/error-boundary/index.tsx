import { captureException } from "@sentry/nextjs";
import Link from "next/link";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1>
          Oops.. there is something wrong.
          <br /> Please try again. <Link href="/">Go to home</Link>
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
