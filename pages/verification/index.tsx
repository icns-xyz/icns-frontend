import { useEffect, useState } from "react";
import { TwitterAuthInfoResponse } from "../../types/api-response";

export default function VerificationPage() {
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  const fetchAccessToken = async (state: string, code: string) => {
    const newTwitterAuthInfo: TwitterAuthInfoResponse = await (
      await fetch(`/api/twitter-auth-info?state=${state}&code=${code}`)
    ).json();

    setTwitterAuthInfo(newTwitterAuthInfo);
  };

  useEffect(() => {
    const [, state, code] =
      window.location.search.match(
        /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
      ) || [];

    fetchAccessToken(state, code);
  }, []);

  return (
    <div>
      <div>{twitterAuthInfo?.username}</div>
    </div>
  );
}
