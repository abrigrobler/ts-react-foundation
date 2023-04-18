/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import theme from '../../../theme';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const Button = ({
  onClick,
  children,
  id,
  overrideCss,
  disabled,
  variant = 'none',
  type = 'button',
  ...standardProps
}: {
  onClick?: () => void;
  children?: ReactNode | string;
  disabled?: boolean;
  variant?: 'filled' | 'cta' | 'outlined' | 'none';
  type?: 'button' | 'submit' | 'reset';
  overrideCss?: SerializedStyles;
} & StandardProps) => (
  <button
    data-test-id={standardProps.dataTestId}
    type={type}
    id={id}
    disabled={disabled}
    onClick={disabled ? undefined : onClick}
    onMouseEnter={() => standardProps.onHover && standardProps.onHover(true)}
    onMouseLeave={() => standardProps.onHover && standardProps.onHover(false)}
    css={css`
      border: none;
      background-color: ${disabled ? theme.colors.backgroundGrey : 'white'};
      background: none;
      margin: 0;
      padding: 0;
      ${variant === 'filled' &&
      css`
        background-color: ${disabled ? theme.colors.backgroundGrey : theme.colors.primary};
        border-radius: ${theme.borderRadius.small};
        padding: 10px;
        color: white !important;
      `}
      ${variant === 'cta' &&
      css`
        background-color: ${disabled ? theme.colors.backgroundGrey : theme.colors.primary};
        border-radius: ${theme.borderRadius.small};
        padding: 15px;
        color: white !important;
        font-size: 16px;
        font-weight: bold;
      `}
      ${variant === 'outlined' &&
      css`
        color: ${disabled ? theme.colors.backgroundGrey : theme.colors.primary} !important;
        border-color: ${disabled ? theme.colors.backgroundGrey : theme.colors.primary};
        border-width: 1px;
        border-style: solid;
        border-radius: ${theme.borderRadius.small};
        padding: 10px;
      `}
      ${StandardCSS(standardProps)}
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      ${disabled &&
      css`
        cursor: not-allowed;
      `}
      ${overrideCss}
    `}
  >
    {children}
  </button>
);

export default Button;
