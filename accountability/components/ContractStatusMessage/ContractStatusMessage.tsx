import { Message } from 'semantic-ui-react';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

interface ContractStatusMessageProps {
  status: ContractStatus;
}

const ContractStatusMessage = ({ status }: ContractStatusMessageProps) => {
  if (status === ContractStatus.SUCCESS) {
    return (
      <Message
        color="green"
        icon="check"
        header="Completed"
        content="This contract has been completed."
      />
    );
  }
  if (status === ContractStatus.AWAITING_APPROVAL) {
    return (
      <Message
        color="blue"
        icon="clock"
        header="Awaiting approval"
        content="Contact the referee to get their approval"
      />
    );
  }
  if (status === ContractStatus.FAILURE) {
    return (
      <Message
        color="red"
        icon="times circle"
        header="Failed"
        content="This contract was failed."
      />
    );
  }
  return <Message header="Open" content="This contract is open." />;
};

export default ContractStatusMessage;
