import { Icon, Table } from 'semantic-ui-react';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

export interface ContractStatusCellProps {
  status: ContractStatus;
}

export const ContractStatusCell = ({ status }: ContractStatusCellProps) => {
  if (status === ContractStatus.SUCCESS) {
    return (
      <Table.Cell>
        <Icon color="green" name="check" size="large" />
        {status}
      </Table.Cell>
    );
  }
  if (status === ContractStatus.AWAITING_APPROVAL) {
    return (
      <Table.Cell>
        <Icon color="blue" name="clock" size="large" />
        {status}
      </Table.Cell>
    );
  }
  if (status === ContractStatus.FAILURE) {
    return (
      <Table.Cell>
        <Icon color="red" name="times circle" size="large" />
        {status}
      </Table.Cell>
    );
  }
  return <Table.Cell>{status}</Table.Cell>;
};

export default ContractStatusCell;
