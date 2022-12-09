import color from "../../styles/color";
import styled from "styled-components";
import { TwitterAuthInfoResponse } from "../../types";
import { FunctionComponent } from "react";
import Image from "next/image";

interface Props {
  twitterProfileInformation?: TwitterAuthInfoResponse | null;
}

export const TwitterProfile: FunctionComponent<Props> = (props) => {
  const { twitterProfileInformation } = props;

  return (
    <ProfileContainer color={color.grey["800"]}>
      <ProfileImageContainer>
        <Image
          src={twitterProfileInformation?.profile_image_url ?? ""}
          fill={true}
          alt="twitter profile image"
        />
      </ProfileImageContainer>

      <ProfileContentContainer>
        <ProfileNameContainer>
          {twitterProfileInformation?.name}
        </ProfileNameContainer>
        <ProfileUserNameContainer>
          @{twitterProfileInformation?.username}
        </ProfileUserNameContainer>

        <ProfileFollowContainer>
          <ProfileFollowerContainer>
            <ProfileFollowBold>
              {twitterProfileInformation?.public_metrics?.following_count}
            </ProfileFollowBold>{" "}
            Following
          </ProfileFollowerContainer>

          <ProfileFollowerContainer>
            <ProfileFollowBold>
              {twitterProfileInformation?.public_metrics?.followers_count}
            </ProfileFollowBold>{" "}
            Followers
          </ProfileFollowerContainer>
        </ProfileFollowContainer>

        <ProfileDescriptionContainer>
          {twitterProfileInformation?.description}
        </ProfileDescriptionContainer>
      </ProfileContentContainer>
    </ProfileContainer>
  );
};

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

export const ProfileFollowContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;
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

  color: ${color.grey["100"]};
`;
