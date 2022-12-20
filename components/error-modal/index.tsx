import color from "../../styles/color";
import { FunctionComponent } from "react";
import ReactModal from "react-modal";
import { ErrorMessage } from "../../types";
import styled from "styled-components";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  errorMessage?: ErrorMessage;
  isWarning?: boolean;
}

import ErrorIcon from "../../public/images/svg/error-icon.svg";
import WarningIcon from "../../public/images/svg/warning-icon.svg";
import ArrowLeftIcon from "../../public/images/svg/arrow-left.svg";
import { useRouter } from "next/router";

export const ErrorModal: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const { isModalOpen, onCloseModal, errorMessage, isWarning } = props;

  const onClose = async () => {
    if (errorMessage?.path) {
      await router.push(errorMessage.path);
    }

    onCloseModal();
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onClose}
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
        <ErrorTitleContainer>
          <ErrorImageContainer>
            {isWarning ? <WarningIcon /> : <ErrorIcon />}
          </ErrorImageContainer>
          Error
        </ErrorTitleContainer>

        <ErrorDescription>{errorMessage?.message}</ErrorDescription>

        {errorMessage?.path ? (
          <ErrorBackButton onClick={onClose}>
            <ErrorBackIconContainer>
              <ArrowLeftIcon />
            </ErrorBackIconContainer>
            GO BACK TO HOME
          </ErrorBackButton>
        ) : null}
      </ModalContainer>
    </ReactModal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 32rem;

  padding: 2.5rem 2.25rem;
`;

const ErrorTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  align-items: center;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.5rem;

  color: ${color.white};
`;

const ErrorImageContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  position: relative;
`;

const ErrorDescription = styled.div`
  margin-top: 1rem;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;

  color: ${color.grey["300"]};
`;

const ErrorBackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;

  margin-top: 2.5rem;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.125rem;

  color: ${color.grey["100"]};

  cursor: pointer;
`;

const ErrorBackIconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  position: relative;
`;
