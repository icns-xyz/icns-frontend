import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { MINIMUM_OSMO_FEE } from "../../constants/wallet";
import color from "../../styles/color";
import { PrimaryButton } from "../primary-button";
import { SecondaryButton } from "../secondary-button";
import { Tooltip } from "react-tooltip";

interface Props {
  twitterUserName: string | undefined;
  walletInfo:
    | { name: string; pubKey: Uint8Array; bech32Address: string }
    | undefined;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickRegisterButton: () => Promise<void>;
  isLoadingRegistration?: boolean;
}

export const FinalCheckModal: FunctionComponent<Props> = (props) => {
  const {
    twitterUserName,
    walletInfo,
    isModalOpen,
    onCloseModal,
    onClickRegisterButton,
    isLoadingRegistration,
  } = props;
  const router = useRouter();

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      ariaHideApp={false}
      style={{
        overlay: { background: "#121212cc" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          padding: 0,
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: color.grey["800"],
          border: 0,
        },
      }}
    >
      <ModalContainer>
        <ModalTitle>Final Checks</ModalTitle>
        <ModalDescription>{`You are claiming the ICNS name "${twitterUserName}" on Keplr account`}</ModalDescription>

        <NameBox
          marginTop="3.875rem"
          icon={
            <Image
              src={require("../../public/images/icons/twitter-small.png")}
              alt="twitter"
              width={24}
              height={24}
              style={{
                marginRight: "4px",
              }}
            />
          }
          title="Your Twitter Handle"
          content={`${twitterUserName}`}
        />
        <div
          style={{
            width: "100%",
            height: "3.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              stroke="#EBEBEB"
              strokeLinecap="round"
              strokeWidth="2"
              d="M18.44 19.008h-2.656a5.162 5.162 0 00-5.162 5.162v0a5.162 5.162 0 005.162 5.162h2.655M29.305 28.988h2.655a5.162 5.162 0 005.162-5.162v0a5.162 5.162 0 00-5.162-5.162h-2.655M19.295 24.242h9.155"
            />
          </svg>
        </div>
        <NameBox
          marginTop="0"
          icon={
            <Image
              src={require("../../public/images/icons/keplr-small.png")}
              alt="twitter"
              width={20}
              height={20}
              style={{
                marginRight: "8px",
              }}
            />
          }
          title="Keplr account"
          content={walletInfo?.name || "Keplr account"}
          contentTooltip={{
            id: "address-tooltip",
            content: walletInfo?.bech32Address || "",
          }}
        />

        <SubTextsContainer>
          <SubTextList>
            <SubTextListItem>
              ICNS name can only be claimed once per Twitter account.
            </SubTextListItem>

            <SubTextListItem>
              ICNS name can’t be transferred at this time.
            </SubTextListItem>
            <SubTextListItem>
              Please make sure you’ve selected the right account on your wallet.
            </SubTextListItem>
          </SubTextList>
          <SubText>
            {MINIMUM_OSMO_FEE} will be spent as a spam-prevention fee.
          </SubText>
        </SubTextsContainer>

        <ButtonContainer>
          <RegisterButton>
            <PrimaryButton
              onClick={onClickRegisterButton}
              isLoading={isLoadingRegistration}
            >
              Register
            </PrimaryButton>
          </RegisterButton>
          <CancelButton>
            <SecondaryButton
              onClick={async () => {
                await router.push("/");
              }}
            >
              Use a different account
            </SecondaryButton>
          </CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 37.5rem;

  padding: 2rem 2.25rem;

  font-family: "Inter", serif;
  font-style: normal;
`;

const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 1.625rem;
  line-height: 1.94rem;

  color: ${color.white};

  margin-bottom: 1rem;
`;

const ModalDescription = styled.div`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.18rem;

  color: ${color.grey["100"]};
`;

const SubTextsContainer = styled.div`
  margin-top: 1.75rem;

  padding: 1rem 1.75rem;

  background-color: ${color.grey["700"]};
`;

const SubTextList = styled.ul`
  margin: 0 0 1rem;
  padding: 0 0.75rem;
`;

const SubTextListItem = styled.li`
  font-weight: 400;
  font-size: 0.815rem;
  line-height: 1.5rem;

  color: ${color.grey["300"]};
`;

const SubText = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 1.5rem;
  color: ${color.grey["200"]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  margin-top: 1.75rem;
`;

const RegisterButton = styled.div`
  width: 60%;
  height: 4.125rem;
`;

const CancelButton = styled.div`
  width: 80%;
  margin-top: 0.75rem;
`;

const NameBox: FunctionComponent<{
  title: string;
  content: string;

  contentTooltip?: {
    id: string;
    content: string;
  };

  icon?: React.ReactElement;

  marginTop: string;
}> = ({ icon, title, content, contentTooltip, marginTop }) => {
  return (
    <NameBoxContainer
      style={{
        marginTop,
      }}
    >
      <NameBoxTitleContainer>
        {icon ? <NameBoxIconContainer>{icon}</NameBoxIconContainer> : null}
        <NameBoxTitle>{title}</NameBoxTitle>
      </NameBoxTitleContainer>
      <NameBoxContentContainer
        style={{
          textDecoration: contentTooltip ? "underline" : undefined,
        }}
      >
        <div
          id={contentTooltip?.id}
          data-tooltip-content={contentTooltip?.content}
          data-tooltip-place="top"
        >
          {content}
        </div>
        {contentTooltip ? (
          <Tooltip
            anchorId={contentTooltip.id}
            style={{
              backgroundColor: color.grey["400"],
              color: color.white,
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "17px",
            }}
          />
        ) : null}
      </NameBoxContentContainer>
    </NameBoxContainer>
  );
};

const NameBoxContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  font-family: "Inter", serif;
  font-style: normal;
`;

const NameBoxTitleContainer = styled.div`
  position: absolute;
  top: -1.9rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameBoxIconContainer = styled.div`
  display: flex;
  align-items: center;

  height: 1px;
`;

const NameBoxTitle = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.05rem;

  color: ${color.grey["100"]};
`;

const NameBoxContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 2rem 0;
  
  background-color ${color.grey["600"]};
  border: 1px solid ${color.grey["300"]};

  font-weight: 600;
  font-size: 1.375rem;
  line-height: 1.6875rem;
  
  color: ${color.white}
`;
