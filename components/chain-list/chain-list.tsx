import { FunctionComponent } from "react";
import { ChainItemType, WidthHeightProps } from "../../types";
import color from "../../styles/color";
import styled from "styled-components";
import { ChainItem } from "./chain-item";

interface Props {
  chainList: ChainItemType[];
  checkedItems: any;
  setCheckedItems: any;
}

export const ChainList: FunctionComponent<Props> = (props) => {
  const { chainList, checkedItems, setCheckedItems } = props;

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
    <ChainContainer color={color.grey["800"]}>
      {chainList.map((chainItem) => (
        <ChainItem
          key={chainItem.address}
          chainItem={chainItem}
          checkedItemHandler={checkedItemHandler}
        />
      ))}
    </ChainContainer>
  );
};

export const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 33rem;
  overflow: scroll;

  background-color: ${(props) => props.color};
`;

export const ChainItemContainer = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  padding: 1.5rem;

  cursor: pointer;

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
