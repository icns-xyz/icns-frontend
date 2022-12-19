// NextJs
import Link from "next/link";

// Image Assets
import LogoIcon from "../../public/images/svg/logo.svg";

// Styles
import { FunctionComponent } from "react";
import styled from "styled-components";

export const Logo: FunctionComponent = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
    </Link>
  );
};

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 10rem;
  height: 5rem;

  margin-top: 5rem;
  margin-left: 5rem;

  @media screen and (max-width: 1280px) {
    display: none;
  }
`;
