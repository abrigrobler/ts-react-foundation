import { Button } from '../elements';
import { useFormContext } from '../../contexts/form';

const SubmitButton = ({
  label,
  dataTestId,
  onClick,
  disabled,
}: {
  label: string;
  dataTestId?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { isAllFieldsValid } = useFormContext();
  return (
    <Button
      width="100%"
      fontSize="18px"
      dataTestId={dataTestId || 'submit-button'}
      variant="cta"
      color="white"
      type="submit"
      disabled={!isAllFieldsValid || disabled}
      py="20px"
      mt="25px"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
export default SubmitButton;
