// NextJs
import Image from "next/image";
import Link from "next/link";

// Types
import { TwitterAuthUrlResponse } from "../types/api-response";

// Styles
import styled, { useTheme } from "styled-components";
import color from "../styles/color";

// Components
import { PrimaryButton } from "../components/primary-button";

// Image Assets
import MainTitle from "../public/images/svg/main-title.svg";
import MainLogo from "../public/images/svg/main-logo.svg";
import CheckIcon from "../public/images/svg/check-icon.svg";
import { Logo } from "../components/logo";

export default function Home() {
  const handleSignInWithTwitter = async () => {
    const { authUrl }: TwitterAuthUrlResponse = await (
      await fetch("/api/twitter-auth-url")
    ).json();

    window.location.href = authUrl;
  };

  return (
    <Container>
      <Logo />

      <MainContainer>
        <MainTitleContainer>
          <MainTitleImageBackground>
            <MainTitleImageContainer>
              <Image src={MainTitle} fill={true} alt="Main Title" />
            </MainTitleImageContainer>
          </MainTitleImageBackground>

          <ConnectButtonContainer>
            <Link href="/verification">
              <PrimaryButton>Connect Wallet</PrimaryButton>
            </Link>
          </ConnectButtonContainer>
          <SubContainer>
            <CheckContainer>
              <CheckIconContainer>
                <Image src={CheckIcon} fill={true} alt="Check Icon" />
              </CheckIconContainer>
              You are a <CheckBoldText>&nbsp;keplr&nbsp;</CheckBoldText> user.
              if not, you can install here
            </CheckContainer>
            <CheckContainer>
              <CheckIconContainer>
                <Image src={CheckIcon} fill={true} alt="Check Icon" />
              </CheckIconContainer>
              <CheckBoldText>Osmo&nbsp;</CheckBoldText> is required for this
              transaction
            </CheckContainer>
          </SubContainer>
        </MainTitleContainer>

        <MainLogoContainer>
          <Image src={MainLogo} layout="fixed" fill={true} alt="Main Logo" />
        </MainLogoContainer>
      </MainContainer>
    </Container>
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
