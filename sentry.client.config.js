// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_ENABLE_USER_TRACKING = process.env.NEXT_PUBLIC_IS_ENABLE_USER_TRACKING;

Sentry.init({
  enabled: IS_ENABLE_USER_TRACKING === "true",
  dsn:
    SENTRY_DSN ||
    "https://78c91641e90f4f7cad28f50aaec9fb95@o4504343701946368.ingest.sentry.io/4504343708827648",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps

  denyUrls: [
    // deny all chrome extension
    "chrome-extension://",
    // deny all firefox extension
    "moz-extension://",
  ],
});
