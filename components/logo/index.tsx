// NextJs
import Image from "next/image";

// Image Assets
import LogoIcon from "../../public/images/svg/logo.svg";

// Styles
import { LogoContainer } from "./styled";
import { FunctionComponent } from "react";

export const Logo: FunctionComponent = () => {
  return (
    <LogoContainer>
      <Image src={LogoIcon} fill={true} alt="Home Logo" />
    </LogoContainer>
  );
};
