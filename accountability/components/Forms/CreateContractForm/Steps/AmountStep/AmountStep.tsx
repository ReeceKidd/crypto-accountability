import { Input } from 'semantic-ui-react';
import FormStep from '../../../FormStep/FormStep';

interface AmountStepProps {
  amount: string;
  isFinalStep: boolean;
  setAmount: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const AmountStep = ({
  amount,
  isFinalStep,
  setAmount,
  handleNextStep,
  handlePreviousStep
}: AmountStepProps) => {
  return (
    <FormStep
      label="Amount"
      input={
        <Input
          label="eth"
          fluid
          labelPosition="right"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      }
      isFinalStep={isFinalStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />
  );
};

export default AmountStep;
