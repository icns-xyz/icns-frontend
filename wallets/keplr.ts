import {
  AminoSignResponse,
  BroadcastMode,
  ChainInfo,
  Keplr,
  StdSignDoc,
} from "@keplr-wallet/types";
import { Wallet } from "./types";

export const getKeplrFromWindow: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (window.keplr) {
    return window.keplr;
  }

  if (document.readyState === "complete") {
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};

export class KeplrWallet implements Wallet {
  constructor(public readonly keplr: Keplr) {}

  broadcastTxSync(chainId: string, tx: Uint8Array): Promise<Uint8Array> {
    return this.keplr.sendTx(chainId, tx, BroadcastMode.Sync);
  }

  getChainInfosWithoutEndpoints(): Promise<
    Omit<ChainInfo, "rest" | "rpc" | "nodeProvider">[]
  > {
    // TODO: Update @keplr-wallet/types
    return (this.keplr as any).getChainInfosWithoutEndpoints();
  }

  getKey(chainId: string): Promise<{
    readonly name: string;
    readonly pubKey: Uint8Array;
    readonly address: Uint8Array;
  }> {
    return this.keplr.getKey(chainId);
  }

  init(chainIds: string[]): Promise<void> {
    return this.keplr.enable(chainIds);
  }

  signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    return this.keplr.signAmino(chainId, signer, signDoc);
  }

  signICNSAdr36(
    chainId: string,
    contractAddress: string,
    owner: string,
    username: string,
    addressChainIds: string[],
  ): Promise<{
    chainId: string;
    bech32Prefix: string;
    bech32Address: string;
    addressHash: "cosmos" | "ethereum";
    pubKey: Uint8Array;
    signatureSalt: number;
    signature: Uint8Array;
  }> {
    // TODO: Update @keplr-wallet/types
    return (this.keplr as any).signICNSAdr36(
      chainId,
      contractAddress,
      owner,
      username,
      addressChainIds,
    );
  }
}
