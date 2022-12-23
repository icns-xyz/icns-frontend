import {
  IcnsVerificationResponseOnFrontend,
  TwitterAuthInfoResponse,
  TwitterAuthUrlResponse,
} from "../types";
import { request } from "../utils/url";

export const loginWithTwitter = async () => {
  const { authUrl } = await request<TwitterAuthUrlResponse>(
    "/api/twitter-auth-url",
  );

  window.location.href = authUrl;
};

export const fetchTwitterInfo = async (
  state: string,
  code: string,
): Promise<TwitterAuthInfoResponse> => {
  return await request<TwitterAuthInfoResponse>(
    `/api/twitter-auth-info?state=${state}&code=${code}`,
  );
};

export const verifyTwitterAccount = async (
  claimer: string,
  accessToken: string,
) => {
  return (
    await request<IcnsVerificationResponseOnFrontend>(
      "/api/icns-verification",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claimer: claimer,
          authToken: accessToken,
        }),
      },
    )
  ).verificationList;
};
