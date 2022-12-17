import styled from "styled-components";
import color from "../../styles/color";

import { FunctionComponent } from "react";

import { SkeletonAnimation } from "./skeleton-animation";
import { SkeletonCircle } from "./skeleton-circle";
import { SkeletonText } from "./skeleton-text";
import {
  ChainListTitleContainer,
  ContentContainer,
  ButtonContainer,
} from "../../pages/verification";

import {
  ProfileContainer,
  ProfileContentContainer,
  ProfileFollowContainer,
  ProfileNameContainer,
  ProfileUserNameContainer,
} from "../twitter-profile";
import {
  ChainContainer,
  ChainImageContainer,
  ChainInfoContainer,
  ChainItemContainer,
} from "../chain-list";

export const SkeletonChainList: FunctionComponent = () => (
  <ContentContainer>
    <SkeletonContainer>
      <ProfileContainer color={color.grey["800"]}>
        <SkeletonCircle width="5.5rem" height="5.5rem" />

        <ProfileContentContainer>
          <ProfileNameContainer>
            <SkeletonText width="5rem" height="1.5rem" />
          </ProfileNameContainer>
          <ProfileUserNameContainer>
            <SkeletonText width="5rem" height="1rem" />
          </ProfileUserNameContainer>

          <ProfileFollowContainer>
            <SkeletonText width="8rem" height="1rem" />
            <SkeletonText width="8rem" height="1rem" />
          </ProfileFollowContainer>

          <SkeletonText width="20rem" height="1rem" />
        </ProfileContentContainer>
      </ProfileContainer>
    </SkeletonContainer>

    <ChainListTitleContainer>
      <SkeletonTitle />
    </ChainListTitleContainer>

    <ChainContainer color={color.grey["800"]}>
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div key={index}>
            <ChainItemContainer isLoading={true} isSkeleton={true}>
              <ChainImageContainer width="3rem" height="3rem">
                <SkeletonCircle width="3rem" height="3rem" />
              </ChainImageContainer>
              <ChainInfoContainer>
                <SkeletonText width="4rem" height="1rem" />
                <SkeletonText width="12rem" height="1rem" />
              </ChainInfoContainer>
            </ChainItemContainer>

            <SkeletonDivider />
          </div>
        ))}
    </ChainContainer>

    <SkeletonButtonContainer>
      <ButtonContainer>
        <SkeletonButton />
      </ButtonContainer>
    </SkeletonButtonContainer>
  </ContentContainer>
);

const SkeletonContainer = styled.div`
  width: 100%;
  padding-top: 2.4rem;
`;

const SkeletonTitle = styled.div`
  width: 8rem;
  height: 1.5rem;
  background-color: ${color.grey["800"]};
`;

const SkeletonButtonContainer = styled.div`
  margin-top: 1.5rem;
`;

const SkeletonButton = styled.div`
  width: 12rem;
  height: 4rem;

  padding-top: 1.5rem;

  background-color: ${color.grey["800"]};
`;

const SkeletonDivider = styled(SkeletonAnimation)`
  width: 100%;
  height: 1px;
  background-color: ${color.grey["600"]};
`;
