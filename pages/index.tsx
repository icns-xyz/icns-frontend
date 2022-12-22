import * as amplitude from "@amplitude/analytics-browser";

// Styles
import styled from "styled-components";
import color from "../styles/color";

// Components
import { ConnectWalletModal } from "../components/connect-wallet-modal";
import {
  PrimaryButton,
  Spinner,
  SpinnerWrapper,
} from "../components/primary-button";

// Image Assets
import { useEffect, useState } from "react";
import { Logo } from "../components/logo";
import { CLAIM_URL, REFERRAL_KEY } from "../constants/icns";
import { SELECTED_WALLET_KEY } from "../constants/wallet";
import StarIcon from "../public/images/svg/bg-asset-3.svg";
import CheckIcon from "../public/images/svg/check-icon.svg";
import MainLogo from "../public/images/svg/main-logo.svg";
import MainTitle from "../public/images/svg/main-title.svg";
import CountUp from "react-countup";
import useInterval from "../hooks/use-interval";

export default function Home() {
  const [currentReferral, setCurrentReferral] = useState("");

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);

  const [count, setCount] = useState<{ start: number; end: number }>();

  const onClickConnectWalletButton = async () => {
    amplitude.track("click connect wallet button");

    setIsConnectWalletModalOpen(true);
  };

  useEffect(() => {
    localStorage.removeItem(REFERRAL_KEY);

    if (window.location.search) {
      const [, referral] =
        window.location.search.match(/^(?=.*referral=([^&]+)|).+$/) || [];

      if (referral) {
        localStorage.setItem(REFERRAL_KEY, referral);
        setCurrentReferral(referral);
      }
    }

    localStorage.removeItem(SELECTED_WALLET_KEY);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      countUpCallback();
    }, 1000);
  }, []);

  useInterval(async () => {
    await countUpCallback();
  }, 10000);

  const countUpCallback = async () => {
    const response: { data: { count: number } } = await (
      await fetch(CLAIM_URL)
    ).json();

    setCount({
      start: (count?.end ?? 100) - 100,
      end: response.data.count,
    });
  };

  return (
    <Container>
      <Logo />

      <CountUpContainer>
        {count ? (
          <CountUpText>
            <CountUp start={count?.start} end={count?.end ?? 0} duration={1} />
          </CountUpText>
        ) : (
          <SpinnerWrapper>
            <Spinner />
            <Spinner />
            <Spinner />
            <Spinner />
          </SpinnerWrapper>
        )}
        <CountUpDescription>ICNS names claimed so far</CountUpDescription>
      </CountUpContainer>
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
              0.5+ Osmo is required for this transaction{" "}
              <a
                href="https://app.osmosis.zone"
                target="_blank"
                rel="noreferrer"
              >
                GET OSMO
              </a>
            </CheckContainer>
            <CheckContainer>
              <CheckIcon />
              Make sure you have a Cosmos wallet installed
            </CheckContainer>
          </SubContainer>
        </MainTitleContainer>

        <MainLogoContainer>
          <MainLogo />
        </MainLogoContainer>
      </MainContainer>

      <ConnectWalletModal
        isModalOpen={isConnectWalletModalOpen}
        onCloseModal={() => setIsConnectWalletModalOpen(false)}
        currentReferal={currentReferral}
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

const CountUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  width: calc(25rem - 2px);
  height: calc(5rem - 2px);

  position: absolute;

  margin-top: calc(10rem + 2px);
  margin-left: calc(55rem + 2px);

  background-color: ${color.black};
`;

const CountUpText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.46rem;

  color: ${color.white};
`;

const CountUpDescription = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.1rem;

  color: ${color.grey["400"]};
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
  gap: 0.25rem;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 117.5%;
  padding-left: 0.75rem;

  color: ${color.grey["400"]};

  a {
    color: ${color.grey["400"]};
  }
`;
