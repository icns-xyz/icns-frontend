import { useEffect, useState } from "react";
import {
  IcnsVerificationResponse,
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
        unique_twitter_id: newTwitterAuthInfo.id,
        name: newTwitterAuthInfo.username,
        claimer: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
        contract_address: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
        chain_id: "osmosis-1",
      };
      const icnsVerification = await request<IcnsVerificationResponse>(
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
      console.log(icnsVerification);
    };

    handleVerification();
  }, []);

  return (
    <div>
      <div>{twitterAuthInfo?.username}</div>
    </div>
  );
}
