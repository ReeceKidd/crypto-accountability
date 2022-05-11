import { Button, Grid } from '@mui/material';

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
    <Grid style={{ height: '25vh' }}>
      <Grid.Row>
        <Grid.Column>
          <p>{label}</p>
          {input}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        {handlePreviousStep && (
          <Grid.Column>
            <Button fluid primary onClick={() => handlePreviousStep()}>
              Previous
            </Button>
          </Grid.Column>
        )}
        <br />
        {handleNextStep && (
          <Grid.Column>
            <Button fluid primary onClick={() => handleNextStep()}>
              Next
            </Button>
          </Grid.Column>
        )}
        <br />
        {isFinalStep && (
          <Grid.Column>
            <Button fluid primary loading={submitRequestLoading} type="submit">
              Submit
            </Button>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default FormStep;
