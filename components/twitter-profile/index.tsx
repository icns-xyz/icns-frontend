import color from "../../styles/color";
import styled from "styled-components";
import { TwitterAuthInfoResponse } from "../../types";
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

import ICNSIcon from "../../public/images/svg/icns-logo.svg";

interface Props {
  isOwner?: boolean;
  registeredTwitterName?: string;
  twitterProfileInformation?: TwitterAuthInfoResponse | null;
}

export const TwitterProfile: FunctionComponent<Props> = (props) => {
  const { isOwner, registeredTwitterName, twitterProfileInformation } = props;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onClickInviteLink = async () => {
    await navigator.clipboard.writeText(
      `https://app.icns.xyz?referral=${registeredTwitterName}`,
    );

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <ProfileContainer color={color.grey["900"]}>
      {registeredTwitterName ? (
        isCopied ? (
          <InviteLinkContainer>
            copied
            <CopiedIcon
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4.92614L6.08333 9.9375L12.5 2.0625"
                stroke="current"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </CopiedIcon>
          </InviteLinkContainer>
        ) : (
          <InviteLinkContainer onClick={onClickInviteLink}>
            copy invite link
            <CopyIcon
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="current"
                strokeLinecap="square"
                strokeWidth="1.5"
                d="M10.667 2.667h-8v8"
              />
              <path
                stroke="current"
                strokeLinecap="square"
                strokeWidth="1.5"
                d="M5.417 5.417H13.25V13.25H5.417z"
              />
            </CopyIcon>
          </InviteLinkContainer>
        )
      ) : null}
      <ProfileImageContainer>
        <Image
          src={twitterProfileInformation?.profile_image_url ?? ""}
          fill={true}
          sizes="5rem"
          alt="twitter profile image"
        />
      </ProfileImageContainer>

      <ProfileContentContainer>
        <ProfileNameContainer>
          <ProfileName>{twitterProfileInformation?.name}</ProfileName>

          {isOwner ? (
            <IsOwnerIcon>
              <ICNSIcon />
            </IsOwnerIcon>
          ) : null}
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

  position: relative;

  width: 100%;

  padding: 1.5rem 2rem;

  background-color: ${(props) => props.color};
`;

const CopyIcon = styled.svg`
  stroke: ${color.grey["100"]};
`;

const CopiedIcon = styled.svg`
  stroke: ${color.grey["100"]};
`;

export const InviteLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;

  position: absolute;

  top: 1.75rem;
  right: 1.5rem;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 0.875rem;
  text-transform: uppercase;

  color: ${color.grey["100"]};

  cursor: pointer;

  &:hover {
    color: ${color.grey["200"]};

    ${CopyIcon} {
      stroke: ${color.grey["200"]};
    }
  }
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;

  color: ${color.white};
`;

export const IsOwnerIcon = styled.div`
  height: 1px;
  background-color: red;
  margin-top: 0.1rem;

  display: flex;
  align-items: center;
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

  max-width: 27.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${color.grey["100"]};
`;
