import { ChainItemType, WidthHeightProps } from "../../types";
import { FunctionComponent, useEffect, useState } from "react";

import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import styled from "styled-components";
import { ChainImage } from "./chain-image";

interface Props {
  chainItem: ChainItemType;
  checkedItemHandler: (chainItem: ChainItemType, isChecked: boolean) => void;
  checkedItems: Set<unknown>;
  disabled?: boolean;
}

export const ChainItem: FunctionComponent<Props> = (props) => {
  const { chainItem, checkedItemHandler, checkedItems, disabled } = props;
  const [checked, setChecked] = useState(!!disabled);

  const checkHandler = () => {
    if (!disabled) {
      setChecked(!checked);
      checkedItemHandler(chainItem, !checked);
    }
  };

  useEffect(() => {
    if (!disabled) {
      setChecked(checkedItems.has(chainItem));
    }
  }, [checkedItems]);

  return (
    <ChainItemContainer
      key={chainItem.prefix}
      isLoading={false}
      disabled={disabled}
      checked={checked}
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

      <ChainCheckBox checked={checked} readOnly />
    </ChainItemContainer>
  );
};

export const ChainItemContainer = styled.div<{
  isLoading: boolean;
  checked?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  padding: 1.5rem;

  cursor: pointer;

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  background-color: ${(props) =>
    props.disabled
      ? color.black
      : props.checked
      ? color.grey["800"]
      : color.grey["900"]};

  &:hover {
    background: ${(props) => (props.isLoading ? null : color.grey["700"])};
  }
`;

export const ChainImageContainer = styled.div<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  position: relative;
`;

export const ChainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

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

  accent-color: ${color.orange["200"]};
`;
