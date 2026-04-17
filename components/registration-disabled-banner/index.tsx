import { FunctionComponent } from "react";
import styled from "styled-components";
import color from "../../styles/color";

export const RegistrationDisabledBanner: FunctionComponent = () => {
  return (
    <BannerContainer>
      <BannerText>
        ICNS registration is closed. Names you already own are unaffected.
      </BannerText>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 0.75rem 1rem;

  background-color: ${color.orange["100"]};
`;

const BannerText = styled.span`
  font-family: "Inter", serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 0.02em;

  color: ${color.white};
  text-align: center;
`;
