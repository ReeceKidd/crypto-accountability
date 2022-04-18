import { Button, Grid, Segment } from 'semantic-ui-react';

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
    <Grid style={{ height: '100vh' }}>
      <Grid.Column>
        <Segment>
          <p>{label}</p>
          {input}
          <br />
          <br />
          {handlePreviousStep && (
            <Button fluid primary onClick={() => handlePreviousStep()}>
              Previous
            </Button>
          )}
          <br />
          {handleNextStep && (
            <Button fluid primary onClick={() => handleNextStep()}>
              Next
            </Button>
          )}
          <br />
          {isFinalStep && (
            <Button fluid primary loading={submitRequestLoading} type="submit">
              Submit
            </Button>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default FormStep;
