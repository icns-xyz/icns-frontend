import type { AppProps } from "next/app";
import React from "react";
import ErrorBoundary from "../components/error-boundary";

import { GlobalStyle } from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </React.Fragment>
  );
}
