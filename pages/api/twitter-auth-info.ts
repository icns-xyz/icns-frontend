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
    console.error(new Error(".env is not set"));
    return res.status(500).send({
      error:
        "Twitter app client id or client secret or callback URI is not set",
    });
  }

  if (!req.session.code_verifier) {
    return res.status(401).send({
      error: "No OAuth2.0 code verifier",
    });
  }

  try {
    const params = new URLSearchParams();

    if (req.session.refresh_token) {
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", req.session.refresh_token);
      params.append("client_id", process.env.TWITTER_CLIENT_ID);
    } else {
      const { code, state } = req.query;
      if (state !== process.env.TWITTER_AUTH_STATE) {
        return res.status(401).send({ error: "State isn't matching" });
      }

      params.append("grant_type", "authorization_code");
      params.append("code", code as string);
      params.append("redirect_uri", process.env.TWITTER_AUTH_CALLBACK_URI);
      params.append("code_verifier", req.session.code_verifier);
    }

    const { access_token: accessToken, refresh_token } =
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

    req.session.refresh_token = refresh_token;
    await req.session.save();
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
    console.error(error);
    res.status(500).json({ error: "Internal server error " });
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
