import { TwitterAuthUrlResponse } from "../types";

export const twitterOAuthBaseUrl = "https://twitter.com/i/oauth2/authorize";

export const twitterOAuthScopes = [
  "users.read",
  "tweet.read",
  "offline.access",
];

export const twitterApiBaseUrl = "https://api.twitter.com/2";

export const loginWithTwitter = async () => {
  const { authUrl }: TwitterAuthUrlResponse = await (
    await fetch("/api/twitter-auth-url")
  ).json();

  window.location.href = authUrl;
};
