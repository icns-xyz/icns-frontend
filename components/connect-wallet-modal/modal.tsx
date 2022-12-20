import { FunctionComponent, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import color from "../../styles/color";
import { WalletList, WalletType } from "../../constants/wallet";
import { WalletItem } from "./wallet-item";
import { ErrorMessage } from "../../types";
import { ErrorModal } from "../error-modal";
import { BeforeYouStartModal } from "../before-you-start-modal";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  currentReferal?: string;
}

export const ConnectWalletModal: FunctionComponent<Props> = (props) => {
  const { isModalOpen, onCloseModal, currentReferal } = props;
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [isBeforeYouStartModalOpen, setBeforeYouStartModalOpen] =
    useState(false);
  const [selectedWalletItem, setSelectedWalletItem] = useState<WalletType>();
  const [walletKeyName, setWalletKeyName] = useState("");

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

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
        <ModalTitle>Connect Wallet</ModalTitle>
        <ModalDescription>
          Make sure you have selected the correct account to link to your ICNS
          name.
        </ModalDescription>

        {WalletList.map((walletItem) => {
          return (
            <WalletItem
              wallet={walletItem}
              key={walletItem.name}
              setErrorModalOpen={setErrorModalOpen}
              setErrorMessage={setErrorMessage}
              setBeforeYouStartModalOpen={setBeforeYouStartModalOpen}
              setWalletKeyName={setWalletKeyName}
              setSelectedWalletItem={setSelectedWalletItem}
            />
          );
        })}
      </ModalContainer>

      <BeforeYouStartModal
        isModalOpen={isBeforeYouStartModalOpen}
        onCloseModal={() => setBeforeYouStartModalOpen(false)}
        currentReferal={currentReferal}
        walletKeyName={walletKeyName}
        selectedWalletItem={selectedWalletItem}
      />
      <ErrorModal
        isModalOpen={isErrorModalOpen}
        onCloseModal={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
        isWarning={true}
      />
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2.2rem;

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
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.1rem;

  color: ${color.grey["400"]};
`;
