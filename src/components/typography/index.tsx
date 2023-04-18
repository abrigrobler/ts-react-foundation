/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

export const Text = ({
  children,
  wordWrap,
  overrideCss,
  ...standardProps
}: {
  children?: any;
  wordWrap?: 'normal' | 'break-word' | 'initial' | 'inherit';
  overrideCss?: SerializedStyles;
} & StandardProps) => (
  <p
    data-test-id={standardProps.dataTestId}
    css={css`
      font-family: 'Roboto';
      word-wrap: ${wordWrap};
      margin: 0;
      padding: 0;
      ${StandardCSS(standardProps)}
      ${overrideCss}
    `}
  >
    {children}
  </p>
);
