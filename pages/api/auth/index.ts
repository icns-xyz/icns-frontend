import type { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "../../client/twitter";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    !process.env.TWITTER_AUTH_STATE ||
    !process.env.TWITTER_AUTH_CODE_CHALLENGE
  ) {
    return res.status(500).send("No state or code_challenge");
  }

  const authUrl = authClient.generateAuthURL({
    state: process.env.TWITTER_AUTH_STATE,
    code_challenge: process.env.TWITTER_AUTH_CODE_CHALLENGE,
    code_challenge_method: "plain",
  });
  res.status(200).json({ authUrl });
}
