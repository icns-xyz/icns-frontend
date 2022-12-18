import { AminoSignResponse, ChainInfo, StdSignDoc } from "@keplr-wallet/types";

export interface Wallet {
  init(chainIds: string[]): Promise<void>;

  getChainInfosWithoutEndpoints(): Promise<
    (Pick<ChainInfo, "chainId" | "chainName" | "bech32Config"> & {
      readonly isEthermintLike?: boolean;
    })[]
  >;

  getKey(chainId: string): Promise<{
    readonly name: string;
    readonly pubKey: Uint8Array;
    readonly bech32Address: string;
    readonly isLedgerNano?: boolean;
  }>;
  signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse>;
  broadcastTxSync(chainId: string, tx: Uint8Array): Promise<Uint8Array>;

  signICNSAdr36(
    chainId: string,
    contractAddress: string,
    owner: string,
    username: string,
    addressChainIds: string[],
  ): Promise<
    {
      chainId: string;
      bech32Prefix: string;
      bech32Address: string;
      addressHash: "cosmos" | "ethereum";
      pubKey: Uint8Array;
      signatureSalt: number;
      signature: Uint8Array;
    }[]
  >;
}
