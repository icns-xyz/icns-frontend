// React
import { useEffect, useState } from "react";

// NextJs
import Image from "next/image";

// Types
import {
  IcnsVerificationResponse,
  TwitterAuthInfoResponse,
} from "../../types/api-response";
import { VerifierMsg } from "../../types/msg";
import { request } from "../../utils/url";

// Styles
import color from "../../styles/color";

// Components
import { Logo } from "../../components/logo";
import { SkeletonCircle, SkeletonText } from "../../components/skeleton";
import {
  Container,
  MainContainer,
  ContentContainer,
  ProfileContainer,
  ProfileFollowContainer,
  ProfileContentContainer,
  ProfileImageContainer,
  ProfileNameContainer,
  ProfileFollowerContainer,
  ProfileFollowBold,
  ProfileUserNameContainer,
  ProfileDescriptionContainer,
  ChainListTitle,
  SearchContainer,
  ChainContainer,
  ChainItemContainer,
  ChainImageContainer,
  ChainInfoContainer,
  ChainListTitleContainer,
  ChainName,
  WalletAddress,
  Flex1,
  ChainCheckBox,
  ButtonContainer,
  SkeletonDivider,
  SkeletonButton,
} from "./styled";

import { PrimaryButton } from "../../components/primary-button";

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
              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>

              <ChainItemContainer>
                <ChainImageContainer width="3rem" height="3rem">
                  <Image
                    src="https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png"
                    alt="chain image"
                    fill={true}
                  />
                </ChainImageContainer>
                <ChainInfoContainer>
                  <ChainName>.osmo</ChainName>
                  <WalletAddress>
                    cosmos14ky6udatsvdx859050mrnr7rvml0huue2wszvs
                  </WalletAddress>
                </ChainInfoContainer>

                <Flex1 />

                <ChainCheckBox />
              </ChainItemContainer>
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
