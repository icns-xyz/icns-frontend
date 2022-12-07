import styled from "styled-components";
import color from "../../styles/color";
import { WidthHeightProps } from "../../types";
import { SkeletonAnimation } from "../../components/skeleton";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;

  margin-top: 5rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  padding: 1.5rem 2rem;

  background-color: ${(props) => props.color};
`;

export const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  margin-left: 1.5rem;
`;

export const ProfileFollowContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;
`;

export const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 33rem;
  overflow: scroll;

  background-color: ${(props) => props.color};
`;

export const ChainItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  padding: 1.5rem;

  &:hover {
    background: ${color.grey["900"]};
  }
`;

export const ChainImageContainer = styled.div<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  position: relative;
`;

export const ChainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ButtonContainer = styled.div`
  width: 10rem;
  height: 4rem;

  margin-top: 2rem;
`;

export const SkeletonButton = styled.div`
  width: 12rem;
  height: 4rem;

  background-color: ${color.grey["700"]};
`;

export const SkeletonDivider = styled(SkeletonAnimation)`
  width: 100%;
  height: 1px;
  background-color: ${color.grey["600"]};
`;

export const ProfileImageContainer = styled.div`
  width: 5rem;
  height: 5rem;

  margin-top: -3rem;

  border-radius: 50%;

  overflow: hidden;

  position: relative;
`;

export const ProfileNameContainer = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;

  color: ${color.white};
`;

export const ProfileUserNameContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["100"]};
`;

export const ProfileFollowerContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

export const ProfileFollowBold = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.white};
`;

export const ProfileDescriptionContainer = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["300"]};
`;

export const ChainListTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const ChainListTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.9rem;

  color: ${color.white};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  border-radius: 3rem;

  min-width: 10rem;
  height: 2rem;

  background-color: ${color.grey["700"]};
`;

export const ChainName = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["100"]};
`;

export const WalletAddress = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

export const Flex1 = styled.div`
  flex: 1;
`;

export const ChainCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 1.5rem;
  height: 1.5rem;
`;
