import * as amplitude from "@amplitude/analytics-browser";

// Styles
import styled from "styled-components";
import color from "../styles/color";

// Components
import { ConnectWalletModal } from "../components/connect-wallet-modal";
import { PrimaryButton } from "../components/primary-button";

// Image Assets
import { useEffect, useState } from "react";
import { Logo } from "../components/logo";
import { REFERRAL_KEY } from "../constants/icns";
import { SELECTED_WALLET_KEY } from "../constants/wallet";
import StarIcon from "../public/images/svg/bg-asset-3.svg";
import CheckIcon from "../public/images/svg/check-icon.svg";
import MainLogo from "../public/images/svg/main-logo.svg";
import MainTitle from "../public/images/svg/main-title.svg";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const onClickConnectWalletButton = async () => {
    amplitude.track("click connect wallet button");

    setModalOpen(true);
  };

  useEffect(() => {
    localStorage.removeItem(REFERRAL_KEY);

    if (window.location.search) {
      const [, referral] =
        window.location.search.match(/^(?=.*referral=([^&]+)|).+$/) || [];

      if (referral) {
        localStorage.setItem(REFERRAL_KEY, referral);
      }
    }

    localStorage.removeItem(SELECTED_WALLET_KEY);
  }, []);

  return (
    <Container>
      <Logo />

      <MainContainer>
        <MainTitleContainer>
          <MainTitleImageBackground>
            <StarIcon className="starIcon first" />
            <StarIcon className="starIcon last" />
            <MainTitleImageContainer>
              <MainTitle />
            </MainTitleImageContainer>
          </MainTitleImageBackground>

          <CTAContainer>
            <ConnectButtonContainer>
              <PrimaryButton onClick={onClickConnectWalletButton}>
                Claim Now
              </PrimaryButton>
            </ConnectButtonContainer>
            <ICNSDescription>
              ICNS allows you to use easy-to-remember names instead of
              addresses.
              <br />
              <LearnMoreLink
                href="https://medium.com/@icns/announcing-icns-the-interchain-name-service-e61e0c3e2abb"
                target="_blank"
              >
                Learn More
              </LearnMoreLink>
            </ICNSDescription>
          </CTAContainer>
          <SubContainer>
            <CheckContainer>
              <CheckIcon />
              Osmo is required for this transaction
            </CheckContainer>
            <CheckContainer>
              <CheckIcon />
              More wallet support coming soon
            </CheckContainer>
          </SubContainer>
        </MainTitleContainer>

        <MainLogoContainer>
          <MainLogo />
        </MainLogoContainer>
      </MainContainer>

      <ConnectWalletModal
        isModalOpen={isModalOpen}
        onCloseModal={() => setModalOpen(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  background-image: url("/images/svg/bg-asset-1.svg"),
    url("/images/svg/bg-asset-2.svg"), url("/images/svg/bg-asset-2.svg"),
    url("/images/svg/bg-asset-3.svg"), url("/images/svg/bg-asset-3.svg");
  background-size: 5rem 5rem, 5rem 5rem, 5rem 5rem, 3.125rem 3.125rem,
    3.125rem 3.125rem;
  background-position: 80px 640px, 960px 80px, 1200px 720px, 136px 776px,
    1016px 696px;
  background-repeat: no-repeat;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 15rem;
  margin-left: 10rem;

  .starIcon {
    position: absolute;

    &.first {
      left: -24px;
      top: -24px;
    }

    &.last {
      right: -24px;
      top: -24px;
    }
  }
`;

const MainTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: 0.1rem;
`;

const MainTitleImageBackground = styled.div`
  display: flex;
  justify-content: center;

  width: calc(70rem - 1.5px);
  height: 19.9rem;

  background-color: ${color.black};
`;

const MainTitleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 60rem;
  height: 19.9rem;
`;

const MainLogoContainer = styled.div`
  position: relative;

  right: 2.58rem;

  min-width: 25rem;
  height: 25rem;
`;

const CTAContainer = styled.div`
  display: flex;
`;

const ConnectButtonContainer = styled.div`
  width: calc(20rem - 2px);
  height: calc(5rem - 1.5px);

  margin: 1.5px 1.5px 1.5px 5.01rem;
`;

const ICNSDescription = styled.p`
  background-color: ${color.black};

  width: calc(40rem - 3px);
  height: calc(5rem - 1.5px);
  margin: 1.5px;
  padding: 13.5px 26px;

  font-weight: 500;
  font-size: 16px;
  line-height: 162%;
  color: #6c6c6c;
`;

const LearnMoreLink = styled.a`
  color: #6c6c6c;

  &:link,
  &:hover,
  &:active,
  &:visited {
    color: #6c6c6c;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  width: 29.9rem;
  height: 4.9rem;

  margin-top: 5rem;
  margin-left: 5rem;

  background-color: ${color.black};
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 117.5%;
  padding-left: 0.75rem;

  color: ${color.grey["400"]};
`;

const CheckIconContainer = styled.div`
  position: relative;

  width: 1.6rem;
  height: 1.5rem;
`;
