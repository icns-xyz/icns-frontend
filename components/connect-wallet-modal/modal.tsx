import { FunctionComponent } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import color from "../../styles/color";
import { WalletList } from "../../constants/wallet";
import { WalletItem } from "./wallet-item";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const ConnectWalletModal: FunctionComponent<Props> = (props) => {
  const { isModalOpen, onCloseModal } = props;

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      ariaHideApp={false}
      style={{
        overlay: { background: "#181818b3" },
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
          Plz check which account is selected after you connect it
        </ModalDescription>

        {WalletList.map((walletItem) => {
          return <WalletItem wallet={walletItem} key={walletItem.name} />;
        })}
      </ModalContainer>
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2.2rem;
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
  font-size: 0.8rem;
  line-height: 1.1rem;

  color: ${color.grey["400"]};
`;
