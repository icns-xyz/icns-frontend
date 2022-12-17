import { CosmwasmExecuteMessageResult } from "../types";
import { makeCosmwasmExecMsg } from "../wallets";
import { REGISTRAR_ADDRESS, RESOLVER_ADDRESS } from "../constants/icns";
import { ContractFee } from "../constants/wallet";

export const makeClaimMessage = (
  senderAddress: string,
  twitterUserName: string,
  verificationList: any[],
  referral?: string,
): CosmwasmExecuteMessageResult => {
  verificationList = verificationList.filter((verification) => {
    if (verification.status !== "fulfilled") {
      console.log("verification", verification);
    }

    return verification.status === "fulfilled";
  });

  if (verificationList.length === 0) {
    throw new Error("Verifications rejected all");
  }

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
        referral,
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

export const makeRemoveRecordMessage = (
  twitterUserName: string,
  senderAddress: string,
  removeAddress: string,
): CosmwasmExecuteMessageResult => {
  return makeCosmwasmExecMsg(
    senderAddress,
    RESOLVER_ADDRESS,
    {
      remove_record: {
        name: twitterUserName,
        bech32_address: removeAddress,
      },
    },
    [],
  );
};
