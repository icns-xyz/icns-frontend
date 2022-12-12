// React
import { useEffect, useState } from "react";

// NextJs
import Image from "next/image";

// Types
import {
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
import { AccountInfos } from "../../config";
import {
  TwitterProfile,
} from "../../components/twitter-profile";
import { ChainList } from "../../components/chain-list";

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

        const icnsVerificationList = (
          await request<IcnsVerificationResponse>("/api/icns-verification", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              claimer: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
              authToken: newTwitterAuthInfo.accessToken,
            }),
          })
        ).verificationList;

        console.log(icnsVerificationList);

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
