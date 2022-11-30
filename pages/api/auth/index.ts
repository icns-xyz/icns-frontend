import type { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "../../client/twitter";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.STATE || !process.env.CODE_CHALLENGE) {
    return res.status(500).send("No state or code_challenge");
  }

  const authUrl = authClient.generateAuthURL({
    state: process.env.STATE,
    code_challenge: process.env.CODE_CHALLENGE,
    code_challenge_method: "plain",
  });
  res.redirect(authUrl);
}
