import { SerializedStyles } from '@emotion/react';

interface StandardProps {
  ref?: any;

  hideForMobile?: boolean;
  hideForTablet?: boolean;
  hideForDesktop?: boolean;

  mobileCss?: SerializedStyles;
  tabletCss?: SerializedStyles;
  desktopCss?: SerializedStyles;
  hoverCss?: SerializedStyles;
  hoverAnimationTime?: number;
  hideScrollBar?: boolean;

  alignContent?: 'center' | 'flex-start' | 'flex-end' | 'space-evenly' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'space-evenly' | 'space-between'; // default is stretch
  color?: string;
  background?: string;
  backgroundColor?: string;
  borderRadius?: string | number;
  boxShadow?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  mt?: string | number;
  mb?: string | number;
  mr?: string | number;
  ml?: string | number;
  my?: string | number;
  mx?: string | number;
  m?: string | number;
  pt?: string | number;
  pb?: string | number;
  pr?: string | number;
  pl?: string | number;
  py?: string | number;
  px?: string | number;
  p?: string | number;
  flexBasis?: string | number;
  flexGrow?: string | number;
  flexShrink?: string | number;
  flex?: string | number;

  textAlign?: string;
  justifyText?: 'center' | 'flex-start' | 'flex-end';
  textTransformation?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: any;
  textDecoration?: string;
  lineHeight?: string | number;
  gridArea?: string;

  position?: 'absolute' | 'relative' | 'fixed';
  bottom?: string | number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: string | number;

  transform?: string;
  transition?: string;

  key?: any;
  id?: string;

  overflow?: 'hidden' | 'initial' | 'visible' | 'scroll' | 'inherit' | 'unset';
  overflowY?: 'hidden' | 'initial' | 'visible' | 'scroll' | 'inherit' | 'unset';
  overflowX?: 'hidden' | 'initial' | 'visible' | 'scroll' | 'inherit' | 'unset';
  disabled?: boolean;

  border?: string;
  borderB?: string;
  borderT?: string;

  opacity?: string;

  cursor?: 'pointer' | 'default' | 'none' | 'progress' | 'text' | 'not-allowed' | 'auto';

  onHover?: (active: boolean) => void;
  className?: string;
  dataTestId?: string;
}

export default StandardProps;
