import styled from "styled-components";
import color from "../../styles/color";

export const SecondaryButton = styled.button`
  width: 100%;
  height: 100%;

  border: none;

  padding: 11px 30px;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.025rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;

  color: ${color.grey["200"]};
  background-color: transparent;

  cursor: pointer;
`;
