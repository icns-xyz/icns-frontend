import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../iron.config";
import { IcnsVerificationResponse } from "../../types/api-response";
import { request } from "../../utils/url";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!process.env.ICNS_VERIFIER_ORIGIN_LIST) {
      console.log(".env is not set");
      return res.status(500).json({ error: "Internal server error" });
    }
    const verifierOriginList = process.env.ICNS_VERIFIER_ORIGIN_LIST.split(",");

    const verificationList = await Promise.allSettled(
      verifierOriginList.map((verfierOrigin) =>
        request<IcnsVerificationResponse>(
          `${verfierOrigin}/api/verify_twitter`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          },
        ),
      ),
    );
    res.status(200).json({
      verificationList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
},
ironOptions);
