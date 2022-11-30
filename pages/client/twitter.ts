import { auth } from "twitter-api-sdk";

export const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID ?? "",
  client_secret: process.env.TWITTER_CLIENT_SECRET,
  callback: process.env.TWITTER_AUTH_CALLBACK_URI ?? "",
  scopes: ["users.read", "offline.access"],
});
