import { ChainItemType } from "../../types";
import { ChangeEvent, FunctionComponent, useState } from "react";
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
}

export const ChainItem: FunctionComponent<Props> = (props) => {
  const { chainItem, checkedItemHandler } = props;
  const [checked, setChecked] = useState(false);

  const checkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    checkedItemHandler(chainItem, event.target.checked);
  };
  return (
    <ChainItemContainer key={chainItem.prefix} isLoading={false}>
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

      <ChainCheckBox
        checked={checked}
        onChange={(event) => checkHandler(event)}
      />
    </ChainItemContainer>
  );
};

const ChainName = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["100"]};
`;

const WalletAddress = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;

  color: ${color.grey["400"]};
`;

const ChainCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 1.5rem;
  height: 1.5rem;
`;
