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
        <meta content="Interchain Name Service" property="og:title" />
        <meta content="Interchain Name Service" property="twitter:title" />
        <meta
          content="Your identity for the Interchain. Claim yours today."
          property="og:description"
        />
        <meta
          content="Your identity for the Interchain. Claim yours today."
          property="twitter:description"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          content={`${origin}/images/og-image.jpg`}
          property="twitter:image"
        />
        <meta content={`${origin}/images/og-image.jpg`} property="og:image" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta property="og:type" content="website" />

        {/* generated favicons */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
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
