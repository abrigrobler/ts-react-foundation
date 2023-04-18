/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import theme from '../../../theme';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const TextField = ({
  onChange,
  overrideCss,
  placeholder,
  value,
  multiline,
  onFocus,
  onBlur,
  maxLength,
  ...standardProps
}: {
  onChange: (event: any) => void;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  maxLength?: number;
  overrideCss?: SerializedStyles;
} & StandardProps) =>
  multiline ? (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      data-test-id={standardProps.dataTestId}
      id={standardProps.id}
      css={css`
        padding: 12px;
        border: 2px solid ${theme.colors.borderGrey};
        color: #a8a8a8;
        border-radius: 5px;
        ${StandardCSS(standardProps)}
        ${overrideCss}
      `}
    />
  ) : (
    <input
      maxLength={maxLength}
      onFocus={(e) => onFocus && onFocus(e)}
      onBlur={(e) => onBlur && onBlur(e)}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      data-test-id={standardProps.dataTestId}
      id={standardProps.id}
      css={css`
        padding: 12px;
        border: 2px solid ${theme.colors.borderGrey};
        color: #a8a8a8;
        border-radius: 5px;
        ${StandardCSS(standardProps)}
        ${overrideCss}
      `}
    />
  );

export default TextField;
