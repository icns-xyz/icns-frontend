import { auth } from "twitter-api-sdk";

export const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "http://localhost:3000/api/auth/callback",
  scopes: ["users.read", "offline.access"],
});
