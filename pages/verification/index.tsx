// React
import { useEffect, useState } from "react";

// NextJs
import Image from "next/image";

// Types
import { IcnsVerificationResponse, TwitterAuthInfoResponse } from "../../types";
import { request } from "../../utils/url";

// Styles
import styled from "styled-components";
import color from "../../styles/color";

// Components
import { Logo } from "../../components/logo";
import { SkeletonChainList } from "../../components/skeleton";

import { PrimaryButton } from "../../components/primary-button";
import { AccountInfos } from "../../config";
import { TwitterProfile } from "../../components/twitter-profile";
import { ChainList } from "../../components/chain-list";
import {
  getKeplrFromWindow,
  KeplrWallet,
  makeCosmwasmExecMsg,
  sendMsgs,
  simulateMsgs,
} from "../../wallets";
import { TendermintTxTracer } from "@keplr-wallet/cosmos";
import { Buffer } from "buffer/";

export default function VerificationPage() {
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleVerification = async () => {
      if (window.location.search) {
        const [, state, code] =
          window.location.search.match(
            /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
          ) || [];

        const newTwitterAuthInfo = await request<TwitterAuthInfoResponse>(
          `/api/twitter-auth-info?state=${state}&code=${code}`,
        );

        setTwitterAuthInfo(newTwitterAuthInfo);

        await (async () => {
          const keplr = await getKeplrFromWindow();
          if (keplr) {
            const wallet = new KeplrWallet(keplr);

            const mainChainId = "osmo-test-4";
            const chainIds = (await wallet.getChainInfosWithoutEndpoints()).map(
              (c) => c.chainId,
            );

            await wallet.init(chainIds);

            const key = await wallet.getKey(mainChainId);

            const icnsVerificationList = (
              await request<IcnsVerificationResponse>(
                "/api/icns-verification",
                {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    claimer: key.bech32Address,
                    authToken: newTwitterAuthInfo.accessToken,
                  }),
                },
              )
            ).verificationList;

            console.log(icnsVerificationList);

            const registerMsg = makeCosmwasmExecMsg(
              key.bech32Address,
              "osmo1u3sm9029430ca7xqz5afx4n0d42mgs2w97syex23g3vz2m673hxsv905sn",
              {
                claim: {
                  name: newTwitterAuthInfo.username,
                  verifying_msg:
                    icnsVerificationList[0].status === "fulfilled"
                      ? icnsVerificationList[0].value.data.verifying_msg
                      : "",
                  verifications: icnsVerificationList.map((verification) => {
                    if (verification.status === "fulfilled") {
                      return {
                        public_key: verification.value.data.public_key,
                        signature: verification.value.data.signature,
                      };
                    }
                  }),
                },
              },
              [
                {
                  denom: "uosmo",
                  amount: "500000",
                },
              ],
            );

            const test = await wallet.signICNSAdr36(
              mainChainId,
              "osmo1q2qpencrnnlamwalxt6tac2ytl35z5jejn0v4frnp6jff7gwp37sjcnhu5",
              key.bech32Address,
              newTwitterAuthInfo.username,
              chainIds,
            );

            const addressMsgs = test.map((adr36Info) => {
              console.log(adr36Info);

              return makeCosmwasmExecMsg(
                key.bech32Address,
                "osmo1q2qpencrnnlamwalxt6tac2ytl35z5jejn0v4frnp6jff7gwp37sjcnhu5",
                {
                  set_record: {
                    name: newTwitterAuthInfo.username,
                    bech32_prefix: adr36Info.bech32Prefix,
                    adr36_info: {
                      signer_bech32_address: adr36Info.bech32Address,
                      address_hash: adr36Info.addressHash,
                      pub_key: Buffer.from(adr36Info.pubKey).toString("base64"),
                      signature: Buffer.from(adr36Info.signature).toString(
                        "base64",
                      ),
                      signature_salt: adr36Info.signatureSalt.toString(),
                    },
                  },
                },
                [],
              );
            });

            const aminoMsgs = [registerMsg.amino];
            const protoMsgs = [registerMsg.proto];
            for (const addressMsg of addressMsgs) {
              aminoMsgs.push(addressMsg.amino);
              protoMsgs.push(addressMsg.proto);
            }

            const chainInfo = {
              chainId: mainChainId,
              rest: "https://lcd.testnet.osmosis.zone",
            };

            const simulated = await simulateMsgs(
              chainInfo,
              key.bech32Address,
              {
                proto: protoMsgs,
              },
              {
                amount: [],
              },
            );

            const txHash = await sendMsgs(
              wallet,
              chainInfo,
              key.bech32Address,
              {
                amino: aminoMsgs,
                proto: protoMsgs,
              },
              {
                amount: [],
                gas: Math.floor(simulated.gasUsed * 1.5).toString(),
              },
            );

            const txTracer = new TendermintTxTracer(
              "https://rpc.testnet.osmosis.zone",
              "/websocket",
            );

            const result = await txTracer.traceTx(txHash);

            console.log(result);
          }
        })();

        setIsLoading(false);
      }
    };

    handleVerification();
  }, []);

  return (
    <Container>
      <Logo />

      <MainContainer>
        {isLoading ? (
          <SkeletonChainList />
        ) : (
          <ContentContainer>
            <TwitterProfile twitterProfileInformation={twitterAuthInfo} />

            <ChainListTitleContainer>
              <ChainListTitle>Chain List</ChainListTitle>
              <SearchContainer>Search</SearchContainer>
            </ChainListTitleContainer>

            <ChainList chainList={AccountInfos} />

            <ButtonContainer>
              <PrimaryButton>Register</PrimaryButton>
            </ButtonContainer>
          </ContentContainer>
        )}
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;

  margin-top: 5rem;
`;

export const ButtonContainer = styled.div`
  width: 12rem;
  height: 4rem;

  margin-top: 2rem;
`;

export const ChainListTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const ChainListTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.9rem;

  color: ${color.white};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  border-radius: 3rem;

  min-width: 10rem;
  height: 2rem;

  background-color: ${color.grey["700"]};
`;
