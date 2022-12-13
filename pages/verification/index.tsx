// React
import { useEffect, useState } from "react";

// Types
import {
  ChainItemType,
  IcnsVerificationResponse,
  TwitterAuthInfoResponse,
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
import { MainChainId } from "../../constants/wallet";
import {
  getKeplrFromWindow,
  KeplrWallet,
  makeCosmwasmExecMsg,
  simulateMsgs,
} from "../../wallets";
import { ChainIdHelper } from "@keplr-wallet/cosmos";

import AllChainsIcon from "../../public/images/svg/all-chains-icon.svg";
import { AllChainsItem } from "../../components/chain-list/all-chains-item";
import { SearchInput } from "../../components/search-input";
import {
  REGISTRAR_ADDRESS,
  RESOLVER_ADDRESS,
  REST_URL,
} from "../../constants/icns";

export default function VerificationPage() {
  const router = useRouter();
  const [twitterAuthInfo, setTwitterAuthInfo] =
    useState<TwitterAuthInfoResponse | null>();

  const [isLoading, setIsLoading] = useState(true);

  const [wallet, setWallet] = useState<KeplrWallet>();
  const [allChains, setAllChains] = useState<ChainItemType>();
  const [chainList, setChainList] = useState<ChainItemType[]>([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [allChecked, setAllChecked] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleVerification = async () => {
      if (window.location.search) {
        if (window.location.search.match("error")) {
          await router.push("/");
          return;
        }

        const twitterInfo = await fetchTwitterInfo();
        setTwitterAuthInfo(twitterInfo);

        await initWallet();

        setIsLoading(false);
      }
    };

    handleVerification();
  }, []);

  const fetchTwitterInfo = async (): Promise<TwitterAuthInfoResponse> => {
    const [, state, code] =
      window.location.search.match(
        /^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/,
      ) || [];

    const newTwitterAuthInfo = await request<TwitterAuthInfoResponse>(
      `/api/twitter-auth-info?state=${state}&code=${code}`,
    );

    return newTwitterAuthInfo;
  };

  const initWallet = async () => {
    const keplr = await getKeplrFromWindow();

    if (keplr) {
      const keplrWallet = new KeplrWallet(keplr);
      setWallet(keplrWallet);
    }
  };

  useEffect(() => {
    if (wallet) {
      fetchAllChains();
      fetchChainList();
    }
  }, [wallet]);

  const fetchAllChains = async () => {
    if (wallet) {
      const chainNames = (await wallet.getChainInfosWithoutEndpoints()).map(
        (chainInfo) => chainInfo.chainName,
      );

      setAllChains({
        chainId: "all chains",
        prefix: `all chains(${chainNames.length})`,
        address: chainNames.join(", "),
        chainImageUrl: AllChainsIcon,
      });
    }
  };

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
            prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
            chainImageUrl: `https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/${
              ChainIdHelper.parse(chainInfo.chainId).identifier
            }/chain.png`,
          };
        },
      );

      const chainArray: ChainItemType[] = [];
      for (let i = 0; i < chainKeys.length; i++) {
        chainArray.push({
          address: chainKeys[i].bech32Address,
          ...chainInfos[i],
        });
      }

      // remove duplicated item
      const filteredChainList = chainArray.filter((chain, index, self) => {
        return index === self.findIndex((t) => chain.prefix === t.prefix);
      });

      setChainList(filteredChainList);
    }
  };

  const verifyTwitterAccount = async (accessToken: string) => {
    if (wallet) {
      const key = await wallet.getKey(MainChainId);

      const icnsVerificationList = (
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

      return icnsVerificationList;
    }
  };

  const checkAdr36 = async () => {
    if (twitterAuthInfo && wallet) {
      const key = await wallet.getKey(MainChainId);

      const chainIds = Array.from(checkedItems).map(
        (chain) => (chain as ChainItemType).chainId,
      );

      const adr36Infos = await wallet.signICNSAdr36(
        MainChainId,
        RESOLVER_ADDRESS,
        key.bech32Address,
        twitterAuthInfo.username,
        chainIds,
      );

      return adr36Infos;
    }
  };

  const onClickRegistration = async () => {
    const adr36Infos = await checkAdr36();

    const twitterInfo = await fetchTwitterInfo();

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
        [
          {
            denom: "uosmo",
            amount: "500000",
          },
        ],
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

      const aminoMsgs = [registerMsg.amino];
      const protoMsgs = [registerMsg.proto];
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

      console.log("simulated", simulated);
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
