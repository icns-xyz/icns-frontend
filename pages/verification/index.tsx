import * as amplitude from "@amplitude/analytics-browser";

// React
import { useEffect, useState } from "react";

// Types
import {
  ChainItemType,
  DisabledChainItemType,
  ErrorMessage,
  QueryError,
  RegisteredAddresses,
  TwitterProfileType,
} from "../../types";
import { checkTwitterAuthQueryParameter } from "../../utils/url";

// Styles
import styled from "styled-components";
import color from "../../styles/color";

// Components
import { Logo } from "../../components/logo";
import { SkeletonChainList } from "../../components/skeleton";

import { PrimaryButton } from "../../components/primary-button";
import { TwitterProfile } from "../../components/twitter-profile";
import { ChainList } from "../../components/chain-list";
import { useRouter } from "next/router";
import {
  getKeplrFromWindow,
  KeplrWallet,
  sendMsgs,
  simulateMsgs,
} from "../../wallets";
import { Bech32Address, ChainIdHelper } from "@keplr-wallet/cosmos";

import { AllChainsItem } from "../../components/chain-list/all-chains-item";
import { SearchInput } from "../../components/search-input";
import {
  MainChainId,
  REFERRAL_KEY,
  RESOLVER_ADDRESS,
  REST_URL,
} from "../../constants/icns";

import {
  fetchTwitterInfo,
  queryAddressesFromTwitterName,
  queryOwnerOfTwitterName,
  queryRegisteredTwitterId,
  verifyTwitterAccount,
} from "../../queries";
import {
  KEPLR_NOT_FOUND_ERROR,
  TWITTER_LOGIN_ERROR,
} from "../../constants/error-message";
import { makeClaimMessage, makeSetRecordMessage } from "../../messages";
import Axios from "axios";
import { BackButton } from "../../components/back-button";
import { FinalCheckModal } from "../../components/final-check-modal";
import { ErrorModal } from "../../components/error-modal";
import * as process from "process";

export default function VerificationPage(props: { blockList: string[] }) {
  const router = useRouter();
  const [twitterAuthInfo, setTwitterAuthInfo] = useState<TwitterProfileType>();

  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);

  const [wallet, setWallet] = useState<KeplrWallet>();
  const [walletKey, setWalletKey] = useState<{
    name: string;
    pubKey: Uint8Array;
    bech32Address: string;
    isLedgerNano?: boolean;
  }>();

  const [chainList, setChainList] = useState<
    (ChainItemType & {
      isEthermintLike?: boolean;
    })[]
  >([]);
  const [disabledChainList, setDisabledChainList] = useState<
    DisabledChainItemType[]
  >([]);
  const [registeredChainList, setRegisteredChainList] = useState<
    RegisteredAddresses[]
  >([]);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [searchValue, setSearchValue] = useState("");

  const [nftOwnerAddress, setNFTOwnerAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (wallet) {
      window.addEventListener("keplr_keystorechange", async () => {
        await init();
      });
    }
  }, [wallet]);

  useEffect(() => {
    const disabledChainList = chainList
      .filter((chain) => {
        if (!chain.address) {
          // Address can be "" if `getKey` failed.
          return true;
        }

        for (const registeredChain of registeredChainList) {
          if (
            chain.prefix === registeredChain.bech32_prefix &&
            chain.address === registeredChain.address
          ) {
            return true;
          }
        }

        return false;
      })
      .map<DisabledChainItemType>((chain) => {
        if (walletKey) {
          if (walletKey.isLedgerNano && chain.isEthermintLike) {
            return {
              ...chain,
              disabled: true,
              reason: new Error(
                "Support for Ethereum address on Ledger is coming soon.",
              ),
            };
          }
        }

        return {
          ...chain,
          disabled: true,
        };
      });

    const filteredChainList = chainList.filter((chain) => {
      return (
        disabledChainList.find(
          (disabled) => disabled.chainId === chain.chainId,
        ) == null
      );
    });

    setChainList(filteredChainList);
    setDisabledChainList(disabledChainList);

    setCheckedItems(new Set(filteredChainList));
  }, [registeredChainList]);

  useEffect(() => {
    setCheckedItems(new Set(chainList));
  }, [chainList]);

  const init = async () => {
    if (window.location.search) {
      try {
        const { state, code } = checkTwitterAuthQueryParameter(
          window.location.search,
        );

        // Initialize Wallet
        const keplrWallet = await initWallet();

        // Fetch Twitter Profile
        const twitterInfo = await fetchTwitterInfo(state, code);

        // contract check registered
        const registeredQueryResponse = await queryRegisteredTwitterId(
          twitterInfo.id,
        );

        setTwitterAuthInfo({
          ...twitterInfo,
          isRegistered: "data" in registeredQueryResponse,
        });

        if ("data" in registeredQueryResponse) {
          const ownerOfQueryResponse = await queryOwnerOfTwitterName(
            registeredQueryResponse.data.name,
          );

          if (keplrWallet) {
            const key = await keplrWallet.getKey(MainChainId);
            setIsOwner(ownerOfQueryResponse.data.owner === key.bech32Address);
            setNFTOwnerAddress(ownerOfQueryResponse.data.owner);
          }

          const addressesQueryResponse = await queryAddressesFromTwitterName(
            registeredQueryResponse.data.name,
          );

          setRegisteredChainList(addressesQueryResponse.data.addresses);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === TWITTER_LOGIN_ERROR) {
            setErrorMessage({ message: TWITTER_LOGIN_ERROR, path: "/" });
            setErrorModalOpen(true);
          }
        }

        console.error(error);
      } finally {
        setIsLoadingInit(false);
      }
    }
  };

  const initWallet = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr) {
      const keplrWallet = new KeplrWallet(keplr);
      const key = await keplrWallet.getKey(MainChainId);

      await fetchChainList(keplrWallet);
      setWallet(keplrWallet);
      setWalletKey(key);

      return keplrWallet;
    } else {
      setErrorMessage({ message: KEPLR_NOT_FOUND_ERROR, path: "/" });
      setErrorModalOpen(true);
    }
  };

  const fetchChainList = async (wallet: KeplrWallet) => {
    const chainIds = (await wallet.getChainInfosWithoutEndpoints()).map(
      (c) => c.chainId,
    );
    const chainKeys = await Promise.allSettled(
      chainIds.map((chainId) => wallet.getKey(chainId)),
    );

    const chainInfos = (await wallet.getChainInfosWithoutEndpoints()).map(
      (chainInfo) => {
        return {
          chainId: chainInfo.chainId,
          chainName: chainInfo.chainName,
          prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
          chainImageUrl: `https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/${
            ChainIdHelper.parse(chainInfo.chainId).identifier
          }/chain.png`,
          isEthermintLike: chainInfo.isEthermintLike,
        };
      },
    );

    const chainArray = [];
    for (let i = 0; i < chainKeys.length; i++) {
      if (props.blockList.includes(chainInfos[i].prefix)) {
        continue;
      }

      const chainKey = chainKeys[i];
      if (chainKey.status !== "fulfilled") {
        console.log("Failed to get key from wallet", chainKey);
      }
      chainArray.push({
        address:
          chainKey.status === "fulfilled" ? chainKey.value.bech32Address : "",
        ...chainInfos[i],
      });
    }

    // remove duplicated item
    const filteredChainList = chainArray.filter((nextChain, index, self) => {
      return (
        index ===
        self.findIndex((prevChain) => {
          const isDuplicated = prevChain.prefix === nextChain.prefix;

          if (isDuplicated && prevChain.chainName !== nextChain.chainName) {
            console.log(
              `${nextChain.chainName} has been deleted due to a duplicate name with ${prevChain.chainName}`,
            );
          }

          return isDuplicated;
        })
      );
    });

    setChainList(filteredChainList);
  };

  const checkAdr36 = async () => {
    if (twitterAuthInfo && wallet) {
      const key = await wallet.getKey(MainChainId);

      const chainIds = Array.from(checkedItems).map((chain) => {
        return (chain as ChainItemType).chainId;
      });

      return wallet.signICNSAdr36(
        MainChainId,
        RESOLVER_ADDRESS,
        key.bech32Address,
        twitterAuthInfo.username,
        chainIds,
      );
    }
  };

  const onClickRegistration = () => {
    amplitude.track("click register button");

    if (isOwner) {
      handleRegistration();
    } else {
      setModalOpen(true);
    }
  };

  const handleRegistration = async () => {
    try {
      setIsLoadingRegistration(true);

      const { state, code } = checkTwitterAuthQueryParameter(
        window.location.search,
      );
      const twitterInfo = await fetchTwitterInfo(state, code);

      const adr36Infos = await checkAdr36();

      if (wallet && walletKey && adr36Infos) {
        const icnsVerificationList = await verifyTwitterAccount(
          walletKey.bech32Address,
          twitterInfo.accessToken,
        );

        const registerMsg = makeClaimMessage(
          walletKey.bech32Address,
          twitterInfo.username,
          icnsVerificationList,
          localStorage.getItem(REFERRAL_KEY) ?? undefined,
        );

        const addressMsgs = adr36Infos.map((adr36Info) => {
          return makeSetRecordMessage(
            walletKey.bech32Address,
            twitterInfo.username,
            adr36Info,
          );
        });

        const aminoMsgs = twitterAuthInfo?.isRegistered
          ? []
          : [registerMsg.amino];
        const protoMsgs = twitterAuthInfo?.isRegistered
          ? []
          : [registerMsg.proto];

        for (const addressMsg of addressMsgs) {
          aminoMsgs.push(addressMsg.amino);
          protoMsgs.push(addressMsg.proto);
        }

        const chainInfo = {
          chainId: MainChainId,
          rest: REST_URL,
        };

        const simulated = await simulateMsgs(
          chainInfo,
          walletKey.bech32Address,
          {
            proto: protoMsgs,
          },
          {
            amount: [],
          },
        );

        const txHash = await sendMsgs(
          wallet,
          chainInfo,
          walletKey.bech32Address,
          {
            amino: aminoMsgs,
            proto: protoMsgs,
          },
          {
            amount: [],
            gas: Math.floor(simulated.gasUsed * 1.5).toString(),
          },
        );

        await router.push({
          pathname: "complete",
          query: {
            txHash: Buffer.from(txHash).toString("hex"),
            twitterUsername: twitterInfo.username,
          },
        });
      }
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        setErrorMessage({
          message: (error?.response?.data as QueryError).message,
        });
        setErrorModalOpen(true);
        return;
      }

      if (error instanceof Error) {
        console.log(error.message);
        setErrorMessage({ message: error.message });
        setErrorModalOpen(true);
      }
    } finally {
      setIsLoadingRegistration(false);
    }
  };

  const isRegisterButtonDisable = (() => {
    if (!isOwner && nftOwnerAddress) {
      return true;
    }

    const hasCheckedItem = checkedItems.size > 0;

    return !hasCheckedItem;
  })();

  return (
    <Container>
      <Logo />

      <MainContainer>
        {isLoadingInit ? (
          <SkeletonChainList />
        ) : (
          <ContentContainer>
            <BackButton />
            <TwitterProfile twitterProfileInformation={twitterAuthInfo} />
            <ChainListTitleContainer>
              <ChainListTitle>Chain List</ChainListTitle>
              <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </ChainListTitleContainer>
            {!searchValue ? (
              <AllChainsItem
                chainList={chainList}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            ) : null}
            <ChainList
              chainList={chainList.filter(
                (chain) =>
                  chain.chainId.includes(searchValue) ||
                  chain.address.includes(searchValue) ||
                  chain.prefix.includes(searchValue),
              )}
              disabledChainList={disabledChainList.filter(
                (chain) =>
                  chain.chainId.includes(searchValue) ||
                  chain.address.includes(searchValue) ||
                  chain.prefix.includes(searchValue),
              )}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />

            {!isOwner && nftOwnerAddress ? (
              <OwnerAlert>
                You are not owner of this name.
                <br />
                Please select the account (
                {Bech32Address.shortenAddress(nftOwnerAddress, 28)})
              </OwnerAlert>
            ) : null}

            {chainList.length > 0 && (
              <ButtonContainer disabled={isRegisterButtonDisable}>
                <PrimaryButton
                  disabled={isRegisterButtonDisable}
                  onClick={onClickRegistration}
                  isLoading={isLoadingRegistration}
                >
                  Register
                </PrimaryButton>
              </ButtonContainer>
            )}
          </ContentContainer>
        )}
      </MainContainer>

      <FinalCheckModal
        twitterUserName={twitterAuthInfo?.username}
        walletInfo={walletKey}
        isModalOpen={isModalOpen}
        onCloseModal={() => setModalOpen(false)}
        onClickRegisterButton={handleRegistration}
        isLoadingRegistration={isLoadingRegistration}
      />

      <ErrorModal
        isModalOpen={isErrorModalOpen}
        onCloseModal={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </Container>
  );
}

export async function getStaticProps() {
  let blockList: string[] = [];
  if (process.env.NEXT_PUBLIC_BLOCK_LIST) {
    blockList = process.env.NEXT_PUBLIC_BLOCK_LIST.trim().split(",");
  }

  return { props: { blockList } };
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 100vh;

  padding: 2.7rem 0;

  color: white;

  background-image: url("/images/svg/bg-asset-3.svg"),
    url("/images/svg/bg-asset-3.svg"), url("/images/svg/bg-asset-3.svg"),
    url("/images/svg/bg-asset-3.svg");
  background-size: 3.125rem 3.125rem;
  background-position: 296px 536px, 1256px 216px, 376px 776px, 1176px 856px;
  background-repeat: no-repeat;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;
`;

export const ButtonContainer = styled.div<{ disabled?: boolean }>`
  width: 11rem;
  height: 3.5rem;

  margin-top: 1.5rem;

  background-color: ${(props) =>
    props.disabled ? color.orange["300"] : color.orange["100"]};
`;

export const ChainListTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const ChainListTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.9rem;

  color: ${color.white};
`;

const OwnerAlert = styled.div`
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.1rem;
  text-align: center;

  color: ${color.grey["400"]};

  padding-top: 1.25rem;
`;
