import { FunctionComponent } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import styled from "styled-components";
import { WalletType } from "../../constants/wallet";
import { loginWithTwitter } from "../../queries";
import color from "../../styles/color";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  currentReferal?: string;
  walletKeyName: string;
  selectedWalletItem?: WalletType;
}

export const BeforeYouStartModal: FunctionComponent<Props> = (props) => {
  const {
    isModalOpen,
    onCloseModal,
    currentReferal,
    walletKeyName,
    selectedWalletItem,
  } = props;

  const handleClickButton = async () => {
    await loginWithTwitter();
  };

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
        <ModalTitle>Before you start</ModalTitle>
        {currentReferal && (
          <ModalDescription>
            {"You're invited by"}
            <Image
              style={{ marginLeft: "4px" }}
              src="/images/icons/twitter-small.png"
              alt="twitter icon"
              width={18}
              height={18}
            />
            <ModalDescriptionBold>{currentReferal}</ModalDescriptionBold>
          </ModalDescription>
        )}
        <SubTextsContainer>
          <SubTextList>
            <SubTextListItem>
              ICNS requires you to verify ownership of your Twitter account.
            </SubTextListItem>
            <br />
            <SubTextListItem>
              ICNS name stays the same even if your Twitter handle changes in
              the future.
            </SubTextListItem>
            <br />
            <SubTextListItem>
              ICNS names could permanently link your Twitter identity to your
              crypto wallet, recorded on the blockchain.
            </SubTextListItem>
          </SubTextList>
        </SubTextsContainer>
        <WalletAccountContainer>
          <WalletAccountLabel>{"Claim ICNS name for"}</WalletAccountLabel>
          <WalletAccountValue>
            {selectedWalletItem && (
              <selectedWalletItem.IconComponent width={16} height={16} />
            )}
            <WalletAccountName>{walletKeyName}</WalletAccountName>
          </WalletAccountValue>
        </WalletAccountContainer>
        <ClaimWithTwitterButton onClick={handleClickButton}>
          <Image
            src="/images/icons/twitter-small.png"
            alt="twitter icon"
            width={28}
            height={28}
          />
          CLAIM WITH TWITTER
        </ClaimWithTwitterButton>
      </ModalContainer>
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 2.25rem;

  max-width: 28.5rem;
`;

const ModalTitle = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8rem;

  color: ${color.white};
`;

const ModalDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.925rem;
  line-height: 1.1rem;

  color: ${color.grey["500"]};
`;

const ModalDescriptionBold = styled.span`
  color: ${color.grey["100"]};
`;

const SubTextsContainer = styled.div`
  padding: 1rem 1.75rem;

  background-color: ${color.grey["700"]};
`;

const SubTextList = styled.ul`
  margin: 0 0 1rem;
  padding: 0 0.75rem;
`;

const SubTextListItem = styled.li`
  font-weight: 400;
  font-size: 0.825rem;
  line-height: 1.5rem;

  color: ${color.grey["300"]};
`;

const WalletAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const WalletAccountLabel = styled.div`
  font-weight: 500;
  font-size: 0.925rem;
  line-height: 1.125rem;

  color: ${color.grey["200"]};
`;

const WalletAccountValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.725rem;
  background: ${color.grey["700"]};

  font-weight: 600;
  font-size: 0.925rem;
  line-height: 1.125rem;

  color: ${color.grey["100"]};
`;

const WalletAccountName = styled.div`
  max-width: 11rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClaimWithTwitterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1.875rem;

  background-color: ${color.grey["700"]};
  border: none;

  font-weight: 600;
  font-size: 1.25rem;
  line-height: 102.5%;
  letter-spacing: 0.07em;

  text-transform: uppercase;
  color: #03a9f4;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
