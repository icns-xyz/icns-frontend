import { FunctionComponent } from "react";
import color from "../../styles/color";
import styled from "styled-components";

export const Checkbox: FunctionComponent<{ checked: boolean }> = ({
  checked,
}) => {
  return (
    <ChainCheckBoxContainer>
      <ChainCheckBoxHidden checked={checked} readOnly={true} />
      <ChainCheckBoxStyled checked={checked}>
        <Center>
          <Icon width="18" height="14" viewBox="0 0 15 12">
            <path
              strokeLinecap="square"
              strokeWidth="2"
              d="M2.25 4.426l4.083 5.011 6.417-7.874"
            />
          </Icon>
        </Center>
      </ChainCheckBoxStyled>
    </ChainCheckBoxContainer>
  );
};

const Center = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${color.orange["50"]};
`;

const ChainCheckBoxContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`;

const ChainCheckBoxStyled = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: ${(props) => (props.checked ? "none" : "2px solid #868686")};
  background: ${(props) =>
    props.checked ? color.orange["200"] : color.grey["400"]};

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const ChainCheckBoxHidden = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
