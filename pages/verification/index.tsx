import { useEffect, useState } from "react";
import {
  IcnsVerificationInfoResponse,
  TwitterAuthInfoResponse,
} from "../../types/api-response";
import { VerifierMsg } from "../../types/msg";
import { request } from "../../utils/url";

export default function VerificationPage() {
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  useEffect(() => {
    const handleVerification = async () => {
      const [, state, code] =
        window.location.search.match(
          /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
        ) || [];
      const newTwitterAuthInfo = await request<TwitterAuthInfoResponse>(
        `/api/twitter-auth-info?state=${state}&code=${code}`,
      );

      console.log(newTwitterAuthInfo);

      setTwitterAuthInfo(newTwitterAuthInfo);
      const verifierMsg: VerifierMsg = {
        name: newTwitterAuthInfo.username,
        claimer: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
        contract_address: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
        chain_id: "osmosis-1",
      };
      const icnsVerificationInfo = await request<IcnsVerificationInfoResponse>(
        "/api/icns-verification",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            msg: JSON.stringify(verifierMsg),
            authToken: newTwitterAuthInfo.accessToken,
          }),
        },
      );
      console.log(icnsVerificationInfo);
    };

    handleVerification();
  }, []);

  return (
    <div>
      <div>{twitterAuthInfo?.username}</div>
    </div>
  );
}
