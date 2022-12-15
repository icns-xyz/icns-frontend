import { Wallet } from "./types";
import { BaseAccount } from "@keplr-wallet/cosmos";
import Axios from "axios";
import { StdSignDoc } from "@keplr-wallet/types";
import { sortObjectByKey } from "@keplr-wallet/common";
import { Buffer } from "buffer/";
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import { CosmwasmExecuteMessageResult } from "../types";

export async function sendMsgs(
  wallet: Wallet,
  chainInfo: {
    readonly chainId: string;
    readonly rest: string;
  },
  sender: string,
  msgs: {
    amino: {
      readonly type: string;
      readonly value: any;
    }[];
    proto: Any[];
  },
  fee: {
    readonly amount: readonly {
      readonly amount: string;
      readonly denom: string;
    }[];
    readonly gas: string;
  },
  memo: string = "",
): Promise<Uint8Array> {
  const account = await BaseAccount.fetchFromRest(
    Axios.create({
      baseURL: chainInfo.rest,
    }),
    sender,
    true,
  );

  const signDocRaw: StdSignDoc = {
    chain_id: chainInfo.chainId,
    account_number: account.getAccountNumber().toString(),
    sequence: account.getSequence().toString(),
    fee,
    msgs: msgs.amino,
    memo: memo,
  };

  const signDoc = sortObjectByKey(signDocRaw);

  const signResponse = await wallet.signAmino(
    chainInfo.chainId,
    sender,
    signDoc,
  );

  const signedTx = TxRaw.encode({
    bodyBytes: TxBody.encode(
      TxBody.fromPartial({
        // XXX: I don't know why typing error occurs.
        // TODO: Solve typing problem.
        messages: msgs.proto as any,
        memo: signResponse.signed.memo,
      }),
    ).finish(),
    authInfoBytes: AuthInfo.encode({
      signerInfos: [
        {
          publicKey: {
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: PubKey.encode({
              key: Buffer.from(signResponse.signature.pub_key.value, "base64"),
            }).finish(),
          },
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
            },
            multi: undefined,
          },
          sequence: signResponse.signed.sequence,
        },
      ],
      fee: Fee.fromPartial({
        // XXX: I don't know why typing error occurs.
        // TODO: Solve typing problem.
        // amount: signResponse.signed.fee.amount as {
        //   amount: string;
        //   denom: string;
        // }[],
        amount: signResponse.signed.fee.amount as any,
        gasLimit: signResponse.signed.fee.gas,
      }),
    }).finish(),
    signatures: [Buffer.from(signResponse.signature.signature, "base64")],
  }).finish();

  return wallet.broadcastTxSync(chainInfo.chainId, signedTx);
}

export async function simulateMsgs(
  chainInfo: {
    readonly chainId: string;
    readonly rest: string;
  },
  sender: string,
  msgs: {
    proto: Any[];
  },
  fee: {
    readonly amount: readonly {
      readonly amount: string;
      readonly denom: string;
    }[];
  },
  memo: string = "",
): Promise<{
  gasUsed: number;
}> {
  const lcdInstance = Axios.create({
    baseURL: chainInfo.rest,
  });

  const account = await BaseAccount.fetchFromRest(lcdInstance, sender, true);

  const unsignedTx = TxRaw.encode({
    bodyBytes: TxBody.encode(
      TxBody.fromPartial({
        // XXX: I don't know why typing error occurs.
        // TODO: Solve typing problem.
        messages: msgs.proto as any,
        memo: memo,
      }),
    ).finish(),
    authInfoBytes: AuthInfo.encode({
      signerInfos: [
        SignerInfo.fromPartial({
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
            },
            multi: undefined,
          },
          sequence: account.getSequence().toString(),
        }),
      ],
      fee: Fee.fromPartial({
        // XXX: I don't know why typing error occurs.
        // TODO: Solve typing problem.
        // amount: fee.amount as {
        //   amount: string;
        //   denom: string;
        // }[],
        amount: fee.amount as any,
      }),
    }).finish(),
    // Because of the validation of tx itself, the signature must exist.
    // However, since they do not actually verify the signature, it is okay to use any value.
    signatures: [new Uint8Array(64)],
  }).finish();

  const result = await lcdInstance.post("/cosmos/tx/v1beta1/simulate", {
    tx_bytes: Buffer.from(unsignedTx).toString("base64"),
  });

  const gasUsed = parseInt(result.data.gas_info.gas_used);
  if (Number.isNaN(gasUsed)) {
    throw new Error(`Invalid integer gas: ${result.data.gas_info.gas_used}`);
  }

  return {
    gasUsed,
  };
}

export function makeCosmwasmExecMsg(
  sender: string,
  contractAddress: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  obj: object,
  funds: { readonly amount: string; readonly denom: string }[],
): CosmwasmExecuteMessageResult {
  const amino = {
    type: "wasm/MsgExecuteContract",
    value: {
      sender,
      contract: contractAddress,
      msg: obj,
      funds,
    },
  };

  const proto = {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: MsgExecuteContract.encode({
      sender: amino.value.sender,
      contract: amino.value.contract,
      msg: Buffer.from(JSON.stringify(amino.value.msg)),
      funds: amino.value.funds,
    }).finish(),
  };

  return {
    amino,
    proto,
  };
}
