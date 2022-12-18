import { ButtonHTMLAttributes, FunctionComponent } from "react";
import styled from "styled-components";
import color from "../../styles/color";

export const PrimaryButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <StyledPrimaryButton {...props}>
      <span>{children}</span>
    </StyledPrimaryButton>
  );
};

const StyledPrimaryButton = styled.button`
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
