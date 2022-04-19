import { Input } from 'semantic-ui-react';
import FormStep from '../../../FormStep/FormStep';

interface FailureRecipientFormProps {
  failureRecipient: string;
  isFinalStep: boolean;
  submitRequestLoading: boolean;
  setFailureRecipient: (input: string) => void;
  handlePreviousStep?: () => void;
}

export const FailureRecipientStep = ({
  failureRecipient,
  setFailureRecipient,
  handlePreviousStep,
  isFinalStep,
  submitRequestLoading
}: FailureRecipientFormProps) => {
  return (
    <FormStep
      label="Failure recipient"
      input={
        <Input
          value={failureRecipient}
          fluid
          onChange={(event) => setFailureRecipient(event.target.value)}
        />
      }
      handlePreviousStep={handlePreviousStep}
      isFinalStep={isFinalStep}
      submitRequestLoading={submitRequestLoading}
    />
  );
};

export default FailureRecipientStep;
