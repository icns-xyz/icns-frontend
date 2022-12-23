import { captureException } from "@sentry/nextjs";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { twitterApiBaseUrl } from "../../constants/twitter";
import { ironOptions } from "../../iron.config";

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

    const {
      access_token: accessToken,
      refresh_token,
    }: TwitterOAuth2TokenResponse = await (
      await fetch(`${twitterApiBaseUrl}/oauth2/token`, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`,
          ).toString("base64")}`,
        },
        body: params,
      })
    ).json();

    req.session.refresh_token = refresh_token;
    await req.session.save();
    const { data, title }: TwitterUsersMeResponse = await (
      await fetch(
        `${twitterApiBaseUrl}/users/me?user.fields=profile_image_url,public_metrics,description`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    ).json();
    const {
      id,
      username,
      name,
      profile_image_url,
      description,
      public_metrics,
    } = data || {};

    res.status(200).json({
      accessToken,
      id,
      username,
      name,
      profile_image_url: profile_image_url?.replace(
        "normal.jpg",
        "400x400.jpg",
      ),
      description,
      public_metrics,
      error: title,
    });
  } catch (error: any) {
    console.error(error);
    captureException(error);
    res.status(500).json({ error: "Internal Server Error" });
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
  data?: {
    id: string;
    username: string;
    name: string;
    profile_image_url: string;
    description: string;
    public_metrics: TwitterPublicMetrics;
  };
  // Error data
  title?: string;
  detail?: string;
  type?: string;
  status?: string;
}

export interface TwitterPublicMetrics {
  followers_count: number;
  following_count: number;
  listed_count: number;
  tweet_count: number;
}
