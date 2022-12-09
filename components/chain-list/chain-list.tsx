import { FunctionComponent } from "react";
import { AccountInfo, WidthHeightProps } from "../../types";
import color from "../../styles/color";
import styled from "styled-components";
import { ChainItem } from "./chain-item";

interface Props {
  chainList: AccountInfo[];
}

export const ChainList: FunctionComponent<Props> = (props) => {
  const { chainList } = props;
  return (
    <ChainContainer color={color.grey["800"]}>
      {chainList.map((chainInfo) => (
        <ChainItem key={chainInfo.prefix} chainInfo={chainInfo} />
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
