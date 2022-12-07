// Styles
import color from "../../styles/color";
import styled from "styled-components";

// Components
import { SkeletonAnimation } from "./skeleton-animation";

// Types
import { WidthHeightProps } from "../../types";

export const SkeletonCircle = styled(SkeletonAnimation)<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: ${color.grey["500"]};
  border-radius: 50%;
`;
