import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import ErrorBoundary from "../components/error-boundary";
import { PageBackground } from "../styles/background";

import { GlobalStyle } from "../styles/global";
import { defaultTheme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <React.Fragment>
        <GlobalStyle />
        <ErrorBoundary>
          <PageBackground>
            <Component {...pageProps} />
          </PageBackground>
        </ErrorBoundary>
      </React.Fragment>
    </ThemeProvider>
  );
}
