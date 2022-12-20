import { request } from "../utils/url";
import {
  NAME_NFT_ADDRESS,
  REGISTRAR_ADDRESS,
  RESOLVER_ADDRESS,
  REST_URL,
} from "../constants/icns";
import { Buffer } from "buffer/";
import {
  AddressesQueryResponse,
  NameByTwitterIdQueryResponse,
  OwnerOfQueryResponse,
  QueryError,
} from "../types";

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
    {},
    { isErrorIgnore: true },
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

export const queryOwnerOfTwitterName = async (
  twitterUsername: string,
): Promise<OwnerOfQueryResponse> => {
  const msg = {
    owner_of: { token_id: twitterUsername },
  };

  return request<OwnerOfQueryResponse>(
    getCosmwasmQueryUrl(
      NAME_NFT_ADDRESS,
      Buffer.from(JSON.stringify(msg)).toString("base64"),
    ),
    {},
    { isErrorIgnore: true },
  );
};
