/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const Image = ({
  source,
  alt,
  objectFit,
  overrideCss,
  ...standardProps
}: {
  source: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
  overrideCss?: SerializedStyles;
} & StandardProps) => (
  <img
    data-test-id={standardProps.dataTestId}
    src={source}
    alt={alt}
    className={standardProps.className}
    css={css`
      ${StandardCSS(standardProps)}
      object-fit: ${objectFit};
      ${overrideCss}
    `}
  />
);

export default Image;
