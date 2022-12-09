import { AccountInfo } from "../../types";
import { FunctionComponent } from "react";
import {
  ChainImageContainer,
  ChainInfoContainer,
  ChainItemContainer,
} from "./chain-list";

import Image from "next/image";
import color from "../../styles/color";
import styled from "styled-components";

interface Props {
  chainInfo: AccountInfo;
}

export const ChainItem: FunctionComponent<Props> = (props) => {
  const { chainInfo } = props;
  return (
    <ChainItemContainer key={chainInfo.prefix} isLoading={false}>
      <ChainImageContainer width="3rem" height="3rem">
        <Image
          src={chainInfo.chainImageUrl}
          fill={true}
          alt={`${chainInfo.prefix} chain image`}
        />
      </ChainImageContainer>
      <ChainInfoContainer>
        <ChainName>{`.${chainInfo.prefix}`}</ChainName>
        <WalletAddress>{chainInfo.address}</WalletAddress>
      </ChainInfoContainer>

      <Flex1 />

      <ChainCheckBox />
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

const Flex1 = styled.div`
  flex: 1;
`;

const ChainCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 1.5rem;
  height: 1.5rem;
`;
