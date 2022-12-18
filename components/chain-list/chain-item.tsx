import { ChainItemType, DisabledChainItemType } from "../../types";
import { FunctionComponent, useEffect, useState } from "react";

import color from "../../styles/color";
import { Flex1 } from "../../styles/flex-1";
import styled from "styled-components";
import { ChainImage } from "./chain-image";
import { Checkbox } from "../checkbox";

interface Props {
  chainItem: ChainItemType | DisabledChainItemType;
  checkedItemHandler: (chainItem: ChainItemType, isChecked: boolean) => void;
  checkedItems: Set<unknown>;
}

export const ChainItem: FunctionComponent<Props> = (props) => {
  const { chainItem, checkedItemHandler, checkedItems } = props;
  const disabled = "disabled" in chainItem && chainItem.disabled;
  // XXX: Currently, this component can't handle `checked` state well,
  //      If chain is disabled, it should be disabled in general.
  //      However, if it is disabled due to the limitation of ethermint and ledger,
  //      it should be not checked.
  //      To solve this problem, for now, just use dumb way.
  //      If chain is disabled with explicit reason, it should be unchecked.
  const [checked, setChecked] = useState(!!disabled && !chainItem.reason);

  useEffect(() => {
    if (disabled) {
      if (chainItem.reason) {
        setChecked(false);
      } else {
        setChecked(true);
      }
    }
  }, [chainItem, disabled]);

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
      <ChainImage
        src={chainItem.chainImageUrl}
        fill={true}
        alt={`${chainItem.prefix} chain image`}
      />
      <ChainInfoContainer>
        <ChainName>{`.${chainItem.prefix}`}</ChainName>
        {chainItem.address ? (
          <WalletAddress>{chainItem.address}</WalletAddress>
        ) : null}
        {disabled && chainItem.reason ? (
          <DisabledReason>{chainItem.reason.message}</DisabledReason>
        ) : null}
      </ChainInfoContainer>

      <Flex1 />

      <Checkbox checked={checked} />
    </ChainItemContainer>
  );
};

export const ChainItemContainer = styled.div<{
  isLoading: boolean;
  checked?: boolean;
  disabled?: boolean;
  isSkeleton?: boolean;
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
      : props.isSkeleton
      ? color.grey["800"]
      : color.grey["900"]};

  &:hover {
    background: ${(props) => (props.isLoading ? null : color.grey["700"])};
  }
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

export const DisabledReason = styled.div`
  color: ${color.grey["200"]};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;
