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
            // JSON string
            verifying_msg: string;
            // Base64 encoded
            public_key: string;
            // Base64 encoded
            signature: string;
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

export interface IcnsVerificationResponseOnFrontend {
  verificationList: (
    | {
        status: "fulfilled";
        value: {
          errors: Error[];
          data: {
            // JSON string
            verifying_msg: string;
            // Base64 encoded
            public_key: string;
            // Base64 encoded
            signature: string;
            algorithm: string;
          };
        };
      }
    | {
        status: "rejected";
        reason: string;
      }
  )[];
}

export interface NameByTwitterIdQueryResponse {
  data: {
    name: string;
  };
}

export interface AddressesQueryResponse {
  data: {
    addresses: RegisteredAddresses[];
  };
}

export interface RegisteredAddresses {
  address: string;
  bech32_prefix: string;
}

export interface QueryError {
  code: number;
  message: string;
}

export interface OwnerOfQueryResponse {
  data: {
    owner: string;
  };
}
