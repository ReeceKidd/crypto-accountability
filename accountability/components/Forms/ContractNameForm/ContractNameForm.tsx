import { Form, Button, Input } from 'semantic-ui-react';

interface ContractNameFormProps {
  name: string;
  setName: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const ContractNameForm = ({
  name,
  setName,
  handleNextStep,
  handlePreviousStep
}: ContractNameFormProps) => {
  return (
    <>
      <Form onSubmit={handleNextStep}>
        <label>
          Contract name:
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </Form>
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

export default ContractNameForm;
