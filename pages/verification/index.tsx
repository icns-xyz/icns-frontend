import { useEffect, useState } from "react";

interface AccessTokenResponse {
  access_token: string;
}

export default function VerificationPage() {
  const [accessToken, setAccessToken] = useState<string>();

  const fetchAccessToken = async (state: string, code: string) => {
    const response: AccessTokenResponse = await (
      await fetch(`/api/auth/access-token?state=${state}&code=${code}`)
    ).json();

    setAccessToken(response.access_token);
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
