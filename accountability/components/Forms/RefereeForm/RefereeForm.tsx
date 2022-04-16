import { Form, Button, Input } from 'semantic-ui-react';

interface RefereeFormProps {
  web3Account: string;
  referee: string;
  setReferee: (input: string) => void;
}

export const RefereeForm = ({
  web3Account,
  referee,
  setReferee
}: RefereeFormProps) => {
  return (
    <>
      <Form>
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
      </Form>
      <br />
      <Button primary type="submit">
        Next
      </Button>
    </>
  );
};

export default RefereeForm;
