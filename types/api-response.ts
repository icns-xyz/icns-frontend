import { TwitterPublicMetrics } from "../pages/api/twitter-auth-info";

export interface TwitterAuthUrlResponse {
  authUrl: string;
}

export interface TwitterAuthInfoResponse {
  accessToken: string;
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  description: string;
  public_metrics: TwitterPublicMetrics;
}

export interface IcnsVerificationResponse {
  signature: number[];
  algorithm: string;
}
