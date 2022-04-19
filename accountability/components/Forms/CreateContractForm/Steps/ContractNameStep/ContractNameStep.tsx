import { Input } from 'semantic-ui-react';
import FormStep from '../../../FormStep/FormStep';

interface ContractDescriptionStepProps {
  name: string;
  isFinalStep: boolean;
  setName: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const ContractDescriptionStep = ({
  name,
  isFinalStep,
  setName,
  handleNextStep,
  handlePreviousStep
}: ContractDescriptionStepProps) => {
  return (
    <FormStep
      label="Contract name"
      input={
        <Input
          value={name}
          fluid
          onChange={(event) => setName(event.target.value)}
        />
      }
      isFinalStep={isFinalStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />
  );
};

export default ContractDescriptionStep;
