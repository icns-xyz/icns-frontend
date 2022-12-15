import { TwitterAuthInfoResponse } from "./api-response";

export interface TwitterProfileType extends TwitterAuthInfoResponse {
  isRegistered: boolean;
}

export interface TwitterLoginSuccess {
  code: string;
  state: string;
}
