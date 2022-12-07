// React
import { useEffect, useState } from "react";

// NextJs
import Image from "next/image";

// Types
import {
  IcnsVerificationResponse,
  TwitterAuthInfoResponse,
  VerifierMsg,
  WidthHeightProps,
} from "../../types";
import { request } from "../../utils/url";

// Styles
import styled from "styled-components";
import color from "../../styles/color";

// Components
import { Logo } from "../../components/logo";
import {
  SkeletonAnimation,
  SkeletonCircle,
  SkeletonText,
} from "../../components/skeleton";

import { PrimaryButton } from "../../components/primary-button";
import { AccountInfos } from "../../config";

export default function VerificationPage() {
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

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

        console.log(newTwitterAuthInfo);

        setTwitterAuthInfo(newTwitterAuthInfo);
        const verifierMsg: VerifierMsg = {
          unique_twitter_id: newTwitterAuthInfo.id,
          name: newTwitterAuthInfo.username,
          claimer: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
          contract_address: "osmo1y5mm5nj5m8ttddt5ccspek6xgyyavehrkak7gq",
          chain_id: "osmosis-1",
        };
        const icnsVerification = await request<IcnsVerificationResponse>(
          "/api/icns-verification",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              msg: JSON.stringify(verifierMsg),
              authToken: newTwitterAuthInfo.accessToken,
            }),
          },
        );
        console.log(icnsVerification);
      }
    };

    handleVerification();
  }, []);

  return (
    <Container>
      <Logo />

      <MainContainer>
        {isLoading ? (
          <ContentContainer>
            <ProfileContainer color={color.grey["700"]}>
              <SkeletonCircle width="5.5rem" height="5.5rem" />

              <ProfileContentContainer>
                <ProfileNameContainer>
                  <SkeletonText width="5rem" height="1.5rem" />
                </ProfileNameContainer>
                <ProfileUserNameContainer>
                  <SkeletonText width="5rem" height="1rem" />
                </ProfileUserNameContainer>

                <ProfileFollowContainer>
                  <SkeletonText width="8rem" height="1rem" />
                  <SkeletonText width="8rem" height="1rem" />
                </ProfileFollowContainer>

                <SkeletonText width="20rem" height="1rem" />
              </ProfileContentContainer>
            </ProfileContainer>

            <ChainListTitleContainer>
              <SkeletonText width="8rem" height="1.5rem" />
            </ChainListTitleContainer>

            <ChainContainer color={color.grey["700"]}>
              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <SkeletonCircle width="3rem" height="3rem" />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <SkeletonText width="4rem" height="1rem" />
                  <SkeletonText width="12rem" height="1rem" />
                </ChainInfoContainer>
              </ChainItemContainer>

              <SkeletonDivider />

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <SkeletonCircle width="3rem" height="3rem" />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <SkeletonText width="4rem" height="1rem" />
                  <SkeletonText width="12rem" height="1rem" />
                </ChainInfoContainer>
              </ChainItemContainer>

              <SkeletonDivider />

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <SkeletonCircle width="3rem" height="3rem" />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <SkeletonText width="4rem" height="1rem" />
                  <SkeletonText width="12rem" height="1rem" />
                </ChainInfoContainer>
              </ChainItemContainer>

              <SkeletonDivider />

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <SkeletonCircle width="3rem" height="3rem" />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <SkeletonText width="4rem" height="1rem" />
                  <SkeletonText width="12rem" height="1rem" />
                </ChainInfoContainer>
              </ChainItemContainer>

              <SkeletonDivider />

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <SkeletonCircle width="3rem" height="3rem" />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <SkeletonText width="4rem" height="1rem" />
                  <SkeletonText width="12rem" height="1rem" />
                </ChainInfoContainer>
              </ChainItemContainer>

              <SkeletonDivider />
            </ChainContainer>

            <ButtonContainer>
              <SkeletonButton />
            </ButtonContainer>
          </ContentContainer>
        ) : (
          <ContentContainer>
            <ProfileContainer color={color.grey["700"]}>
              <ProfileImageContainer>
                <Image
                  src="https://pbs.twimg.com/profile_images/1503375455532974084/KWG1XmEc_400x400.jpg"
                  alt="profile image"
                  fill={true}
                />
              </ProfileImageContainer>

              <ProfileContentContainer>
                <ProfileNameContainer>BaeHeesung</ProfileNameContainer>
                <ProfileUserNameContainer>
                  @BaeHeesung25
                </ProfileUserNameContainer>

                <ProfileFollowContainer>
                  <ProfileFollowerContainer>
                    <ProfileFollowBold>42</ProfileFollowBold> Following
                  </ProfileFollowerContainer>

                  <ProfileFollowerContainer>
                    <ProfileFollowBold>42</ProfileFollowBold> Following
                  </ProfileFollowerContainer>
                </ProfileFollowContainer>

                <ProfileDescriptionContainer>
                  Product UIUX designer @Keplrwallet and I like @regen_network🌿
                </ProfileDescriptionContainer>
              </ProfileContentContainer>
            </ProfileContainer>

            <ChainListTitleContainer>
              <ChainListTitle>Chain List</ChainListTitle>
              <SearchContainer>Search</SearchContainer>
            </ChainListTitleContainer>

            <ChainContainer color={color.grey["700"]}>
              {AccountInfos.map((accountInfo) => (
                <ChainItemContainer key={accountInfo.prefix}>
                  <ChainImageContainer width="3rem" height="3rem">
                    <Image
                      src={accountInfo.chainImageUrl}
                      alt={`${accountInfo.prefix} image`}
                      fill={true}
                    />
                  </ChainImageContainer>
                  <ChainInfoContainer>
                    <ChainName>{`.${accountInfo.prefix}`}</ChainName>
                    <WalletAddress>{accountInfo.address}</WalletAddress>
                  </ChainInfoContainer>

                  <Flex1 />

                  <ChainCheckBox />
                </ChainItemContainer>
              ))}
            </ChainContainer>

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;

  margin-top: 5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  padding: 1.5rem 2rem;

  background-color: ${(props) => props.color};
`;

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  margin-left: 1.5rem;
`;

const ProfileFollowContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;
`;

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 33rem;
  overflow: scroll;

  background-color: ${(props) => props.color};
`;

const ChainItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  padding: 1.5rem;

  &:hover {
    background: ${color.grey["900"]};
  }
`;

const ChainImageContainer = styled.div<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  position: relative;
`;

const ChainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  width: 10rem;
  height: 4rem;

  margin-top: 2rem;
`;

const SkeletonButton = styled.div`
  width: 12rem;
  height: 4rem;

  background-color: ${color.grey["700"]};
`;

const SkeletonDivider = styled(SkeletonAnimation)`
  width: 100%;
  height: 1px;
  background-color: ${color.grey["600"]};
`;

const ProfileImageContainer = styled.div`
  width: 5rem;
  height: 5rem;

  margin-top: -3rem;

  border-radius: 50%;

  overflow: hidden;

  position: relative;
`;

const ProfileNameContainer = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;

  color: ${color.white};
`;

const ProfileUserNameContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["100"]};
`;

const ProfileFollowerContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

const ProfileFollowBold = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.white};
`;

const ProfileDescriptionContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["300"]};
`;

const ChainListTitleContainer = styled.div`
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

const ChainName = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["100"]};
`;

const WalletAddress = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

const Flex1 = styled.div`
  flex: 1;
`;

const ChainCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 1.5rem;
  height: 1.5rem;
`;
