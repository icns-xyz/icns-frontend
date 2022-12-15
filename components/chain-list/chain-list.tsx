import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";
import { ChainItemType } from "../../types";
import color from "../../styles/color";
import styled from "styled-components";
import { ChainItem } from "./chain-item";

interface Props {
  allChecked: boolean;
  setAllChecked: Dispatch<SetStateAction<boolean>>;
  chainList: ChainItemType[];
  disabledChainList: ChainItemType[];
  checkedItems: Set<unknown>;
  setCheckedItems: Dispatch<SetStateAction<Set<unknown>>>;
}

export const ChainList: FunctionComponent<Props> = (props) => {
  const {
    allChecked,
    setAllChecked,
    chainList,
    disabledChainList,
    checkedItems,
    setCheckedItems,
  } = props;

  const checkedItemHandler = (chainItem: ChainItemType, isChecked: boolean) => {
    const tempSet = new Set(checkedItems);

    if (isChecked) {
      tempSet.add(chainItem);
    } else if (!isChecked && checkedItems.has(chainItem)) {
      tempSet.delete(chainItem);
    }

    setCheckedItems(tempSet);
  };

  useEffect(() => {
    if (allChecked) {
      setCheckedItems(new Set(chainList));
    } else if (chainList.length === checkedItems.size) {
      setCheckedItems(new Set());
    }
  }, [allChecked]);

  useEffect(() => {
    if (chainList.length === checkedItems.size && checkedItems.size !== 0) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkedItems]);

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
          disabled={true}
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
