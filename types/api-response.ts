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
  verificationList: (
    | {
        status: "fulfilled";
        value: {
          errors: Error[];
          data: {
            verifying_msg: string;
            signature: number[];
            algorithm: string;
          };
        };
      }
    | {
        status: "rejected";
        reason: Error;
      }
  )[];
}
