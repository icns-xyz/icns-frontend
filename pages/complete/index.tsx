import * as amplitude from "@amplitude/analytics-browser";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

import Typed from "react-typed";

import { Logo } from "../../components/logo";
import color from "../../styles/color";

import AlertCircleOutlineIcon from "../../public/images/svg/alert-circle-outline.svg";
import TwitterIcon from "../../public/images/svg/twitter-icon.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TendermintTxTracer } from "@keplr-wallet/cosmos";
import { queryAddressesFromTwitterName } from "../../queries";
import { RegisteredAddresses } from "../../types";
import { SHARE_URL } from "../../constants/twitter";
import { RPC_URL } from "../../constants/icns";

export default function CompletePage() {
  const router = useRouter();

  const [registeredAddressed, setRegisteredAddressed] =
    useState<RegisteredAddresses[]>();

  const [availableAddress, setAvailableAddress] = useState("");

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const { txHash, twitterUsername } = router.query;
    if (txHash && twitterUsername) {
      initialize(txHash as string, twitterUsername as string);
    }
  }, [router.query]);

  const initialize = async (txHash: string, twitterUserName: string) => {
    const txTracer = new TendermintTxTracer(RPC_URL, "/websocket");

    try {
      const result: { code?: number } = await txTracer.traceTx(
        Buffer.from(txHash, "hex"),
      );

      if (!result.code || result.code === 0) {
        amplitude.track("complete registration");

        const addresses = await queryAddressesFromTwitterName(twitterUserName);
        setRegisteredAddressed(addresses.data.addresses);
        setIsSuccess(true);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickShareButton = () => {
    amplitude.track("click share button");

    const { twitterUsername } = router.query;

    const shareMessage = `👨‍🚀 To Interchain... And Beyond!%0a%0aHey frens, I just minted my name for the interchain on @icns_xyz: ${twitterUsername}%0a%0aClaim yours now ▶`;

    const width = 500;
    const height = 700;
    window.open(
      `${SHARE_URL}?url=https://app.icns.xyz?referral=${twitterUsername}/&text=${shareMessage}`,
      "Share Twitter",
      `top=${(window.screen.height - height) / 2}, left=${
        (window.screen.width - width) / 2
      }, width=${width}, height=${height}, status=no, menubar=no, toolbar=no, resizable=no`,
    );
  };

  return (
    <Container>
      <Logo />
      <MainContainer>
        <ContentContainer>
          <TitleContainer>
            {isSuccess ? (
              <div>Your Name is Active Now!</div>
            ) : (
              <SpinnerWrapper>
                <Spinner />
                <Spinner />
                <Spinner />
                <Spinner />
              </SpinnerWrapper>
            )}
          </TitleContainer>
          <RecipentContainer>
            <RecipentTitle>Recipent</RecipentTitle>
            <AddressContainer>
              {`${router.query.twitterUsername}.`}
              {registeredAddressed && (
                <Typed
                  strings={registeredAddressed.map(
                    (address) => address.bech32_prefix,
                  )}
                  typeSpeed={150}
                  backSpeed={150}
                  backDelay={1000}
                  loop
                  smartBackspace
                  onStringTyped={(arrayPos: number) => {
                    setAvailableAddress(registeredAddressed[arrayPos].address);
                  }}
                />
              )}
            </AddressContainer>
            <AvailableAddressText>{availableAddress}</AvailableAddressText>
          </RecipentContainer>
        </ContentContainer>

        <DescriptionContainer>
          <AlertIcon>
            <AlertCircleOutlineIcon />
          </AlertIcon>
          <DescriptionText>
            ICNS name will stay the same even if your twitter handle changes in
            the future.
          </DescriptionText>
        </DescriptionContainer>

        {/*<ShareButtonContainer onClick={onClickShareButton}>*/}
        {/*  <ShareButtonText>SHARE MY NAME</ShareButtonText>*/}
        {/* <TwitterIcon /> */}
        {/*</ShareButtonContainer>*/}
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
  flex-direction: column;
  align-items: center;

  padding-top: 15.1rem;

  color: white;
`;

const ContentContainer = styled.div`
  width: 30rem;

  padding: 2.625rem 4rem;

  background-color: ${color.grey["900"]};
`;

const TitleContainer = styled.div`
  height: 1.52rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.52rem;
  letter-spacing: 0.07em;
  color: ${color.white};

  margin-bottom: 2.625rem;
`;

const RecipentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RecipentTitle = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

const AddressContainer = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 0.9rem;

  color: ${color.white};

  padding: 1rem;

  background-color: ${color.grey["600"]};
`;

const AvailableAddressText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.75rem;

  min-height: 0.75rem;

  color: ${color.blue};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  width: 30rem;

  margin-top: 1.5rem;
  padding: 1.25rem 2rem;

  background-color: ${color.grey["900"]};
`;

const AlertIcon = styled.div`
  position: relative;

  width: 1.5rem;
  height: 1.5rem;
`;

const DescriptionText = styled.div`
  width: 100%;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 140%;

  color: ${color.grey["400"]};
`;

const SpinnerWrapper = styled.div`
  display: flex;
  position: relative;

  width: 2rem;
  height: 2rem;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ animationDelay?: string }>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  animation: ${spinAnimation} 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  ${({ animationDelay }) =>
    animationDelay ? `animation-delay: ${animationDelay};` : ""}

  border-radius: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: white transparent transparent transparent;
`;

const ShareButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  width: 20rem;
  height: 5rem;

  margin-top: 2.5rem;

  cursor: pointer;
  user-select: none;

  background-color: ${color.grey["700"]};
`;

const ShareButtonText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;

  color: ${color.grey["100"]};
`;
