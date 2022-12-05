import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { withIronSessionApiRoute } from "iron-session/next";
import { base64URLEncode } from "../../../utils/encoding";
import { buildQueryString } from "../../../utils/url";
import { ironOptions } from "../../../iron.config";
import {
  twitterOAuthBaseUrl,
  twitterOAuthScopes,
} from "../../../constants/twitter";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    !process.env.TWITTER_AUTH_STATE ||
    !process.env.TWITTER_AUTH_CODE_CHALLENGE
  ) {
    return res.status(500).send("No state or code_challenge");
  }

  const codeVerifier = base64URLEncode(crypto.randomBytes(32));
  req.session.code_verifier = codeVerifier;
  await req.session.save();
  const codeChallenge = base64URLEncode(
    crypto.createHash("sha256").update(codeVerifier).digest(),
  );
  const authUrlObj = new URL(twitterOAuthBaseUrl);
  authUrlObj.search = buildQueryString({
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_AUTH_CALLBACK_URI,
    state: process.env.TWITTER_AUTH_STATE,
    scope: twitterOAuthScopes.join(" "),
    response_type: "code",
    code_challenge_method: "s256",
    code_challenge: codeChallenge,
  });
  const authUrl = authUrlObj.toString();

  res.status(200).json({ authUrl });
},
ironOptions);

declare module "iron-session" {
  interface IronSessionData {
    code_verifier?: string;
  }
}
