import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { request } from "../../utils/url";
import { ironOptions } from "../../iron.config";
import { twitterApiBaseUrl } from "../../constants/twitter";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    !process.env.TWITTER_CLIENT_ID ||
    !process.env.TWITTER_CLIENT_SECRET ||
    !process.env.TWITTER_AUTH_CALLBACK_URI
  ) {
    return res
      .status(500)
      .send(
        "Twitter app client id or client secret or callback URI is not set",
      );
  }

  if (!req.session.code_verifier) {
    return res.status(401).send("No OAuth2.0 code verifier");
  }

  try {
    const { code, state } = req.query;
    if (state !== process.env.TWITTER_AUTH_STATE) {
      return res.status(401).send("State isn't matching");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code as string);
    params.append("redirect_uri", process.env.TWITTER_AUTH_CALLBACK_URI);
    params.append("code_verifier", req.session.code_verifier);
    const { access_token: accessToken } =
      await request<TwitterOAuth2TokenResponse>(
        `${twitterApiBaseUrl}/oauth2/token`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`,
            ).toString("base64")}`,
          },
          body: params,
        },
      );
    const {
      data: { id, username },
    } = await request<TwitterUsersMeResponse>(`${twitterApiBaseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json({
      accessToken,
      id,
      username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error ");
  }
},
ironOptions);

interface TwitterOAuth2TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
}

interface TwitterUsersMeResponse {
  data: {
    id: string;
    username: string;
    name: string;
  };
}
