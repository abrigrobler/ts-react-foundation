/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import theme from '../../../theme';
import { Text } from '../typography';
import { useFormContext } from '../../contexts/form';
import { Flex } from '../layout';
import { Image } from '../elements';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';
import { FormError } from './types';

export function InputField({
  name,
  defaultValue,
  label,
  placeholder,
  overrideCss,
  required,
  disabled,
  value,
  pattern,
  type = 'text',
  validate,
  alwaysShowLabel,
  instructions,
  onChange,
  ...standardProps
}: {
  name: string;
  value?: string;
  defaultValue?: string;
  pattern?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'mobileNumber';
  validate?: (e: any) => FormError;
  instructions?: string;
  alwaysShowLabel?: boolean;
  overrideCss?: SerializedStyles;
} & StandardProps) {
  const [valid, setValid] = useState({
    field: name,
    valid: true,
    message: '',
  });
  const { addError, removeError } = useFormContext();
  const [showLabel, setShowLabel] = useState(false);
  return (
    <Flex position="relative" flexDirection="column">
      <label
        data-test-id={`input-label-${name}`}
        css={css`
          font-size: 14px;
          position: absolute;
          top: -9px;
          left: 10px;
          background-color: white;
          padding: 0 10px;
          color: ${theme.colors.lightGrey};
          ${!showLabel &&
          !alwaysShowLabel &&
          css`
            display: none;
          `}
        `}
      >
        {label}
      </label>
      <input
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (e.target.value.includes('+27') && type === 'mobileNumber') {
            e.target.value = e.target.value.replace('+27', '0');
          }
          onChange && onChange(e);
          if (e.target.value !== '') {
            setShowLabel(true);
          } else {
            setShowLabel(false);
          }
          if (validate) {
            const validation = validate(e);
            setValid(validation);
            if (validation.valid) {
              removeError(validation);
            } else {
              addError(validation);
            }
          }
        }}
        type={type}
        pattern={pattern}
        required={required}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        id={standardProps.id}
        className={standardProps.className || 'input-field'}
        data-test-id={standardProps.dataTestId || 'input-field'}
        css={css`
          padding: 15px 16px;
          font-size: 16px;
          ${!valid.valid &&
          css`
            border: 2px solid red;
          `}
          border: 1px solid ${theme.colors.lightGrey};
          color: #a8a8a8;
          background-color: transparent !important;
          border-radius: 5px;
          ${disabled &&
          css`
            border: 1px solid ${theme.colors.lightGrey};
            color: #a8a8a8;
            background-color: ${theme.colors.backgroundGrey};
          `}
          ${StandardCSS(standardProps)}
          ${overrideCss}
        `}
      />
      {instructions && valid.valid && (
        <Text
          fontSize="14px"
          opacity="0.6"
          color={theme.colors.lightGrey}
          mt="4px"
          dataTestId={`instruction-text-${name}`}
        >
          {instructions}
        </Text>
      )}
      {!valid.valid ? (
        <Text opacity="0.6" color="red" mt="1px" dataTestId={`error-text-${name}`}>
          {valid.message}
        </Text>
      ) : (
        <>
          {showLabel && (
            <Image
              dataTestId={`image-valid-${name}`}
              source="forms/green-tick.svg"
              alt="valid"
              position="absolute"
              top="8%"
              right="16px"
              width="35px"
            />
          )}
        </>
      )}
    </Flex>
  );
}

export const Checkbox = ({
  name,
  label,
  overrideCss,
  disabled,
  required,
  onChange,
  checked,
  defaultChecked,
  ...standardProps
}: {
  name: string;

  label: any;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  overrideCss?: SerializedStyles;
  checked?: boolean;
  defaultChecked?: boolean;
} & StandardProps) => (
  <Flex>
    <input
      checked={checked}
      defaultChecked={defaultChecked}
      type="checkbox"
      required={required}
      onChange={onChange}
      name={name}
      disabled={disabled}
      id={standardProps.id}
      className={standardProps.className || 'input-checkbox'}
      data-test-id={standardProps.dataTestId || 'input-checkbox'}
      css={css`
        &:hover {
          cursor: pointer;
        }
        padding: 12px;
        margin-right: 10px;
        accent-color: ${theme.colors.primary};
        transform: scale(1.3);
        height: 20px;
        border: 2px solid ${theme.colors.borderGrey};
        color: #a8a8a8;
        border-radius: 5px;
        ${StandardCSS(standardProps)}
        ${overrideCss}
      `}
    />
    <label
      css={css`
        margin-top: 1px;
        font-size: 16px;
      `}
    >
      {label}
    </label>
  </Flex>
);
