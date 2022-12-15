import { useState } from "react";
import Image, { ImageProps } from "next/image";

import KeplrIcon from "../../public/images/svg/keplr-icon.svg";

export const ChainImage = (props: ImageProps) => {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      sizes="3rem"
      onError={() => setSrc(KeplrIcon)}
    />
  );
};
