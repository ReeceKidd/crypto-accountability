import { Button, Input } from 'semantic-ui-react';

interface RefereeFormProps {
  web3Account: string;
  referee: string;
  setReferee: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const RefereeForm = ({
  web3Account,
  referee,
  setReferee,
  handleNextStep,
  handlePreviousStep
}: RefereeFormProps) => {
  return (
    <>
      <p>Referee</p>
      <Input
        label={
          <Button
            primary
            content="Use my address"
            onClick={(event) => {
              event.preventDefault();
              setReferee(web3Account);
            }}
          />
        }
        labelPosition="right"
        value={referee}
      />

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

export default RefereeForm;
