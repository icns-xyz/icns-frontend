import styled from "styled-components";

export const PageBackground = styled.div`
    background-color: ${({ theme }) => theme.bgColor};

    background-size: 5rem 5rem;
    background-position: top left;
    background-repeat: repeat;
    background-image: linear-gradient(
            ${({ theme }) => theme.bgGridColor} 0.1rem,
            transparent 0.1rem
    ),
    linear-gradient(90deg, ${({ theme }) =>
      theme.bgGridColor} 0.1rem, transparent 0.1rem);
  }
`;
