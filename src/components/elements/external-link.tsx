/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const ExternalLink = ({
  href,
  target,
  overrideCss,
  id,
  children,
  ...standardProps
}: {
  href: string;
  target?: string;
  overrideCss?: SerializedStyles;
  children?: ReactNode;
} & StandardProps) => (
  <a
    href={href}
    target={target}
    id={id}
    css={css`
      text-decoration: none;
      ${StandardCSS(standardProps)}
      ${overrideCss}
    `}
  >
    {children}
  </a>
);

export default ExternalLink;
