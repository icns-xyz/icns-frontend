import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;

    font-family: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;
