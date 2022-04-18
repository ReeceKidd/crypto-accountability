import { Button, TextArea } from 'semantic-ui-react';

interface ContractDescriptionFormProps {
  description: string;
  setDescription: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const ContractDescriptionForm = ({
  description,
  setDescription,
  handleNextStep,
  handlePreviousStep
}: ContractDescriptionFormProps) => {
  return (
    <>
      <label>
        Contract description:
        <TextArea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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

export default ContractDescriptionForm;
