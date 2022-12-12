import Image from "next/image";
import styled from "styled-components";

import Typed from "react-typed";

import { Logo } from "../../components/logo";
import color from "../../styles/color";

import AlertCircleOutlineIcon from "../../public/images/svg/alert-circle-outline.svg";
import TwitterIcon from "../../public/images/svg/twitter-icon.svg";

export default function CompletePage() {
  return (
    <Container>
      <Logo />

      <MainContainer>
        <MainTitle>Your Name is Active Now!</MainTitle>
        <ContentContainer>
          <RecipentContainer>
            <RecipentTitle>Recipent</RecipentTitle>
            <AddressContainer>
              kingstarcookies.
              <Typed
                strings={["osmo", "cosmos"]}
                typeSpeed={150}
                backSpeed={150}
                backDelay={1000}
                loop
                smartBackspace
              />
            </AddressContainer>
            <AvailableAddressText>available address</AvailableAddressText>
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

        <ShareButtonContainer>
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
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;

  padding: 1rem;
`;

const ContentContainer = styled.div`
  width: 30rem;

  margin-top: 1rem;
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

  color: ${color.blue};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1rem;

  width: 30rem;

  margin-top: 1.5rem;
  padding: 1.5rem 2rem;

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
  line-height: 0.8rem;

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
