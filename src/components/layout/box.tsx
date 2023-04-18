/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const Box = ({
  overrideCss,
  children,
  ...standardProps
}: {
  overrideCss?: SerializedStyles;
  children?: ReactNode;
} & StandardProps) => (
  <div
    id={standardProps.id}
    data-test-id={standardProps.dataTestId}
    css={css`
      ${StandardCSS(standardProps)}
      ${overrideCss}
    `}
  >
    {children}
  </div>
);

export default Box;
