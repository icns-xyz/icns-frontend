import styled from "styled-components";
import color from "../../styles/color";

export const PrimaryButton = styled.button`
  width: 100%;
  height: 100%;

  border: none;

  background-color: ${color.primary};
  padding: 11px 30px;

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 20px;

  color: ${color.orange};
`;
