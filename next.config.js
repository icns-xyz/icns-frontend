// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  sentry: {
    hideSourceMaps: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
      },
    ],
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports =
  process.env.NEXT_IS_ENABLE_USER_TRACKING === "true"
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig;
