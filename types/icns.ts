import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";

export interface CosmwasmExecuteMessageResult {
  amino: {
    readonly type: string;
    readonly value: any;
  };
  proto: Any;
}
