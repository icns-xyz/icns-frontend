import type { NextApiRequest, NextApiResponse } from "next";
import { CHAIN_ALLOWLIST } from "../../constants/icns";
import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

  res.status(200).json({
    chains: CHAIN_ALLOWLIST,
  });
}
