import { Form, Button, Input } from 'semantic-ui-react';

interface FailureRecipientFormProps {
  failureRecipient: string;
  isFinalStep: boolean;
  submitRequestLoading: boolean;
  setFailureRecipient: (input: string) => void;
  handleNextStep?: () => void;
  handlePreviousStep?: () => void;
}

export const FailureRecipientForm = ({
  failureRecipient,
  setFailureRecipient,
  handleNextStep,
  handlePreviousStep,
  isFinalStep,
  submitRequestLoading
}: FailureRecipientFormProps) => {
  return (
    <>
      <Form onSubmit={handleNextStep}>
        <label>
          Failure recipient:
          <Input
            value={failureRecipient}
            onChange={(event) => setFailureRecipient(event.target.value)}
          />
        </label>
      </Form>
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

export default FailureRecipientForm;
