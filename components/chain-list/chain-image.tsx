import { useState } from "react";
import Image, { ImageProps } from "next/image";

import KeplrIcon from "../../public/images/svg/keplr-icon.svg";
import styled from "styled-components";

export const ChainImage = ({ src, ...props }: ImageProps) => {
  const [srcState, setSrcState] = useState(src);

  return (
    <ImageWrapper>
      <Image
        {...props}
        src={srcState}
        alt="chain image"
        sizes="3rem"
        onError={() => setSrcState(KeplrIcon)}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;

  img {
    border-radius: 50%;
  }
`;
