import { TwitterAuthInfoResponse, TwitterAuthUrlResponse } from "../types";
import { request } from "../utils/url";

export const loginWithTwitter = async () => {
  const { authUrl }: TwitterAuthUrlResponse = await (
    await fetch("/api/twitter-auth-url")
  ).json();

  window.location.href = authUrl;
};

export const fetchTwitterInfo = async (
  state: string,
  code: string,
): Promise<TwitterAuthInfoResponse> => {
  const newTwitterAuthInfo = await request<TwitterAuthInfoResponse>(
    `/api/twitter-auth-info?state=${state}&code=${code}`,
  );

  return newTwitterAuthInfo;
};
