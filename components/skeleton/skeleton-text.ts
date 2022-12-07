// Styles
import styled from "styled-components";

// Components
import { SkeletonAnimation } from "./skeleton-animation";

// Types
import { WidthHeightProps } from "../../types";

export const SkeletonText = styled(SkeletonAnimation)<WidthHeightProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
