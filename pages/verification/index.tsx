// Style
import styled from "styled-components";
import { Logo } from "../../components/logo";
import color from "../../styles/color";

export default function VerificationPage() {
  return (
    <Container>
      <Logo />

      <MainContainer>
        <ContentContainer>
          <ProfileContainer color={color.grey["700"]}>
            <SkeletonCircle width="5.5rem" height="5.5rem" />
            <ProfileContentContainer>
              <SkeletonText width="5rem" height="1.5rem" />
              <ProfileFollowContainer>
                <SkeletonText width="8rem" height="1rem" />
                <SkeletonText width="8rem" height="1rem" />
              </ProfileFollowContainer>

              <SkeletonText width="20rem" height="1rem" />
            </ProfileContentContainer>
          </ProfileContainer>

          <SkeletonTitle />

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
          </ChainContainer>

          <ButtonContainer>
            <SkeletonButton />
          </ButtonContainer>
        </ContentContainer>
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
  justify-content: center;

  color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 40rem;

  margin-top: 5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  padding: 2rem 2rem;

  background-color: ${(props) => props.color};
`;

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-left: 1.5rem;
`;

const ProfileFollowContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 2rem;
`;

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;

  padding: 2rem 2rem 1rem 2rem;

  background-color: ${(props) => props.color};
`;

const ChainItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1rem;
`;

const ChainImageContainer = styled.div<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  position: relative;
`;

const ChainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`;

interface WidthHeightProps {
  width: string | number;
  height: string | number;
}

const SkeletonAnimation = styled.div`
  opacity: 0.35 !important;
  background-image: linear-gradient(
      0.25turn,
      transparent,
      ${color.grey["400"]},
      transparent
    ),
    linear-gradient(${color.grey["500"]}, ${color.grey["500"]}),
    radial-gradient(
      38px circle at 19px 19px,
      ${color.grey["500"]} 50%,
      transparent 51%
    ),
    linear-gradient(${color.grey["500"]}, ${color.grey["500"]});
  background-repeat: no-repeat;
  background-size: 315px 250px, 315px 180px, 100px 100px, 225px 30px;
  background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
  animation: loading 2s infinite;

  @keyframes loading {
    to {
      background-position: 315px 0, 0 0, 0 190px, 50px 195px;
    }
  }
`;

const SkeletonCircle = styled(SkeletonAnimation)<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: ${color.grey["500"]};
  border-radius: 50%;
`;

const SkeletonText = styled(SkeletonAnimation)<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const SkeletonTitle = styled.div`
  width: 8rem;
  height: 1.5rem;

  margin-top: 3rem;
  margin-bottom: 1rem;

  background-color: ${color.grey["700"]};
`;

const SkeletonButton = styled.div`
  width: 12rem;
  height: 4rem;

  background-color: ${color.grey["700"]};
`;

const SkeletonDivider = styled(SkeletonAnimation)`
  width: 100%;
  height: 1px;
  background-color: ${color.grey["600"]};
`;
