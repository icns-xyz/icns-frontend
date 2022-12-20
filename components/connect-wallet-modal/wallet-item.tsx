import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ArrowRightIcon from "../../public/images/svg/arrow-right.svg";
import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import styled from "styled-components";
import {
  MINIMUM_VERSION,
  SELECTED_WALLET_KEY,
  WALLET_INSTALL_URL,
  WalletType,
} from "../../constants/wallet";
import { getKeplrFromWindow, KeplrWallet } from "../../wallets";
import {
  KEPLR_NO_ACCOUNT_ERROR,
  KEPLR_NO_ACCOUNT_MESSAGE,
  KEPLR_NOT_FOUND_ERROR,
  KEPLR_VERSION_ERROR,
} from "../../constants/error-message";
import semver from "semver/preload";
import { ErrorMessage } from "../../types";

interface Props {
  wallet: WalletType;
  setErrorMessage: Dispatch<SetStateAction<ErrorMessage | undefined>>;
  setErrorModalOpen: Dispatch<SetStateAction<boolean>>;
  setBeforeYouStartModalOpen: Dispatch<SetStateAction<boolean>>;
  setWalletKeyName: Dispatch<SetStateAction<string>>;
  setSelectedWalletItem: Dispatch<SetStateAction<WalletType | undefined>>;
}

export const WalletItem: FunctionComponent<Props> = (props: Props) => {
  const {
    wallet,
    setErrorModalOpen,
    setErrorMessage,
    setBeforeYouStartModalOpen,
    setWalletKeyName,
    setSelectedWalletItem,
  } = props;
  const [isInstalled, setIsInstalled] = useState<boolean>();

  useEffect(() => {
    setIsInstalled(!!window.keplr);
  }, []);

  const onClickWalletItem = async () => {
    setSelectedWalletItem(wallet);
    try {
      if (wallet.name === "Keplr") {
        await connectKeplr();
        localStorage.setItem(SELECTED_WALLET_KEY, wallet.name);
      }

      setBeforeYouStartModalOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);

        if (error.message === KEPLR_NO_ACCOUNT_ERROR) {
          setErrorMessage({ message: KEPLR_NO_ACCOUNT_MESSAGE });
          setErrorModalOpen(true);
          return;
        }

        setErrorMessage({ message: error.message });
        setErrorModalOpen(true);
      }
    }
  };

  const connectKeplr = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr === undefined) {
      window.location.href = WALLET_INSTALL_URL;
      throw new Error(KEPLR_NOT_FOUND_ERROR);
    }

    if (semver.lt(keplr.version, MINIMUM_VERSION)) {
      throw new Error(KEPLR_VERSION_ERROR);
    }

    if (keplr) {
      const wallet = new KeplrWallet(keplr);

      const chainIds = (await wallet.getChainInfosWithoutEndpoints()).map(
        (c) => c.chainId,
      );

      await wallet.init(chainIds);
      const walletKey = await wallet.getKey(chainIds[0]);
      setWalletKeyName(walletKey.name);
    }
  };

  return (
    <WalleButton disabled={!wallet.isReady} onClick={onClickWalletItem}>
      <WalletIconContainer>
        <wallet.IconComponent width="60" height="60" />
      </WalletIconContainer>
      <WalletContentContainer>
        <WalletName>{wallet.name}</WalletName>
        {wallet.isReady ? (
          isInstalled ? null : (
            <WalletDescription>Go to install Keplr Extension</WalletDescription>
          )
        ) : (
          <WalletDescription>Coming soon</WalletDescription>
        )}
      </WalletContentContainer>

      <Flex1 />

      <ArrowRightIcon />
    </WalleButton>
  );
};

const WalleButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: none;

  height: 5.8rem;
  padding: 1rem;

  background-color: ${color.grey["600"]};

  &:hover:not(:disabled) {
    background-color: ${color.grey["700"]};
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const WalletIconContainer = styled.div`
  position: relative;

  width: 3.75rem;
  height: 3.75rem;
`;

const WalletContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-left: 1rem;
`;

const WalletName = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.5rem;
  text-align: center;

  color: ${color.white};
`;

const WalletDescription = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1.1rem;

  color: ${color.grey["300"]};
`;
