import * as amplitude from "@amplitude/analytics-browser";

// NextJs
import Image from "next/image";

// Styles
import styled from "styled-components";
import color from "../styles/color";

// Components
import { PrimaryButton } from "../components/primary-button";
import { ConnectWalletModal } from "../components/connect-wallet-modal";

// Image Assets
import MainTitle from "../public/images/svg/main-title.svg";
import MainLogo from "../public/images/svg/main-logo.svg";
import CheckIcon from "../public/images/svg/check-icon.svg";
import StarIcon from "../public/images/svg/bg-asset-3.svg";
import { Logo } from "../components/logo";
import { useEffect, useState } from "react";
import { MINIMUM_OSMO_FEE, SELECTED_WALLET_KEY } from "../constants/wallet";
import { replaceToInstallPage } from "../utils/url";
import { REFERRAL_KEY } from "../constants/icns";

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
            <Image
              src={StarIcon}
              width={50}
              height={50}
              alt="Star Icon"
              className="starIcon first"
            />
            <Image
              src={StarIcon}
              width={50}
              height={50}
              alt="Star Icon"
              className="starIcon last"
            />
            <MainTitleImageContainer>
              <Image
                src={MainTitle}
                fill={true}
                sizes="60rem"
                alt="Main Title"
                priority
              />
            </MainTitleImageContainer>
          </MainTitleImageBackground>

          <CTAContainer>
            <ConnectButtonContainer>
              <PrimaryButton onClick={onClickConnectWalletButton}>
                Connect Wallet
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
              <CheckIconContainer>
                <Image
                  src={CheckIcon}
                  fill={true}
                  sizes="1.6rem"
                  alt="Check Icon"
                />
              </CheckIconContainer>
              You are a <CheckBoldText>&nbsp;keplr&nbsp;</CheckBoldText> user.
              if not, you can install&nbsp;
              <InstallLInk onClick={replaceToInstallPage}>HERE</InstallLInk>
            </CheckContainer>
            <CheckContainer>
              <CheckIconContainer>
                <Image
                  src={CheckIcon}
                  fill={true}
                  sizes="1.6rem"
                  alt="Check Icon"
                />
              </CheckIconContainer>
              <CheckBoldText>{MINIMUM_OSMO_FEE}&nbsp;</CheckBoldText> is
              required for this transaction
            </CheckContainer>
          </SubContainer>
        </MainTitleContainer>

        <MainLogoContainer>
          <Image src={MainLogo} fill={true} sizes="25rem" alt="Main Logo" />
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

  img.starIcon {
    position: absolute;

    &.first {
      left: -24px;
      top: -24px;
    }

    &.last {
      right: -23px;
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

  width: 70rem;
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

  right: 2.5rem;

  min-width: 25rem;
  height: 25rem;
`;

const CTAContainer = styled.div`
  display: flex;
`;

const ConnectButtonContainer = styled.div`
  width: 19.9rem;
  height: 5rem;

  margin-left: 5rem;
  margin-right: 26px;
`;

const ICNSDescription = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #6c6c6c;
`;

const LearnMoreLink = styled.a`
  color: #6c6c6c;

  &:link,
  &:hover,
  &:active &:visited {
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

  margin-top: 5.1rem;
  margin-left: 5rem;

  background-color: ${color.black};
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 16px;

  text-transform: uppercase;

  padding-left: 0.75rem;

  color: ${color.grey["400"]};
`;

const InstallLInk = styled.a`
  color: ${color.grey["400"]};
  text-decoration: underline;

  cursor: pointer;
`;

const CheckBoldText = styled.span`
  font-size: 0.8rem;

  color: ${color.grey["100"]};
`;

const CheckIconContainer = styled.div`
  position: relative;

  width: 1.6rem;
  height: 1.5rem;
`;
