import { FormError } from '../components/form/types';
import { createContext, useContext, useEffect, useState } from 'react';

type FormContextType = {
  errors: FormError[];
  isAllFieldsValid: boolean;
  addError: (error: FormError) => void;
  removeError: (error: FormError) => void;
};

const FormContext = createContext<FormContextType>({
  errors: [],
  isAllFieldsValid: false,
  addError: () => null,
  removeError: () => null,
});

const FormContextProvider = ({ children }: { children: any }) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [isAllFieldsValid, setIsAllFieldsValid] = useState<boolean>(false);

  const addError = (error: FormError) => {
    if (!errors.find((e) => e.field === error.field)) setErrors([...errors, error]);
  };

  const removeError = (error: FormError) => {
    setErrors(errors.filter((e) => e.field !== error.field));
  };

  useEffect(() => {
    setIsAllFieldsValid(errors.length === 0);
  }, [errors]);

  const data = {
    errors,
    isAllFieldsValid,
    addError,
    removeError,
  };

  return <FormContext.Provider value={data}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
export default FormContextProvider;
