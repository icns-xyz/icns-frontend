import { StaticImageData } from "next/image";

import KeplrIcon from "../public/images/svg/keplr-icon.svg";
import CosmostationIcon from "../public/images/svg/cosmostation-icon.svg";

export const SELECTED_WALLET_KEY = "SELECTED_WALLET_KEY";
export const MainChainId = "osmo-test-4";

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
