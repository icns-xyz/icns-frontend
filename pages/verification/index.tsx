import { useEffect, useState } from "react";

interface AccessTokenResponse {
  accessToken: string;
}

export default function VerificationPage() {
  const [accessToken, setAccessToken] = useState<string>();

  const fetchAccessToken = async (state: string, code: string) => {
    const { accessToken }: AccessTokenResponse = await (
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
