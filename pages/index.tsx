// NextJs
import Image from "next/image";

// Styles
import styled, { Theme, ThemeProvider } from "styled-components";
import color from "../styles/color";

// Components
import { PrimaryButton } from "../components/primary-button";
import { ConnectWalletModal } from "../components/connect-wallet-modal";

// Image Assets
import MainTitle from "../public/images/svg/main-title.svg";
import MainLogo from "../public/images/svg/main-logo.svg";
import CheckIcon from "../public/images/svg/check-icon.svg";
import { Logo } from "../components/logo";
import { useEffect, useState } from "react";
import { SELECTED_WALLET_KEY } from "../constants/wallet";

import { PageBackground } from "../styles/background";

const theme: Theme = {
  bgColor: "rgba(18, 18, 18, 1)",
  bgGridColor: "rgba(51, 51, 51, 1)",
};

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const onClickConnectWalletButton = async () => {
    setModalOpen(true);
  };

  useEffect(() => {
    localStorage.removeItem(SELECTED_WALLET_KEY);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageBackground>
        <Container>
          <Logo />

          <MainContainer>
            <MainTitleContainer>
              <MainTitleImageBackground>
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

              <ConnectButtonContainer>
                <PrimaryButton onClick={onClickConnectWalletButton}>
                  Connect Wallet
                </PrimaryButton>
              </ConnectButtonContainer>
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
                  You are a <CheckBoldText>&nbsp;keplr&nbsp;</CheckBoldText>{" "}
                  user. if not, you can install here
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
                  <CheckBoldText>Osmo&nbsp;</CheckBoldText> is required for this
                  transaction
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
      </PageBackground>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 15rem;
  margin-left: 10rem;
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

const ConnectButtonContainer = styled.div`
  width: 19.9rem;
  height: 5rem;

  margin-left: 5rem;
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

  color: ${color.grey["300"]};
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
