import Image from "next/image";
import styled from "styled-components";

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
    const txTracer = new TendermintTxTracer(
      "https://rpc.testnet.osmosis.zone",
      "/websocket",
    );

    try {
      const result: { code?: number } = await txTracer.traceTx(
        Buffer.from(txHash, "hex"),
      );

      if (!result.code || result.code === 0) {
        const addresses = await queryAddressesFromTwitterName(twitterUserName);
        setRegisteredAddressed(addresses.data.addresses);
        setIsSuccess(true);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickShareButton = () => {
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
        <MainTitle>
          {isSuccess && (
            <Typed
              strings={["Your Name is Active Now!"]}
              stopped={!isSuccess}
              typeSpeed={100}
            />
          )}
        </MainTitle>
        <ContentContainer>
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
            <Image src={AlertCircleOutlineIcon} fill={true} alt="alert icon" />
          </AlertIcon>
          <DescriptionText>
            If you want to make that name address with same twitter account,
            just go to home and start again.
          </DescriptionText>
        </DescriptionContainer>

        <ShareButtonContainer onClick={onClickShareButton}>
          <ShareButtonText>SHARE MY NAME</ShareButtonText>
          <Image src={TwitterIcon} alt="twitter icon" />
        </ShareButtonContainer>
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

  padding-top: 10.1rem;

  color: white;
`;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;

  height: 5rem;
`;

const ContentContainer = styled.div`
  width: 30rem;

  padding: 2rem 2rem;

  background-color: ${color.grey["900"]};
`;

const RecipentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 2rem;
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
