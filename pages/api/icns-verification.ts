import { captureException } from "@sentry/nextjs";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../iron.config";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!process.env.ICNS_VERIFIER_ORIGIN_LIST) {
      const errorMessage = ".env is not set";
      console.error(errorMessage);
      captureException(errorMessage);
      return res.status(500).json({ error: "Internal server error" });
    }
    const verifierOriginList = process.env.ICNS_VERIFIER_ORIGIN_LIST.split(",");

    const verificationList = await Promise.allSettled(
      verifierOriginList.map(async (verfierOrigin) =>
        (
          await fetch(`${verfierOrigin}/api/verify_twitter`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          })
        ).json(),
      ),
    );

    const errorTrimmedVerificationList = verificationList.map(
      (verification) => ({
        ...verification,
        ...(verification.status === "rejected" && {
          reason: verification.reason.message || verification.reason,
        }),
      }),
    );

    res.status(200).json({
      verificationList: errorTrimmedVerificationList,
    });
  } catch (error) {
    console.error(error);
    captureException(error);
    res.status(500).json({ error: "Internal server error" });
  }
},
ironOptions);
