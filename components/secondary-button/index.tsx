import styled from "styled-components";
import color from "../../styles/color";

export const SecondaryButton = styled.button`
  width: 100%;
  height: 100%;

  border: none;

  padding: 11px 30px;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.25rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;

  color: ${color.white};
  background-color: ${color.grey["300"]};

  cursor: pointer;
`;