import { StaticImageData } from "next/image";

import KeplrIcon from "../public/images/svg/keplr-icon.svg";
import CosmostationIcon from "../public/images/svg/cosmostation-icon.svg";

export const WALLET_INSTALL_URL =
  "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap";
export const SELECTED_WALLET_KEY = "SELECTED_WALLET_KEY";

export const MINIMUM_VERSION = "0.11.22";

export type WalletName = "Keplr" | "Cosmostation";
export interface WalletType {
  name: WalletName;
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

export const ContractFee = {
  denom: "uosmo",
  amount: "500000",
};
