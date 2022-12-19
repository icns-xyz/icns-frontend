import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ChainItemType } from "../../types";

import styled from "styled-components";
import AllChainsIcon from "../../public/images/svg/all-chains-icon.svg";
import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import { Checkbox } from "../checkbox";
import {
  ChainInfoContainer,
  ChainItemContainer,
  ChainName,
  WalletAddress,
} from "./chain-item";

interface Props {
  chainList: ChainItemType[];
  checkedItems: Set<unknown>;
  setCheckedItems: Dispatch<SetStateAction<Set<unknown>>>;
}

export const AllChainsItem: FunctionComponent<Props> = (props) => {
  const { chainList, checkedItems, setCheckedItems } = props;

  const [checked, setChecked] = useState(false);

  const checkHandler = () => {
    if (checked) {
      setCheckedItems(new Set());
    } else if (chainList.length !== checkedItems.size) {
      setCheckedItems(new Set(chainList));
    }
  };

  useEffect(() => {
    if (chainList.length === checkedItems.size && checkedItems.size !== 0) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checkedItems]);

  return (
    <AllChainsContainer>
      <ChainItemContainer
        key="all chains"
        isLoading={false}
        checked={checked}
        onClick={checkHandler}
      >
        <AllChainsIcon />
        <ChainInfoContainer>
          <ChainName>{`All chains(${chainList.length})`}</ChainName>
          <WalletAddress>
            {chainList.map((chain) => chain.chainName).join(", ")}
          </WalletAddress>
        </ChainInfoContainer>

        <Flex1 />

        <Checkbox checked={checked} />
      </ChainItemContainer>
    </AllChainsContainer>
  );
};

const AllChainsContainer = styled.div`
  width: 100%;

  background-color: ${color.grey["900"]};
`;
