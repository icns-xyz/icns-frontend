import { TwitterAuthInfoResponse } from "./api-response";

export interface TwitterProfileType extends TwitterAuthInfoResponse {
  isRegistered: boolean;
}
