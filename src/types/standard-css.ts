/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../theme';
import StandardProps from './standard-props';

// Here we build out our standard css stylesheet
const StandardCSS = (styles: StandardProps) => css`
  //MEDIA QUERIES
  ${styles.hideForMobile &&
  css`
    @media ${theme.mediaQueries.mobileOnly} {
      display: none;
    }
  `}
  ${styles.hideForTablet &&
  css`
    @media ${theme.mediaQueries.tabletOnly} {
      display: none;
    }
  `}
  ${styles.hideForDesktop &&
  css`
    @media ${theme.mediaQueries.desktopOnly} {
      display: none;
    }
  `}
${styles.hoverCss &&
  css`
    transition: all ${styles.hoverAnimationTime || 0.2}s ease-in-out;
    &:hover {
      ${styles.hoverCss}
    }
  `} 
  //SCROLLBAR

  ::-webkit-scrollbar {
    ${styles.hideScrollBar &&
    css`
      display: none;
    `}
  }
  //MARGINS
  margin: ${styles.m};
  margin-top: ${styles.mt ? styles.mt : styles.my};
  margin-right: ${styles.mr ? styles.mr : styles.mx};
  margin-bottom: ${styles.mb ? styles.mb : styles.my};
  margin-left: ${styles.ml ? styles.ml : styles.mx};

  //PADDING
  padding: ${styles.p};
  padding-top: ${styles.pt ? styles.pt : styles.py};
  padding-right: ${styles.pr ? styles.pr : styles.px};
  padding-bottom: ${styles.pb ? styles.pb : styles.py};
  padding-left: ${styles.pl ? styles.pl : styles.px};

  //BORDER RADIUS
  border-radius: ${styles.borderRadius};

  //FONTS
  font-size: ${styles.fontSize};
  font-family: Roboto;
  font-family: ${styles.fontFamily};
  font-weight: ${styles.fontWeight};
  text-decoration: ${styles.textDecoration};

  //LAYOUT
  flex-grow: ${styles.flexGrow};
  flex-shrink: ${styles.flexShrink};
  flex-basis: ${styles.flexBasis};
  flex: ${styles.flex};
  height: ${styles.height};
  width: ${styles.width};
  min-width: ${styles.minWidth};
  min-height: ${styles.minHeight};
  max-width: ${styles.maxWidth};
  max-height: ${styles.maxHeight};
  text-align: ${styles.textAlign};
  text-justify: ${styles.justifyText};

  //BACKGROUND
  background-color: ${styles.backgroundColor};
  opacity: ${styles.opacity};
  background: ${styles.background};

  //POSITION
  position: ${styles.position};
  bottom: ${styles.bottom};
  top: ${styles.top};
  left: ${styles.left};
  right: ${styles.right};
  z-index: ${styles.zIndex};

  //TRANSFORMATION AND TRANSITION
  transform: ${styles.transform};
  transition: ${styles.transition};

  //ALIGNMENT
  align-items: ${styles.alignItems};
  align-content: ${styles.alignContent};
  overflow: ${styles.overflow};
  overflow-x: ${styles.overflowX};
  overflow-y: ${styles.overflowY};

  //Border
  border-bottom: ${styles.borderB};
  border-top: ${styles.borderT};
  border: ${styles.border};

  //GRID
  grid-area: ${styles.gridArea};

  //shadow
  box-shadow: ${styles.boxShadow || 'initial'};

  color: ${styles.color ? styles.color : 'inherit'};
  disabled: ${styles.disabled};
  cursor: ${styles.cursor};
  @media ${theme.mediaQueries.tabletOnly} {
    ${styles.tabletCss}
  }
  @media ${theme.mediaQueries.mobileOnly} {
    ${styles.mobileCss}
  }

  @media ${theme.mediaQueries.desktopOnly} {
    ${styles.desktopCss}
  }
`;

export default StandardCSS;
