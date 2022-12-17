import styled from "styled-components";
import color from "../../styles/color";

export const SkeletonAnimation = styled.div`
  opacity: 0.35 !important;
  background-image: linear-gradient(
      0.25turn,
      transparent,
      ${color.grey["400"]},
      transparent
    ),
    linear-gradient(${color.grey["600"]}, ${color.grey["600"]}),
    radial-gradient(
      38px circle at 19px 19px,
      ${color.grey["600"]} 50%,
      transparent 51%
    ),
    linear-gradient(${color.grey["600"]}, ${color.grey["600"]});
  background-repeat: no-repeat;
  background-size: 315px 250px, 315px 180px, 100px 100px, 225px 30px;
  background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
  animation: loading 2s infinite;

  @keyframes loading {
    to {
      background-position: 315px 0, 0 0, 0 190px, 50px 195px;
    }
  }
`;
