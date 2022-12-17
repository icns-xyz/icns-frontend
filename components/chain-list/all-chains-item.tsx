import { ChainItemType } from "../../types";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

import { ChainImage } from "./chain-image";
import { Flex1 } from "../../styles/flex-1";
import {
  ChainInfoContainer,
  ChainItemContainer,
  ChainName,
  WalletAddress,
} from "./chain-item";
import color from "../../styles/color";
import styled from "styled-components";
import { Checkbox } from "../checkbox";

interface Props {
  allChecked: boolean;
  setAllChecked: Dispatch<SetStateAction<boolean>>;
  chainItem: ChainItemType;
}

export const AllChainsItem: FunctionComponent<Props> = (props) => {
  const { allChecked, setAllChecked, chainItem } = props;

  const checkHandler = () => {
    setAllChecked(!allChecked);
  };

  return (
    <AllChainsContainer>
      <ChainItemContainer
        key={chainItem.prefix}
        isLoading={false}
        checked={allChecked}
        onClick={checkHandler}
      >
        <ChainImage
          src={chainItem.chainImageUrl}
          fill={true}
          alt={`${chainItem.prefix} chain image`}
        />
        <ChainInfoContainer>
          <ChainName>{`.${chainItem.prefix}`}</ChainName>
          <WalletAddress>{chainItem.address}</WalletAddress>
        </ChainInfoContainer>

        <Flex1 />

        <Checkbox checked={allChecked} />
      </ChainItemContainer>
    </AllChainsContainer>
  );
};

const AllChainsContainer = styled.div`
  width: 100%;

  background-color: ${color.grey["900"]};
`;
