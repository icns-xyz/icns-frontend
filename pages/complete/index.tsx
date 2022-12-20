import * as amplitude from "@amplitude/analytics-browser";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

import Typed from "react-typed";

import { Logo } from "../../components/logo";
import color from "../../styles/color";

import AlertCircleOutlineIcon from "../../public/images/svg/alert-circle-outline.svg";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { queryAddressesFromTwitterName } from "../../queries";
import { RegisteredAddresses } from "../../types";
import { SHARE_URL } from "../../constants/twitter";
import { REST_URL, RPC_URL } from "../../constants/icns";

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
    try {
      for (let i = 0; i < 20; i++) {
        // Try to fetch tx response per 3sec, 20times.
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const res = await fetch(`${REST_URL}/cosmos/tx/v1beta1/txs/${txHash}`);

        if (res.ok && res.status === 200) {
          const txRes = await res.json();

          if (txRes && txRes.tx_response) {
            if (
              txRes.tx_response.code == null ||
              txRes.tx_response.code === 0
            ) {
              amplitude.track("complete registration");

              const addresses = await queryAddressesFromTwitterName(
                twitterUserName,
              );
              setRegisteredAddressed(addresses.data.addresses);
              setIsSuccess(true);

              break;
            }
          }
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickShareButton = () => {
    amplitude.track("click share button");

    const { twitterUsername } = router.query;

    const shareMessage = `👨‍🚀 To the Interchain... And Beyond!%0a%0aHey frens, I just minted my name for the interchain on @icns_xyz: ${twitterUsername}%0a%0aClaim yours now ▶`;

    const width = 500;
    const height = 700;
    window.open(
      `${SHARE_URL}?url=https://app.icns.xyz?referral=${twitterUsername}&text=${shareMessage}`,
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
              <div>Your name has been claimed!</div>
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
                  typeSpeed={30}
                  backSpeed={30}
                  backDelay={500}
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
          <SubLeaderboardIntroContainer>
            <SubLeaderboardIntroTitle>
              Make your way up the leaderboard
            </SubLeaderboardIntroTitle>
            <SubLeaderboardIntroDescription>
              Tweet an invite link and both you and your friend will earn points
              on the ICNS leaderboard.
            </SubLeaderboardIntroDescription>
          </SubLeaderboardIntroContainer>
        </ContentContainer>

        <ShareButtonContainer onClick={onClickShareButton}>
          <Image
            src="/images/icons/twitter-small.png"
            alt="twitter icon"
            width={28}
            height={28}
          />
          <ShareButtonText>TWEET INVITE LINK</ShareButtonText>
        </ShareButtonContainer>
        <CopyInviteLink
          onClick={(e) => {
            e.preventDefault();

            const { twitterUsername } = router.query;

            navigator.clipboard.writeText(
              `https://app.icns.xyz?referral=${twitterUsername}`,
            );
          }}
        >
          copy invite link
          <svg
            style={{
              marginLeft: "4px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              strokeLinecap="square"
              strokeWidth="1.5"
              d="M10.667 2.667h-8v8"
            />
            <path
              strokeLinecap="square"
              strokeWidth="1.5"
              d="M5.417 5.417H13.25V13.25H5.417z"
            />
          </svg>
        </CopyInviteLink>
        <ComingSoonLeaderboardContainer>
          <RotateSvg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="26"
            fill="none"
            viewBox="0 0 28 26"
          >
            <path
              fill="#424242"
              d="M0.473 1.852H26.823999999999998V3.8790000000000004H0.473z"
            />
            <path
              fill="#6F6F6F"
              d="M0.473 22.122H26.823999999999998V24.149H0.473z"
            />
            <path
              fill="#424242"
              d="M13.986 12.662l11.703 9.629H2.283l11.703-9.629z"
            />
            <path
              fill="#6F6F6F"
              d="M13.986 12.662L2.284 3.54H25.69l-11.703 9.122z"
            />
          </RotateSvg>
          <ComingSoonLeaderboardContent>
            <ComingSoonLeaderboardContent1>
              Coming soon
            </ComingSoonLeaderboardContent1>
            <ComingSoonLeaderboardContent2>
              Leaderboard
            </ComingSoonLeaderboardContent2>
          </ComingSoonLeaderboardContent>
          <RotateSvg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="26"
            fill="none"
            viewBox="0 0 28 26"
          >
            <path
              fill="#424242"
              d="M0.473 1.852H26.823999999999998V3.8790000000000004H0.473z"
            />
            <path
              fill="#6F6F6F"
              d="M0.473 22.122H26.823999999999998V24.149H0.473z"
            />
            <path
              fill="#424242"
              d="M13.986 12.662l11.703 9.629H2.283l11.703-9.629z"
            />
            <path
              fill="#6F6F6F"
              d="M13.986 12.662L2.284 3.54H25.69l-11.703 9.122z"
            />
          </RotateSvg>
        </ComingSoonLeaderboardContainer>
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
  width: 31rem;

  padding: 2.625rem 0;

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
  margin: 0 4rem;
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

const SubLeaderboardIntroContainer = styled.div`
  margin: 0 2.5rem;
  margin-top: 2.5rem;

  padding: 1.25rem 1.5rem;

  background-color: ${color.grey["700"]};
`;

const SubLeaderboardIntroTitle = styled.div`
  font-weight: 600;
  font-size: 0.8125rem;
  line-height: 123.5%;

  margin-bottom: 0.75rem;

  color: ${color.grey["100"]};
`;

const SubLeaderboardIntroDescription = styled.div`
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 138%;

  color: ${color.grey["300"]};
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

const SpinnerWrapper = styled.div`
  display: flex;
  position: relative;

  width: 28px;
  height: 28px;
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

  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  ${({ animationDelay }) =>
    animationDelay ? `animation-delay: ${animationDelay};` : ""}

  border-radius: 100%;
  border-style: solid;
  border-width: 5px;
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

  margin-top: 1.5rem;
  margin-bottom: 1.125rem;

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
  letter-spacing: 0.07em;

  color: ${color.grey["100"]};
`;

const CopyInviteLink = styled.div`
  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 0.875rem;
  line-height: 102.5%;

  text-align: center;
  letter-spacing: 0.07em;
  text-transform: uppercase;

  color: ${color.grey["200"]};
  stroke: ${color.grey["200"]};

  &:hover {
    color: ${color.grey["300"]};
    stroke: ${color.grey["300"]};
  }

  cursor: pointer;
`;

const ComingSoonLeaderboardContainer = styled.div`
  margin-top: 4.5rem;

  height: 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ComingSoonLeaderboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 10rem;
`;

const ComingSoonLeaderboardContent1 = styled.div`
  font-weight: 600;
  font-size: 0.8125rem;
  line-height: 102.5%;

  letter-spacing: 0.19em;
  text-transform: uppercase;

  margin-bottom: 0.5rem;

  color: ${color.grey["700"]};
`;

const ComingSoonLeaderboardContent2 = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 102.5%;

  letter-spacing: 0.07em;
  text-transform: uppercase;

  color: ${color.grey["500"]};
`;

const RotateSvg = styled.svg`
  animation: ${spinAnimation} 4s linear infinite;
`;
