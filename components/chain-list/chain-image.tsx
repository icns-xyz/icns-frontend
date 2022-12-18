import { useState } from "react";
import Image, { ImageProps } from "next/image";

import ICNSLogo from "../../public/images/icns-logo-120x120.png";
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
        onError={() => setSrcState(ICNSLogo)}
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
