import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;

    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }
`;
