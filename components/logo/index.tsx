// NextJs
import Image from "next/image";
import Link from "next/link";

// Image Assets
import LogoIcon from "../../public/images/svg/logo.svg";

// Styles
import styled from "styled-components";
import { FunctionComponent } from "react";

export const Logo: FunctionComponent = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <Image
          src={LogoIcon}
          fill={true}
          sizes="10rem"
          alt="Home Logo"
          priority
        />
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
`;
