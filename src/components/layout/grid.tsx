/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const Grid = ({
  gridAreas,
  gridTemplateColumns,
  gridTemplateRows,
  gridColumnGap,
  gridRowGap,
  overrideCss,
  children,
  ...standardProps
}: {
  gridAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
  overrideCss?: SerializedStyles;
  children?: ReactNode;
} & StandardProps) => (
  <div
    css={css`
      -webkit-display: grid;
      display: grid;
      grid-template-areas: ${gridAreas};
      grid-template-columns: ${gridTemplateColumns};
      grid-template-rows: ${gridTemplateRows};
      grid-column-gap: ${gridColumnGap};
      grid-row-gap: ${gridRowGap};
      ${StandardCSS(standardProps)}
      ${overrideCss}
    `}
  >
    {children}
  </div>
);

export default Grid;
