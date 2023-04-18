import { Button } from '../elements';
import { useFormContext } from '../../contexts/form';
import theme from '../../../theme';

const SaveAndContinueButton = ({
  label,
  dataTestId,
  onClick,
  disabled,
  partOfForm = true,
}: {
  label?: string;
  dataTestId?: string;
  onClick: () => void;
  disabled?: boolean;
  partOfForm?: boolean;
}) => {
  const { isAllFieldsValid } = useFormContext();
  return (
    <Button
      onClick={onClick}
      width="100%"
      type="submit"
      fontSize="18px"
      dataTestId={dataTestId || 'save-and-continue-button'}
      variant="outlined"
      color={disabled ? theme.colors.lightGrey : theme.colors.primary}
      disabled={(partOfForm && !isAllFieldsValid) || disabled}
      py="25px"
      mt="25px"
    >
      {label || 'Save and continue later'}
    </Button>
  );
};
export default SaveAndContinueButton;
