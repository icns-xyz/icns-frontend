import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import ErrorBoundary from "../components/error-boundary";
import { PageBackground } from "../styles/background";

import { GlobalStyle } from "../styles/global";

const homePageTheme: DefaultTheme = {
  bgColor: "rgba(18, 18, 18, 1)",
  bgGridColor: "rgba(51, 51, 51, 1)",
};

const defaultPageTheme: DefaultTheme = {
  bgColor: "rgba(18, 18, 18, 0.8)",
  bgGridColor: "rgba(51, 51, 51, 0.3)",
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pageTheme = useMemo(() => {
    return router.pathname === "/" ? homePageTheme : defaultPageTheme;
  }, [router.pathname]);

  return (
    <ThemeProvider theme={pageTheme}>
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
