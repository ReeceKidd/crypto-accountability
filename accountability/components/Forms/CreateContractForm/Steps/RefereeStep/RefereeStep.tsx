import { Button, Input } from 'semantic-ui-react';
import FormStep from '../../../FormStep/FormStep';

interface RefereeStepProps {
  web3Account: string;
  referee: string;
  isFinalStep: boolean;
  setReferee: (input: string) => void;
  handleNextStep: () => void;
}

export const RefereeStep = ({
  web3Account,
  referee,
  isFinalStep,
  setReferee,
  handleNextStep
}: RefereeStepProps) => {
  return (
    <FormStep
      label="Referee"
      input={
        <Input
          fluid
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
    />
  );
};

export default RefereeStep;
