import { Button } from 'semantic-ui-react';

interface FormStepProps {
  label: string;
  input: JSX.Element;
  isFinalStep: boolean;
  submitRequestLoading?: boolean;
  handleNextStep?: () => void;
  handlePreviousStep?: () => void;
}

export const FormStep = ({
  label,
  input,
  isFinalStep,
  submitRequestLoading,
  handleNextStep,
  handlePreviousStep
}: FormStepProps) => {
  return (
    <>
      <p>{label}</p>
      {input}
      <br />
      {handlePreviousStep && (
        <Button primary onClick={() => handlePreviousStep()}>
          Previous
        </Button>
      )}
      {handleNextStep && (
        <Button primary onClick={() => handleNextStep()}>
          Next
        </Button>
      )}
      {isFinalStep && (
        <Button primary loading={submitRequestLoading} type="submit">
          Submit
        </Button>
      )}
    </>
  );
};

export default FormStep;
