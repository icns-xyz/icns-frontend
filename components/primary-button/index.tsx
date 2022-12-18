import { ButtonHTMLAttributes, FunctionComponent } from "react";
import styled, { keyframes } from "styled-components";
import color from "../../styles/color";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <StyledPrimaryButton {...props}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <span>{children}</span>
      )}
    </StyledPrimaryButton>
  );
};

const StyledPrimaryButton = styled.button`
  display: flex;
  align-items center;
  justify-content: center;
  width: 100%;
  height: 100%;

  border: none;

  padding: 11px 30px;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.25rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;

  background-color: ${color.orange["100"]};

  cursor: pointer;

  &:hover {
    transition-duration: 0.5s;
    background-color: ${color.orange["200"]};

    span {
      opacity: 0.5;
    }
  }

  &:disabled {
    background-color: ${color.orange["300"]};

    span {
      opacity: 0.5;
    }
  }

  span {
    transition-duration: 0.5s;
    color: ${color.orange["50"]};
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  position: relative;

  width: 20px;
  height: 20px;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ animationDelay?: string }>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  ${({ animationDelay }) =>
    animationDelay ? `animation-delay: ${animationDelay};` : ""}

  border-radius: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: white transparent transparent transparent;
`;
