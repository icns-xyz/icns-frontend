import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";
import { ChainItemType, DisabledChainItemType } from "../../types";
import color from "../../styles/color";
import styled from "styled-components";
import { ChainItem } from "./chain-item";

interface Props {
  chainList: ChainItemType[];
  disabledChainList: DisabledChainItemType[];
  checkedItems: Set<unknown>;
  setCheckedItems: Dispatch<SetStateAction<Set<unknown>>>;
}

export const ChainList: FunctionComponent<Props> = (props) => {
  const { chainList, disabledChainList, checkedItems, setCheckedItems } = props;

  const checkedItemHandler = (chainItem: ChainItemType, isChecked: boolean) => {
    const tempSet = new Set(checkedItems);

    if (isChecked) {
      tempSet.add(chainItem);
    } else if (!isChecked && checkedItems.has(chainItem)) {
      tempSet.delete(chainItem);
    }

    setCheckedItems(tempSet);
  };

  return (
    <ChainContainer color={color.grey["900"]}>
      {chainList.map((chainItem) => (
        <ChainItem
          key={chainItem.address}
          chainItem={chainItem}
          checkedItemHandler={checkedItemHandler}
          checkedItems={checkedItems}
        />
      ))}
      {disabledChainList.map((chainItem) => (
        <ChainItem
          key={chainItem.address}
          chainItem={chainItem}
          checkedItemHandler={checkedItemHandler}
          checkedItems={checkedItems}
        />
      ))}
    </ChainContainer>
  );
};

export const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //max-height: 33rem;
  overflow: scroll;

  flex: 1;

  background-color: ${(props) => props.color};
`;
