// React
import { useEffect, useState } from "react";

// Types
import {
  ChainItemType,
  IcnsVerificationResponse,
  RegisteredAddresses,
  TwitterAuthInfoResponse,
  TwitterProfileType,
} from "../../types";
import { request } from "../../utils/url";

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
import { ContractFee } from "../../constants/wallet";
import {
  getKeplrFromWindow,
  KeplrWallet,
  makeCosmwasmExecMsg,
  sendMsgs,
  simulateMsgs,
} from "../../wallets";
import { ChainIdHelper } from "@keplr-wallet/cosmos";

import AllChainsIcon from "../../public/images/svg/all-chains-icon.svg";
import { AllChainsItem } from "../../components/chain-list/all-chains-item";
import { SearchInput } from "../../components/search-input";
import {
  MainChainId,
  REGISTRAR_ADDRESS,
  RESOLVER_ADDRESS,
  REST_URL,
} from "../../constants/icns";

import {
  fetchTwitterInfo,
  queryAddressesFromTwitterName,
  queryRegisteredTwitterId,
} from "../../repository";

export default function VerificationPage() {
  const router = useRouter();
  const [twitterAuthInfo, setTwitterAuthInfo] = useState<TwitterProfileType>();

  const [isLoading, setIsLoading] = useState(true);

  const [wallet, setWallet] = useState<KeplrWallet>();
  const [allChains, setAllChains] = useState<ChainItemType>();
  const [chainList, setChainList] = useState<ChainItemType[]>([]);
  const [registeredAddressList, setRegisteredAddressList] = useState<string[]>(
    [],
  );
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [allChecked, setAllChecked] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchUrlQueryParameter = (): { state: string; code: string } => {
    // Twitter state, auth code check
    const [, state, code] =
      window.location.search.match(
        /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
      ) || [];

    return {
      state,
      code,
    };
  };

  useEffect(() => {
    const init = async () => {
      if (window.location.search) {
        // Twitter Login Error Check
        if (window.location.search.match("error")) {
          await router.push("/");
          return;
        }

        const { state, code } = fetchUrlQueryParameter();

        try {
          // Initialize Wallet
          await initWallet();

          // Fetch Twitter Profile
          const twitterInfo = await fetchTwitterInfo(state, code);

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

            setRegisteredAddressList(
              addressesQueryResponse.data.addresses.map(
                (address) => address.address,
              ),
            );
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    init();
  }, []);

  const initWallet = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr) {
      const keplrWallet = new KeplrWallet(keplr);
      setWallet(keplrWallet);
    }
  };

  useEffect(() => {
    // After Wallet Initialize
    if (wallet) {
      fetchChainList();
    }
  }, [wallet]);

  useEffect(() => {
    const filteredChainList = chainList.filter((chain) => {
      return registeredAddressList.includes(chain.address);
    });

    setCheckedItems(new Set(filteredChainList));
  }, [registeredAddressList]);

  const fetchChainList = async () => {
    if (wallet) {
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

      setAllChains({
        chainId: "all chains",
        prefix: `all chains(${filteredChainList.length})`,
        address: chainInfos.map((chainInfo) => chainInfo.chainName).join(", "),
        chainImageUrl: AllChainsIcon,
      });

      setChainList(filteredChainList);
    }
  };

  const verifyTwitterAccount = async (accessToken: string) => {
    if (wallet) {
      const key = await wallet.getKey(MainChainId);

      return (
        await request<IcnsVerificationResponse>("/api/icns-verification", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            claimer: key.bech32Address,
            authToken: accessToken,
          }),
        })
      ).verificationList;
    }
  };

  const checkAdr36 = async () => {
    if (twitterAuthInfo && wallet) {
      const key = await wallet.getKey(MainChainId);

      const chainIds = Array.from(checkedItems).map((chain) => {
        return (chain as ChainItemType).chainId;
      });

      return await wallet.signICNSAdr36(
        MainChainId,
        RESOLVER_ADDRESS,
        key.bech32Address,
        twitterAuthInfo.username,
        chainIds,
      );
    }
  };

  const onClickRegistration = async () => {
    const { state, code } = fetchUrlQueryParameter();
    const twitterInfo = await fetchTwitterInfo(state, code);

    const adr36Infos = await checkAdr36();

    const icnsVerificationList = await verifyTwitterAccount(
      twitterInfo.accessToken,
    );

    if (wallet && icnsVerificationList && adr36Infos) {
      const key = await wallet.getKey(MainChainId);

      const registerMsg = makeCosmwasmExecMsg(
        key.bech32Address,
        REGISTRAR_ADDRESS,
        {
          claim: {
            name: twitterInfo.username,
            verifying_msg:
              icnsVerificationList[0].status === "fulfilled"
                ? icnsVerificationList[0].value.data.verifying_msg
                : "",
            verifications: icnsVerificationList.map((verification) => {
              if (verification.status === "fulfilled") {
                return {
                  public_key: verification.value.data.public_key,
                  signature: verification.value.data.signature,
                };
              }
            }),
          },
        },
        [ContractFee],
      );

      const addressMsgs = adr36Infos.map((adr36Info) => {
        return makeCosmwasmExecMsg(
          key.bech32Address,
          RESOLVER_ADDRESS,
          {
            set_record: {
              name: twitterInfo.username,
              bech32_prefix: adr36Info.bech32Prefix,
              adr36_info: {
                signer_bech32_address: adr36Info.bech32Address,
                address_hash: adr36Info.addressHash,
                pub_key: Buffer.from(adr36Info.pubKey).toString("base64"),
                signature: Buffer.from(adr36Info.signature).toString("base64"),
                signature_salt: adr36Info.signatureSalt.toString(),
              },
            },
          },
          [],
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

      console.log(aminoMsgs);

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

      router.push({
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
