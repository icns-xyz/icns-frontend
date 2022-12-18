import { FunctionComponent } from "react";
import color from "../../styles/color";
import ReactModal from "react-modal";
import styled from "styled-components";
import TwitterIcon from "../../public/images/svg/twitter-modal-icon.svg";
import Image from "next/image";
import { PrimaryButton } from "../primary-button";
import { SecondaryButton } from "../secondary-button";
import { MINIMUM_OSMO_FEE } from "../../constants/wallet";
import { useRouter } from "next/router";

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
        <MainText>You are claiming the ICNS name</MainText>
        <ICNSNameContainer>
          <BoldText>{twitterUserName}</BoldText>
          <TwitterImageContainer>
            <Image
              src={TwitterIcon}
              fill={true}
              sizes="2rem"
              alt="twitter icon"
            />
          </TwitterImageContainer>
        </ICNSNameContainer>
        <MainText>on</MainText>
        <BoldText>{walletInfo?.name}</BoldText>
        <MainText>({walletInfo?.bech32Address})</MainText>
        <Divider />
        <SubText>
          ☑️ ICNS name can only be claimed once per Twitter account.
          <br />
          ☑️ ICNS name can’t be transferred at this time.
          <br />
          ☑️ Please make sure you’ve selected the right account on your wallet.
        </SubText>

        <SubText>
          <SubBoldText>{MINIMUM_OSMO_FEE}</SubBoldText> will be spent as a
          spam-prevention fee.
        </SubText>

        <ButtonContainer>
          <SecondaryButton
            onClick={async () => {
              await router.push("/");
            }}
          >
            Use a different account
          </SecondaryButton>
          <RegisterButton>
            <PrimaryButton
              onClick={onClickRegisterButton}
              isLoading={isLoadingRegistration}
            >
              Register
            </PrimaryButton>
          </RegisterButton>
        </ButtonContainer>
      </ModalContainer>
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 50rem;

  padding: 1.75rem 2rem;
`;

const ModalTitle = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.8rem;

  margin-bottom: 1rem;

  color: ${color.white};
`;

const ICNSNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
`;

const TwitterImageContainer = styled.div`
  width: 2rem;
  height: 2rem;

  margin-top: 0.4rem;

  position: relative;
`;

const MainText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2rem;

  color: ${color.white};
`;

const SubText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;

  color: ${color.grey["300"]};
`;

const SubBoldText = styled.span`
  color: ${color.grey["100"]};
`;

const BoldText = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.5rem;

  color: ${color.orange["50"]};
`;

const Divider = styled.div`
  width: 100%;

  margin: 1.625rem 0;

  border: 0.5px solid ${color.grey["500"]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.5rem;

  margin-top: 2.5rem;
  padding: 0 4.25rem;

  gap: 3.5rem;
`;

const RegisterButton = styled.div`
  width: 10rem;
`;
