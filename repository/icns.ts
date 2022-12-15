import { request } from "../utils/url";
import {
  REGISTRAR_ADDRESS,
  RESOLVER_ADDRESS,
  REST_URL,
} from "../constants/icns";
import { Buffer } from "buffer/";
import {
  AddressesQueryResponse,
  CosmwasmExecuteMessageResult,
  NameByTwitterIdQueryResponse,
  QueryError,
} from "../types";
import { makeCosmwasmExecMsg } from "../wallets";
import { ContractFee } from "../constants/wallet";

const getCosmwasmQueryUrl = (contractAddress: string, queryMsg: string) =>
  `${REST_URL}/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${queryMsg}`;

export const queryRegisteredTwitterId = async (
  twitterId: string,
): Promise<NameByTwitterIdQueryResponse | QueryError> => {
  const msg = {
    name_by_twitter_id: { twitter_id: twitterId },
  };
  return request<NameByTwitterIdQueryResponse>(
    getCosmwasmQueryUrl(
      REGISTRAR_ADDRESS,
      Buffer.from(JSON.stringify(msg)).toString("base64"),
    ),
  );
};

export const queryAddressesFromTwitterName = async (
  twitterUsername: string,
): Promise<AddressesQueryResponse> => {
  const msg = {
    addresses: { name: twitterUsername },
  };

  return request<AddressesQueryResponse>(
    getCosmwasmQueryUrl(
      RESOLVER_ADDRESS,
      Buffer.from(JSON.stringify(msg)).toString("base64"),
    ),
  );
};

export const makeClaimMessage = (
  senderAddress: string,
  twitterUserName: string,
  verificationList: any[],
): CosmwasmExecuteMessageResult => {
  return makeCosmwasmExecMsg(
    senderAddress,
    REGISTRAR_ADDRESS,
    {
      claim: {
        name: twitterUserName,
        verifying_msg:
          verificationList[0].status === "fulfilled"
            ? verificationList[0].value.data.verifying_msg
            : "",
        verifications: verificationList.map((verification) => {
          if (verification.status === "fulfilled") {
            return {
              public_key: verification.value.data.public_key,
              signature: verification.value.data.signature,
            };
          }
        }),
      },
    },
    [ContractFee],
  );
};

export const makeSetRecordMessage = (
  senderAddress: string,
  twitterUserName: string,
  adr36Info: any,
): CosmwasmExecuteMessageResult => {
  return makeCosmwasmExecMsg(
    senderAddress,
    RESOLVER_ADDRESS,
    {
      set_record: {
        name: twitterUserName,
        bech32_prefix: adr36Info.bech32Prefix,
        adr36_info: {
          signer_bech32_address: adr36Info.bech32Address,
          address_hash: adr36Info.addressHash,
          pub_key: Buffer.from(adr36Info.pubKey).toString("base64"),
          signature: Buffer.from(adr36Info.signature).toString("base64"),
          signature_salt: adr36Info.signatureSalt.toString(),
        },
      },
    },
    [],
  );
};
