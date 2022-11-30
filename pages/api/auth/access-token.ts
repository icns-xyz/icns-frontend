import type { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "../../client/twitter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code, state } = req.query;
    if (state !== process.env.TWITTER_AUTH_STATE) {
      return res.status(500).send("State isn't matching");
    }
    const { token } = await authClient.requestAccessToken(code as string);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
}
