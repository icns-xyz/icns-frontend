import { FunctionComponent } from "react";
import styled from "styled-components";
import color from "../../styles/color";

import ArrowLeftIcon from "../../public/images/svg/arrow-left.svg";

export const BackButton: FunctionComponent = () => {
  return (
    <Container
      onClick={() => {
        location.href = "/";
      }}
    >
      <ContentContainer>
        <ArrowLeftIcon />
        <div>BACK</div>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  padding: 0.7rem 0.5rem;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 0.8rem;

  color: ${color.grey["400"]};

  cursor: pointer;

  &:hover {
    color: ${color.grey["500"]};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.25rem;
`;
