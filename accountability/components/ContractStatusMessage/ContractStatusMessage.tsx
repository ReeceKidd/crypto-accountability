import { Message } from "semantic-ui-react";
import { ContractStatus } from "../../helpers/getContractStatus";

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
        content="You successfully completed this contract."
      />
    );
  }
  if (status === ContractStatus.FAILURE) {
    return (
      <Message
        color="red"
        icon="times circle"
        header="Failed"
        content="You failed to complete this contract."
      />
    );
  }
  return <Message header="Open" content="This contract is open." />;
};

export default ContractStatusMessage;
