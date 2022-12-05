import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../iron.config";
import { IcnsVerificationInfoResponse } from "../../types/api-response";
import { request } from "../../utils/url";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!process.env.ICNS_VERIFIER_URI) {
      console.log(".env is not set");
      return res.status(500).json({ error: "Internal server error" });
    }
    const icnsVerificationInfo = await request<IcnsVerificationInfoResponse>(
      process.env.ICNS_VERIFIER_URI,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      },
    );
    res.status(200).json(icnsVerificationInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
},
ironOptions);
