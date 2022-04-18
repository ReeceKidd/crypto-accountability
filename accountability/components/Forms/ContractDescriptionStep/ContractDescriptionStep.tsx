import { TextArea } from 'semantic-ui-react';
import FormStep from '../FormStep/FormStep';

interface ContractDescriptionStepProps {
  description: string;
  isFinalStep: boolean;
  setDescription: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const ContractDescriptionStep = ({
  description,
  isFinalStep,
  setDescription,
  handleNextStep,
  handlePreviousStep
}: ContractDescriptionStepProps) => {
  return (
    <FormStep
      label="Contract description"
      input={
        <TextArea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      }
      isFinalStep={isFinalStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />
  );
};

export default ContractDescriptionStep;
