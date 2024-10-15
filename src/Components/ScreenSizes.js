// constants/mediaQueries.js

import { useMediaQuery } from "react-responsive";

export const GetScreenSizes = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });
  const isMediumScreen = useMediaQuery({ minWidth: 601, maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ minWidth: 1025 });

  return { isSmallScreen, isMediumScreen, isLargeScreen };
};
