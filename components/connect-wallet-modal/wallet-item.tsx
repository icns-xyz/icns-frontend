import { FunctionComponent, useEffect, useState } from "react";
import ArrowRightIcon from "../../public/images/svg/arrow-right.svg";
import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import styled from "styled-components";
import Image from "next/image";
import {
  MINIMUM_VERSION,
  SELECTED_WALLET_KEY,
  WALLET_INSTALL_URL,
  WalletType,
} from "../../constants/wallet";
import { getKeplrFromWindow, KeplrWallet } from "../../wallets";
import { loginWithTwitter } from "../../queries";
import {
  KEPLR_NOT_FOUND_ERROR,
  KEPLR_VERSION_ERROR,
} from "../../constants/error-message";
import semver from "semver/preload";

interface Props {
  wallet: WalletType;
}

export const WalletItem: FunctionComponent<Props> = (props: Props) => {
  const { wallet } = props;
  const [isInstalled, setIsInstalled] = useState<boolean>();

  useEffect(() => {
    setIsInstalled(!!window.keplr);
  }, []);

  const onClickWalletItem = async () => {
    try {
      if (wallet.name === "Keplr") {
        await connectKeplr();
        localStorage.setItem(SELECTED_WALLET_KEY, wallet.name);
      }

      await loginWithTwitter();
    } catch (e) {
      console.log(e);
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
    }
  };

  return (
    <WalletContainer isReady={wallet.isReady} onClick={onClickWalletItem}>
      <WalletIcon>
        <Image
          src={wallet.image}
          fill={true}
          sizes="3.75rem"
          alt="wallet Icon"
        />
      </WalletIcon>
      <WalletContentContainer>
        <WalletName>{wallet.name}</WalletName>
        {wallet.isReady ? (
          isInstalled ? null : (
            <WalletDescription>Go to install Keplr Extension</WalletDescription>
          )
        ) : (
          <WalletDescription>Comming soon</WalletDescription>
        )}
      </WalletContentContainer>

      <Flex1 />

      <Image src={ArrowRightIcon} alt="arrow right icon" />
    </WalletContainer>
  );
};

const WalletContainer = styled.div<{ isReady: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 5.8rem;
  padding: 1rem;

  background-color: ${color.grey["600"]};
  opacity: ${(props) => (props.isReady ? 1 : 0.3)};

  cursor: ${(props) => (props.isReady ? "pointer" : "default")};
`;

const WalletIcon = styled.div`
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