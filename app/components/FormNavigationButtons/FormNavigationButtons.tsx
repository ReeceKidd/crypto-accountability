import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface FormNavigationButtonsProps {
  handlePreviousStep: () => void;
  onSubmitLoading?: boolean;
}

const FormNavigationButtons = ({
  handlePreviousStep,
  onSubmitLoading
}: FormNavigationButtonsProps) => {
  return (
    <Box mt={2} flexDirection="row">
      <Button
        variant="contained"
        onClick={() => handlePreviousStep()}
        style={{ marginRight: 3 }}
      >
        <ChevronLeft />
      </Button>
      <LoadingButton
        variant="contained"
        loading={onSubmitLoading}
        type="submit"
      >
        <ChevronRight />
      </LoadingButton>
    </Box>
  );
};

export default FormNavigationButtons;
