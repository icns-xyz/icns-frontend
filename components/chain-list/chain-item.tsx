import { ChainItemType } from "../../types";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ChainImageContainer,
  ChainInfoContainer,
  ChainItemContainer,
} from "./chain-list";

import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import styled from "styled-components";
import { ChainImage } from "./chain-image";

interface Props {
  chainItem: ChainItemType;
  checkedItemHandler: (chainItem: ChainItemType, isChecked: boolean) => void;
  checkedItems: Set<unknown>;
}

export const ChainItem: FunctionComponent<Props> = (props) => {
  const { chainItem, checkedItemHandler, checkedItems } = props;
  const [checked, setChecked] = useState(false);

  const checkHandler = () => {
    setChecked(!checked);
    checkedItemHandler(chainItem, !checked);
  };

  useEffect(() => {
    setChecked(checkedItems.has(chainItem));
  }, [checkedItems]);

  return (
    <ChainItemContainer
      key={chainItem.prefix}
      isLoading={false}
      onClick={checkHandler}
    >
      <ChainImageContainer width="3rem" height="3rem">
        <ChainImage
          src={chainItem.chainImageUrl}
          fill={true}
          alt={`${chainItem.prefix} chain image`}
        />
      </ChainImageContainer>
      <ChainInfoContainer>
        <ChainName>{`.${chainItem.prefix}`}</ChainName>
        <WalletAddress>{chainItem.address}</WalletAddress>
      </ChainInfoContainer>

      <Flex1 />

      <ChainCheckBox checked={checked} />
    </ChainItemContainer>
  );
};

export const ChainName = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.white};
`;

export const WalletAddress = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  max-height: 2rem;
  max-width: 27rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${color.grey["400"]};
`;

export const ChainCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 1.5rem;
  height: 1.5rem;
`;
