import { useEffect, useState } from "react";
import { TwitterAuthInfoResponse } from "../../types/api-response";

export default function VerificationPage() {
  const [accessToken, setAccessToken] = useState<string>();

  const fetchAccessToken = async (state: string, code: string) => {
    const { accessToken }: TwitterAuthInfoResponse = await (
      await fetch(`/api/auth/access-token?state=${state}&code=${code}`)
    ).json();

    setAccessToken(accessToken);
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
      <div>{accessToken}</div>
    </div>
  );
}
