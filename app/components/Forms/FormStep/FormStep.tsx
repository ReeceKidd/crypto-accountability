import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface FormStepProps {
  isFinalStep: boolean;
  submitRequestLoading?: boolean;
  handleNextStep?: () => void;
  handlePreviousStep?: () => void;
}

export const FormStep = ({
  isFinalStep,
  submitRequestLoading,
  handleNextStep,
  handlePreviousStep
}: FormStepProps) => {
  return (
    <>
      {handlePreviousStep && (
        <Button onClick={() => handlePreviousStep()}>Previous</Button>
      )}
      <br />
      {handleNextStep && <Button onClick={() => handleNextStep()}>Next</Button>}
      <br />
      {isFinalStep && (
        <LoadingButton loading={submitRequestLoading} type="submit">
          Submit
        </LoadingButton>
      )}
    </>
  );
};

export default FormStep;
