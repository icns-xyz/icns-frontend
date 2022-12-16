import { createGlobalStyle } from "styled-components";
import color from "./color";

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;

    font-family: 'Inter', sans-serif;
    font-size: 16px;

    background-color: ${({ theme }) => theme.bgColor ?? color.black};

    background-size: 5rem 5rem;
    background-position: top left;
    background-repeat: repeat;
    background-image: linear-gradient(
            ${({ theme }) => theme.bgGridColor ?? color.grey[600]} 0.1rem,
            transparent 0.1rem
    ),
    linear-gradient(90deg, ${({ theme }) =>
      theme.bgGridColor ?? color.grey[600]} 0.1rem, transparent 0.1rem);
  }
  }

  * {
    box-sizing: border-box;
  }
`;
