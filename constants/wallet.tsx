import { SVGProps } from "react";
import CosmostationIcon from "../public/images/svg/cosmostation-icon.svg";
import KeplrIcon from "../public/images/svg/keplr-icon.svg";

export const WALLET_INSTALL_URL =
  "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap";
export const SELECTED_WALLET_KEY = "SELECTED_WALLET_KEY";

export const MINIMUM_VERSION = "0.11.22";
export const MINIMUM_OSMO_FEE = process.env.MINIMUM_OSMO_FEE ?? "0.5 OSMO";

export type WalletName = "Keplr" | "Cosmostation";
export interface WalletType {
  name: WalletName;
  isReady: boolean;
  IconComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const WalletList: WalletType[] = [
  {
    name: "Keplr",
    isReady: true,
    IconComponent: KeplrIcon,
  },
  {
    name: "Cosmostation",
    isReady: false,
    IconComponent: CosmostationIcon,
  },
];

export const ContractFee = {
  denom: "uosmo",
  amount: "500000",
};
