import { StaticImageData } from "next/image";

import KeplrIcon from "../public/images/svg/keplr-icon.svg";
import CosmostationIcon from "../public/images/svg/cosmostation-icon.svg";

export interface WalletType {
  name: string;
  image: StaticImageData;
  isReady: boolean;
}

export const WalletList: WalletType[] = [
  {
    name: "Keplr",
    image: KeplrIcon,
    isReady: true,
  },
  {
    name: "Cosmostation",
    image: CosmostationIcon,
    isReady: false,
  },
];
