// React
import { useEffect, useState } from "react";

// Types
import {
  ChainItemType,
  IcnsVerificationResponse,
  TwitterAuthInfoResponse,
} from "../../types";
import { request } from "../../utils/url";

// Styles
import styled from "styled-components";
import color from "../../styles/color";

// Components
import { Logo } from "../../components/logo";
import { SkeletonChainList } from "../../components/skeleton";

import { PrimaryButton } from "../../components/primary-button";
import { TwitterProfile } from "../../components/twitter-profile";
import { ChainList } from "../../components/chain-list";
import { useRouter } from "next/router";
import { MainChainId } from "../../constants/wallet";
import { getKeplrFromWindow, KeplrWallet } from "../../wallets";
import { ChainIdHelper } from "@keplr-wallet/cosmos";
import ErrorBoundary from "../../components/error-boundary";

export default function VerificationPage() {
  const router = useRouter();
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  const [chainList, setChainList] = useState<ChainItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    const handleVerification = async () => {
      if (window.location.search) {
        if (window.location.search.match("error")) {
          await router.push("/");
        }

        await fetchTwitterInfo();

        await fetchChainList();

        setIsLoading(false);
      }
    };

    handleVerification();
  }, []);

  const fetchTwitterInfo = async () => {
    const [, state, code] =
      window.location.search.match(
        /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
      ) || [];

    const newTwitterAuthInfo = await request<TwitterAuthInfoResponse>(
      `/api/twitter-auth-info?state=${state}&code=${code}`,
    );

    setTwitterAuthInfo(newTwitterAuthInfo);
  };

  const fetchChainList = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr) {
      const wallet = new KeplrWallet(keplr);
      const chainIds = (await wallet.getChainInfosWithoutEndpoints()).map(
        (c) => c.chainId,
      );
      const chainKeys = await Promise.all(
        chainIds.map((chainId) => wallet.getKey(chainId)),
      );

      const chainInfos = (await wallet.getChainInfosWithoutEndpoints()).map(
        (chainInfo) => {
          return {
            prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
            chainImageUrl: `https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/${
              ChainIdHelper.parse(chainInfo.chainId).identifier
            }/chain.png`,
          };
        },
      );

      const chainArray: ChainItemType[] = [];
      for (let i = 0; i < chainKeys.length; i++) {
        chainArray.push({
          address: chainKeys[i].bech32Address,
          ...chainInfos[i],
        });
      }

      // remove duplicated item
      // const filteredChainList = chainArray.filter((chain, index, self) => {
      //   return index === self.findIndex((t) => chain.prefix === t.prefix);
      // });

      setChainList(chainArray);
    }
  };

  const verifyTwitterAccount = async () => {
    try {
      const keplr = await getKeplrFromWindow();

      if (twitterAuthInfo && keplr) {
        const wallet = new KeplrWallet(keplr);
        const key = await wallet.getKey(MainChainId);

        const icnsVerificationList = (
          await request<IcnsVerificationResponse>("/api/icns-verification", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              claimer: key.bech32Address,
              authToken: twitterAuthInfo.accessToken,
            }),
          })
        ).verificationList;

        console.log(icnsVerificationList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRegistration = async () => {
    await verifyTwitterAccount();
  };

  return (
    <ErrorBoundary>
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

              <ChainList
                chainList={chainList}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />

              <ButtonContainer>
                <PrimaryButton
                  disabled={checkedItems.size < 1}
                  onClick={onClickRegistration}
                >
                  Register
                </PrimaryButton>
              </ButtonContainer>
            </ContentContainer>
          )}
        </MainContainer>
      </Container>
    </ErrorBoundary>
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
