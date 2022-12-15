// React
import { useEffect, useState } from "react";

// Types
import {
  ChainItemType,
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
import { ChainIdHelper } from "@keplr-wallet/cosmos";

import AllChainsIcon from "../../public/images/svg/all-chains-icon.svg";
import { AllChainsItem } from "../../components/chain-list/all-chains-item";
import { SearchInput } from "../../components/search-input";
import { MainChainId, RESOLVER_ADDRESS, REST_URL } from "../../constants/icns";

import {
  fetchTwitterInfo,
  queryAddressesFromTwitterName,
  queryRegisteredTwitterId,
  verifyTwitterAccount,
} from "../../queries";
import { ErrorHandler } from "../../utils/error";
import {
  KEPLR_NOT_FOUND_ERROR,
  TWITTER_LOGIN_ERROR,
} from "../../constants/error-message";
import { makeClaimMessage, makeSetRecordMessage } from "../../messages";

export default function VerificationPage() {
  const router = useRouter();
  const [twitterAuthInfo, setTwitterAuthInfo] = useState<TwitterProfileType>();

  const [isLoading, setIsLoading] = useState(true);

  const [wallet, setWallet] = useState<KeplrWallet>();

  const [chainList, setChainList] = useState<ChainItemType[]>([]);
  const [disabledChainList, setDisabledChainList] = useState<ChainItemType[]>(
    [],
  );
  const [registeredChainList, setRegisteredChainList] = useState<
    RegisteredAddresses[]
  >([]);

  const [allChains, setAllChains] = useState<ChainItemType>();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.location.search) {
        try {
          const { state, code } = checkTwitterAuthQueryParameter(
            window.location.search,
          );

          // Initialize Wallet
          await initWallet();

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
            const addressesQueryResponse = await queryAddressesFromTwitterName(
              registeredQueryResponse.data.name,
            );

            setRegisteredChainList(addressesQueryResponse.data.addresses);
          }
        } catch (error) {
          if (error instanceof Error && error.message === TWITTER_LOGIN_ERROR) {
            await router.push("/");
          }

          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    const disabledChainList = chainList.filter((chain) => {
      for (const registeredChain of registeredChainList) {
        if (
          chain.prefix === registeredChain.bech32_prefix &&
          chain.address === registeredChain.address
        ) {
          return true;
        }
      }

      return false;
    });

    const filteredChainList = chainList.filter(
      (chain) => !disabledChainList.includes(chain),
    );

    setAllChains({
      chainId: "all chains",
      chainName: "all chains",
      prefix: `all chains(${filteredChainList.length})`,
      address: filteredChainList.map((chain) => chain.chainName).join(", "),
      chainImageUrl: AllChainsIcon,
    });

    setChainList(filteredChainList);
    setDisabledChainList(disabledChainList);
  }, [registeredChainList]);

  const initWallet = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr) {
      const keplrWallet = new KeplrWallet(keplr);

      await fetchChainList(keplrWallet);
      setWallet(keplrWallet);
    } else {
      ErrorHandler(KEPLR_NOT_FOUND_ERROR);
    }
  };

  const fetchChainList = async (wallet: KeplrWallet) => {
    const chainIds = (await wallet.getChainInfosWithoutEndpoints()).map(
      (c) => c.chainId,
    );
    const chainKeys = await Promise.all(
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
        };
      },
    );

    const chainArray = [];
    for (let i = 0; i < chainKeys.length; i++) {
      chainArray.push({
        address: chainKeys[i].bech32Address,
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

  const onClickRegistration = async () => {
    const { state, code } = checkTwitterAuthQueryParameter(
      window.location.search,
    );
    const twitterInfo = await fetchTwitterInfo(state, code);

    const adr36Infos = await checkAdr36();

    if (wallet && adr36Infos) {
      const key = await wallet.getKey(MainChainId);

      const icnsVerificationList = await verifyTwitterAccount(
        key.bech32Address,
        twitterInfo.accessToken,
      );

      const registerMsg = makeClaimMessage(
        key.bech32Address,
        twitterInfo.username,
        icnsVerificationList,
      );

      const addressMsgs = adr36Infos.map((adr36Info) => {
        return makeSetRecordMessage(
          key.bech32Address,
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
        key.bech32Address,
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
        key.bech32Address,
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
        query: { txHash: Buffer.from(txHash).toString("hex") },
      });
    }
  };

  return (
    <Container>
      <Logo />

      <MainContainer>
        {isLoading ? (
          <SkeletonChainList />
        ) : (
          <ContentContainer>
            <TwitterProfile twitterProfileInformation={twitterAuthInfo} />

            <ChainListTitleContainer>
              <ChainListTitle>Chain List</ChainListTitle>
              <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </ChainListTitleContainer>

            {allChains && !searchValue ? (
              <AllChainsItem
                allChecked={allChecked}
                setAllChecked={setAllChecked}
                chainItem={allChains}
              />
            ) : null}

            <ChainList
              allChecked={allChecked}
              setAllChecked={setAllChecked}
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

            <ButtonContainer>
              <PrimaryButton
                disabled={checkedItems.size < 1}
                onClick={onClickRegistration}
              >
                Register
              </PrimaryButton>
            </ButtonContainer>
          </ContentContainer>
        )}
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;

  margin-top: 5rem;
`;

export const ButtonContainer = styled.div`
  width: 12rem;
  height: 4rem;

  margin-top: 2rem;
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
