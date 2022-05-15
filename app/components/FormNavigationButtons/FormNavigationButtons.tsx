import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface FormNavigationButtonsProps {
  handlePreviousStep: () => void;
  onSubmitLoading?: boolean;
}

const FormNavigationButtons = ({
  handlePreviousStep,
  onSubmitLoading
}: FormNavigationButtonsProps) => {
  return (
    <div style={{ flexDirection: 'row' }}>
      <Button onClick={() => handlePreviousStep()} style={{ width: '10%' }}>
        Left
      </Button>
      <LoadingButton
        loading={onSubmitLoading}
        type="submit"
        style={{ width: '10%' }}
      >
        Right
      </LoadingButton>
    </div>
  );
};

export default FormNavigationButtons;
