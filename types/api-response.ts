export interface TwitterAuthUrlResponse {
  authUrl: string;
}

export interface TwitterAuthInfoResponse {
  accessToken: string;
  id: string;
  username: string;
}

export interface IcnsVerificationResponse {
  signature: number[];
  algorithm: string;
}
