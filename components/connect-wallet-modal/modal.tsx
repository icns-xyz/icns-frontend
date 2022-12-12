import ReactModal from "react-modal";
import { FunctionComponent } from "react";
import styled from "styled-components";
import color from "../../styles/color";

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

        {/*<ChainConnectItem>*/}
        {/*  <ChainConnectIcon>*/}
        {/*    <Image src={KeplrIcon} fill={true} alt="Keplr Icon" />*/}
        {/*  </ChainConnectIcon>*/}
        {/*  <ChainConnectContentContainer>*/}
        {/*    <ChainConnectContentTitle>Keplr</ChainConnectContentTitle>*/}
        {/*  </ChainConnectContentContainer>*/}

        {/*  <Flex1 />*/}

        {/*  <Image src={ArrowRightIcon} alt="arrow right icon" />*/}
        {/*</ChainConnectItem>*/}

        {/*<ChainConnectItem>*/}
        {/*  <ChainConnectIcon>*/}
        {/*    <Image src={CosmostationIcon} fill={true} alt="Cosmostation Icon" />*/}
        {/*  </ChainConnectIcon>*/}

        {/*  <ChainConnectContentContainer>*/}
        {/*    <ChainConnectContentTitle>Cosmostation</ChainConnectContentTitle>*/}

        {/*    <ChainConnectContentDescription>*/}
        {/*      Coming soon*/}
        {/*    </ChainConnectContentDescription>*/}
        {/*  </ChainConnectContentContainer>*/}
        {/*  <Flex1 />*/}

        {/*  <Image src={ArrowRightIcon} alt="arrow right icon" />*/}
        {/*</ChainConnectItem>*/}
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
