import { Button, Input } from 'semantic-ui-react';
import FormStep from '../../../FormStep/FormStep';

interface RefereeStepProps {
  web3Account: string;
  referee: string;
  isFinalStep: boolean;
  setReferee: (input: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const RefereeStep = ({
  web3Account,
  referee,
  isFinalStep,
  setReferee,
  handleNextStep,
  handlePreviousStep
}: RefereeStepProps) => {
  return (
    <FormStep
      label="Referee"
      input={
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
      }
      isFinalStep={isFinalStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />
  );
};

export default RefereeStep;
