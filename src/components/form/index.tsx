/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import FormContextProvider from '../../contexts/form';
import StandardCSS from '../../types/standard-css';
import StandardProps from '../../types/standard-props';

const Form = ({
  children,
  onSubmit,
  overrideCss,
  ...standardProps
}: {
  children: any;
  onSubmit: (formData: any) => void;
  overrideCss?: SerializedStyles;
} & StandardProps) => {
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      onSubmit(formJson);
    },
    [onSubmit],
  );

  return (
    <FormContextProvider>
      <form
        id={standardProps.id}
        onSubmit={handleSubmit}
        className={standardProps.className}
        data-test-id={standardProps.dataTestId}
        css={css`
          display: flex;
          flex-direction: column;
          ${StandardCSS(standardProps)}
          ${overrideCss}
        `}
      >
        {children}
      </form>
    </FormContextProvider>
  );
};

export default Form;
