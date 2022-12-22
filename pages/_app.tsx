import * as amplitude from "@amplitude/analytics-browser";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import ErrorBoundary from "../components/error-boundary";
import color from "../styles/color";

import { GlobalStyle } from "../styles/global";

// Tooltip default style.
import "react-tooltip/dist/react-tooltip.css";

const homePageTheme: DefaultTheme = {
  bgColor: color.black,
  bgGridColor: color.grey["600"],
};

const defaultPageTheme: DefaultTheme = {
  bgColor: "#0B0B0B",
  bgGridColor: color.grey["900"],
};

if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY !== undefined) {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pageTheme = useMemo(() => {
    return router.pathname === "/" ? homePageTheme : defaultPageTheme;
  }, [router.pathname]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      const pathname = url.split("?")[0];

      amplitude.track("view page", {
        pathname,
      });
    };

    handleRouteChangeComplete(router.pathname);
    router.events.on("routeChangeStart", handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <ThemeProvider theme={pageTheme}>
      <Head>
        <title>Interchain Name Service</title>
      </Head>
      <React.Fragment>
        <GlobalStyle />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </React.Fragment>
    </ThemeProvider>
  );
}
