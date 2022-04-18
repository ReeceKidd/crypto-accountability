import { Button, Input } from 'semantic-ui-react';

interface AmountFormProps {
  amount: string;
  setAmount: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const AmountForm = ({
  amount,
  setAmount,
  handleNextStep,
  handlePreviousStep
}: AmountFormProps) => {
  return (
    <>
      <label>
        Amount:
        <Input
          label="eth"
          labelPosition="right"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <br />
      <Button primary onClick={() => handlePreviousStep()}>
        Previous
      </Button>
      <Button primary onClick={() => handleNextStep()}>
        Next
      </Button>
    </>
  );
};

export default AmountForm;
